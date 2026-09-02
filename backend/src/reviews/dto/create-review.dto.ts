export class CreateReviewDto {
  booking_id: number;
  rating: number; // Must be 1-5
  comment?: string; // The '?' makes it optional
}