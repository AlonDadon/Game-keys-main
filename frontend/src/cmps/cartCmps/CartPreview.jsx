
export function CartPreview({ game, onRemoveCart, isCheckout }) {

    const gameImg = game.imgs.largeImgUrls[0]
    const finalPrice = game.price - (game.price * (game.discount/100))
    return (
        <div className="flex space-between cart-card mb-10">
            <div className="flex gap-10" >
                <img src={gameImg} alt="" />
                <p className="card-title" >{game.title}</p>
            </div>

            <div className="flex column space-evenly align-center justify-center mr-5">
                {!isCheckout && <p className={game.discount? "in-sale" :"f-price" } >${game.price.toFixed(2)}</p>}
                <p className="f-price" >${finalPrice.toFixed(2)}</p>
                {!isCheckout && <a className="btn-remove" onClick={() => onRemoveCart(game._id)} >remove</a>}
            </div>
        </div>
    )
}