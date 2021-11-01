import { utilService } from '../../services/util.service'
import { Loader } from '../UtilCmps/Loader'

export function ReviewPreview({ review, user }) {
    const createdAt = new Date(review.createdAt).toLocaleDateString('en-Us', { year: 'numeric', month: 'long', day: 'numeric' })
    if(!user) return <Loader />
    return (
        <div className="review-preview">
            <div className="review-user-preview">
                <img src={user.imgUrl} alt="user-img"></img>
                <h2>{user.fullname}</h2>
            </div>
            <div className="review-game-preview">
                {utilService.renderStars(review.rate)}
                <p>Posted: {createdAt}</p>
                <p className="review-txt">{review.txt}</p>
            </div>

        </div>
    )
}
