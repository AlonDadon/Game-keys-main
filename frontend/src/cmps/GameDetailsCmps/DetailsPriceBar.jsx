import { Link } from 'react-router-dom'

export function DetailsPriceBar({ isInLibrary, game, finalPrice }) {
    const { _id, discount, title, price } = game

    return (
        <div className="price-container container">
            <div>
                <h2>{!isInLibrary && <span>Buy</span>} {title}</h2>
                {discount > 50 && <p>WEEKEND DEAL! Offer ends in <span> 29:06:12</span></p>}
            </div>

            <div className="details-price">
                <div className="price-info flex ">
                    {!isInLibrary && <div hidden={!discount ? true : false}>
                        <p className="discount ">{discount ? `${discount}%` : ''}</p>
                    </div>}

                    {!isInLibrary && <div className="flex column space-evenly align-center justify-center mr-1">
                        <p className={(discount > 0) ? "in-sale" : 'f-price'} >${price.toFixed(2)}</p>
                        {discount ? <p className="f-price" >${finalPrice.toFixed(2)}</p> : ''}
                    </div>}

                    {isInLibrary && <Link className="btn btn-primary" to="/profile"> In Library</Link>}
                    {!isInLibrary && <Link to={`/game/order/${_id}`} >
                        <button className="btn-main">Add to cart</button>
                    </Link>}
                </div>
            </div>
        </div>
    )
}