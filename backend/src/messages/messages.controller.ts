import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { StartConversationDto } from './dto/start-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  /**
   * Get all conversations for the authenticated user (guest or host)
   */
  @Get('conversations')
  async getConversations(@Req() req: any) {
    const userId = req.user?.id || req.user?.userId;
    return await this.messagesService.getUserConversations(Number(userId));
  }

  /**
   * Get total unread messages count for badge notification
   */
  @Get('unread-count')
  async getUnreadCount(@Req() req: any) {
    const userId = req.user?.id || req.user?.userId;
    return await this.messagesService.getUnreadCount(Number(userId));
  }

  /**
   * Get messages for a specific conversation thread
   */
  @Get(':conversationId')
  async getConversationMessages(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Req() req: any,
  ) {
    const userId = req.user?.id || req.user?.userId;
    return await this.messagesService.getConversationMessages(conversationId, Number(userId));
  }

  /**
   * Start a new conversation or open existing one between guest & host
   */
  @Post('start')
  async startConversation(
    @Body() dto: StartConversationDto,
    @Req() req: any,
  ) {
    const userId = req.user?.id || req.user?.userId;
    return await this.messagesService.startConversation(Number(userId), dto);
  }

  /**
   * Send a message in an existing conversation
   */
  @Post('send')
  async sendMessage(
    @Body() dto: SendMessageDto,
    @Req() req: any,
  ) {
    const userId = req.user?.id || req.user?.userId;
    return await this.messagesService.sendMessage(Number(userId), dto);
  }

  /**
   * Mark all messages in a conversation as read
   */
  @Patch(':conversationId/read')
  async markAsRead(
    @Param('conversationId', ParseIntPipe) conversationId: number,
    @Req() req: any,
  ) {
    const userId = req.user?.id || req.user?.userId;
    return await this.messagesService.markAsRead(conversationId, Number(userId));
  }
}
