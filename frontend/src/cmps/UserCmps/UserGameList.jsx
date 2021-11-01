import React from 'react'
import { GameUserPreview } from "./GameUserPreview"

export function UserGameList({ orders }) {
    return (
        <div className="user-buy-list ">
            {orders.map(order => <GameUserPreview key={order._id} order={order} />)}
        </div>
    )
}
