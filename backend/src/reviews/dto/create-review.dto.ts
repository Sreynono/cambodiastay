export class CreateReviewDto {
  homestay_id?: number;
  booking_id?: number;
  rating: number; // Must be 1-5
  comment?: string;
  recommendation?: string;
  is_recommended?: boolean;
}