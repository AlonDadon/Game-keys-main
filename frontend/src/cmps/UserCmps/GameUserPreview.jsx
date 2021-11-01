import React from 'react'

export function GameUserPreview({ game }) {
    if (!game) return <h1>You dont have games yet</h1>
    return (
        <div className="game-user-preview">
            <div className="user-game-card">
                <div className="user-game-card-img">
                    <img src={game.img}></img>
                </div>
                <div className="user-game-title">
                    <h2>{game.title}</h2>
                </div>
            </div>

        </div>
    )
}
