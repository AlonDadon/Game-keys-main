import React from 'react'
import { GamePreview } from './GamePreview'

export function GameList({ games }) {
    return (
        // <div className="game-list gap-10 container">
        <div className="grid-container container game-list">
            {games.map(game => <GamePreview key={game._id} game={game}/> )}
        </div>
    )
}
