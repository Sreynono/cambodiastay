import { 
  Controller, 
  Post, 
  Get, 
  Patch, 
  Body, 
  Param, 
  Req, 
  Query,
  UseGuards 
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post('create')
  @Roles(Role.GUEST, Role.HOST, Role.ADMIN)
  async createBooking(@Req() req: any, @Body() body: any) {
    let guestId = req.user?.id || req.user?.userId;
    if (body.guest_id && (req.user?.role === Role.ADMIN || !guestId)) {
      guestId = Number(body.guest_id);
    }
    const homestayId = Number(body.homestay_id || body.property_id);
    const checkIn = body.check_in_date || body.checkInDate || body.checkIn;
    const checkOut = body.check_out_date || body.checkOutDate || body.checkOut;
    const guestsCount = Number(body.guests_count || body.guests) || 1;
    const totalPrice = body.total_price ? Number(body.total_price) : undefined;
    const guestEmail = body.guest_email || (req.user?.role !== Role.ADMIN ? req.user?.email : undefined);
    const paymentMethod = body.payment_method || body.paymentMethod;
    const transactionId = body.transaction_id || body.transactionId;
    
    return await this.bookingsService.createBooking(
      guestId,
      homestayId,
      checkIn,
      checkOut,
      guestsCount,
      totalPrice,
      guestEmail,
      paymentMethod,
      transactionId,
    );
  }

  @Get('my-bookings')
  @Roles(Role.GUEST, Role.HOST, Role.ADMIN)
  async getMyBookings(
    @Req() req: any,
    @Query('guest_id') queryGuestId?: string,
    @Query('email') queryEmail?: string,
  ) {
    let guestId = req.user?.id || req.user?.userId;
    if (queryGuestId && (req.user?.role === Role.ADMIN || Number(queryGuestId) === guestId)) {
      guestId = Number(queryGuestId);
    }
    const emailToFilter = queryEmail || (req.user?.role !== Role.ADMIN ? req.user?.email : undefined);
    return await this.bookingsService.getGuestBookings(guestId, emailToFilter);
  }

  @Get('host-bookings')
  @Roles(Role.HOST, Role.ADMIN)
  async getHostBookings(@Req() req: any) {
    const hostId = req.user?.id || req.user?.userId;
    return await this.bookingsService.getHostBookings(hostId);
  }

  @Get('all')
  @Roles(Role.ADMIN)
  async getAllBookings() {
    return await this.bookingsService.getAllBookings();
  }

  @Get(':id')
  async getBookingDetails(@Param('id') id: string) {
    return await this.bookingsService.getBookingDetails(+id);
  }

  @Patch(':id/manage')
  @Roles(Role.HOST, Role.ADMIN)
  async manageBooking(
    @Param('id') id: string, 
    @Req() req: any, 
    @Body('action') action: string,
  ) {
    const userRole = String(req.user?.role || '').toLowerCase();
    const isAdmin = userRole === 'admin';
    const hostId = isAdmin ? undefined : (req.user?.id || req.user?.userId);
    return await this.bookingsService.manageBooking(+id, hostId, action, isAdmin);
  }

  @Patch(':id/cancel')
  @Roles(Role.GUEST, Role.HOST, Role.ADMIN)
  async cancelBooking(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || req.user?.userId;
    return await this.bookingsService.cancelBooking(+id, userId);
  }
}