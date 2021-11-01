import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'
export function SmallGamePreview({ game }) {
    const gameImg = game.imgs.largeImgUrls[0]
    const finalPrice = utilService.getFinalPrice(game.price, game.discount)
    return (
        <div className="small-game-preview space-between">
            <div>
                <Link className="hidden" to={`/game/${game._id}`} >
                    <div className="flex small-img">
                        <img src={gameImg} alt="" />
                    </div>
                    <div className="preview-price">
                        <p className="discount">{game.discount ? `${game.discount}%` : ''}</p>
                        <div className="flex column">
                            <p className={(game.discount > 0) ? "in-sale" : 'f-price'} >${game.price.toFixed(2)}</p>
                            {game.discount ? <p className="f-price" >${finalPrice.toFixed(2)}</p> : ''}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

