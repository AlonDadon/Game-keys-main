import { ReviewPreview } from './ReviewPreview'

export function ReviewList({ reviews, getUserByReview }) {
   
    return (
        <div className="review-list">
            {reviews.map(review => {
                return < ReviewPreview user={getUserByReview(review)} review={review} key={review.id + Math.random()} />
            })}
        </div>
    )
}
