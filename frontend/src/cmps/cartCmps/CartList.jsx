import { Link } from "react-router-dom";
import { CartPreview } from "./CartPreview";
export function CartList({ games, onRemoveCart, isCheckout }) {
    return (
        <>
            {games && games.map(game => <CartPreview
                key={game._id}
                game={game}
                onRemoveCart={onRemoveCart}
                isCheckout={isCheckout}
            />)}

        </>
    )
}