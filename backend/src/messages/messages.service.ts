import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';
import { StartConversationDto } from './dto/start-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepo: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  /**
   * Get all conversations for a user (either guest or host)
   */
  async getUserConversations(userId: number) {
    const conversations = await this.conversationRepo
      .createQueryBuilder('conv')
      .leftJoinAndSelect('conv.guest', 'guest')
      .leftJoinAndSelect('conv.host', 'host')
      .leftJoinAndSelect('conv.homestay', 'homestay')
      .where('conv.guest_id = :userId OR conv.host_id = :userId', { userId })
      .orderBy('conv.last_message_at', 'DESC')
      .getMany();

    // Map and count unread messages for each conversation
    const result = await Promise.all(
      conversations.map(async (conv) => {
        const unreadCount = await this.messageRepo.count({
          where: {
            conversation_id: conv.id,
            receiver_id: userId,
            is_read: false,
          },
        });

        const isGuest = conv.guest_id === userId;
        const otherParty = isGuest ? conv.host : conv.guest;

        return {
          id: conv.id,
          guest_id: conv.guest_id,
          host_id: conv.host_id,
          homestay_id: conv.homestay_id,
          homestay_title: conv.homestay?.title || 'Rural Homestay',
          homestay_image: conv.homestay?.image_url || '',
          homestay_province: conv.homestay?.province || '',
          other_user: {
            id: otherParty?.user_id,
            name: otherParty?.full_name || 'CamStay Member',
            email: otherParty?.email || '',
            role: otherParty?.role || '',
          },
          last_message: conv.last_message || 'Started a conversation',
          last_message_at: conv.last_message_at,
          created_at: conv.created_at,
          unread_count: unreadCount,
        };
      }),
    );

    return result;
  }

  /**
   * Get all messages in a conversation and mark incoming ones as read
   */
  async getConversationMessages(conversationId: number, userId: number) {
    const conv = await this.conversationRepo.findOne({
      where: { id: conversationId },
      relations: { guest: true, host: true, homestay: true },
    });

    if (!conv) {
      throw new NotFoundException('Conversation not found');
    }

    if (conv.guest_id !== userId && conv.host_id !== userId) {
      throw new ForbiddenException('You do not have access to this conversation');
    }

    // Mark unread messages sent to this user as read
    await this.messageRepo
      .createQueryBuilder()
      .update(Message)
      .set({ is_read: true })
      .where('conversation_id = :convId AND receiver_id = :userId AND is_read = false', {
        convId: conversationId,
        userId,
      })
      .execute();

    const messages = await this.messageRepo.find({
      where: { conversation_id: conversationId },
      order: { created_at: 'ASC' },
      relations: { sender: true },
    });

    const isGuest = conv.guest_id === userId;
    const otherParty = isGuest ? conv.host : conv.guest;

    return {
      conversation: {
        id: conv.id,
        guest_id: conv.guest_id,
        host_id: conv.host_id,
        homestay_id: conv.homestay_id,
        homestay_title: conv.homestay?.title || 'Rural Homestay',
        homestay_image: conv.homestay?.image_url || '',
        other_user: {
          id: otherParty?.user_id,
          name: otherParty?.full_name || 'CamStay Member',
          email: otherParty?.email || '',
          role: otherParty?.role || '',
        },
      },
      messages: messages.map((m) => ({
        id: m.id,
        conversation_id: m.conversation_id,
        sender_id: m.sender_id,
        receiver_id: m.receiver_id,
        sender_name: m.sender?.full_name || 'User',
        content: m.content,
        is_read: m.is_read,
        created_at: m.created_at,
        is_mine: m.sender_id === userId,
      })),
    };
  }

  /**
   * Find existing conversation between guest, host & homestay, or create a new one
   */
  async startConversation(guestId: number, dto: StartConversationDto) {
    const hostId = Number(dto.host_id);
    const homestayId = Number(dto.homestay_id);

    if (guestId === hostId) {
      throw new BadRequestException('You cannot message yourself as host');
    }

    let conv = await this.conversationRepo.findOne({
      where: {
        guest_id: guestId,
        host_id: hostId,
        homestay_id: homestayId,
      },
      relations: { guest: true, host: true, homestay: true },
    });

    if (!conv) {
      conv = this.conversationRepo.create({
        guest_id: guestId,
        host_id: hostId,
        homestay_id: homestayId,
        last_message: dto.initial_message || 'Inquired about homestay',
        last_message_at: new Date(),
      });
      conv = await this.conversationRepo.save(conv);
    }

    // If an initial message was passed, save it
    if (dto.initial_message && dto.initial_message.trim()) {
      const msg = this.messageRepo.create({
        conversation_id: conv.id,
        sender_id: guestId,
        receiver_id: hostId,
        content: dto.initial_message.trim(),
        is_read: false,
      });
      await this.messageRepo.save(msg);

      conv.last_message = dto.initial_message.trim();
      conv.last_message_at = new Date();
      await this.conversationRepo.save(conv);
    }

    return await this.getConversationMessages(conv.id, guestId);
  }

  /**
   * Send a new message in an existing conversation
   */
  async sendMessage(senderId: number, dto: SendMessageDto) {
    const conversationId = Number(dto.conversation_id);
    const conv = await this.conversationRepo.findOne({
      where: { id: conversationId },
    });

    if (!conv) {
      throw new NotFoundException('Conversation not found');
    }

    if (conv.guest_id !== senderId && conv.host_id !== senderId) {
      throw new ForbiddenException('You do not belong to this conversation');
    }

    // Determine receiver
    const receiverId = conv.guest_id === senderId ? conv.host_id : conv.guest_id;

    const msg = this.messageRepo.create({
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
      content: dto.content.trim(),
      is_read: false,
    });
    const savedMsg = await this.messageRepo.save(msg);

    // Update conversation metadata
    conv.last_message = dto.content.trim();
    conv.last_message_at = new Date();
    await this.conversationRepo.save(conv);

    return {
      id: savedMsg.id,
      conversation_id: savedMsg.conversation_id,
      sender_id: savedMsg.sender_id,
      receiver_id: savedMsg.receiver_id,
      content: savedMsg.content,
      is_read: savedMsg.is_read,
      created_at: savedMsg.created_at,
      is_mine: true,
    };
  }

  /**
   * Mark all unread messages in a conversation as read
   */
  async markAsRead(conversationId: number, userId: number) {
    await this.messageRepo
      .createQueryBuilder()
      .update(Message)
      .set({ is_read: true })
      .where('conversation_id = :convId AND receiver_id = :userId AND is_read = false', {
        convId: conversationId,
        userId,
      })
      .execute();

    return { success: true };
  }

  /**
   * Get total count of unread messages for this user
   */
  async getUnreadCount(userId: number): Promise<{ unread: number }> {
    const count = await this.messageRepo.count({
      where: {
        receiver_id: userId,
        is_read: false,
      },
    });
    return { unread: count };
  }
}
