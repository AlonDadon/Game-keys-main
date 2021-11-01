import React from 'react'
import { gameService } from '../services/game.service'
import { Loader } from './UtilCmps/Loader'

export const TagList = ({ tags, addRemoveTag }) => {
    const defaultTags = gameService.getDefaultTags()

    if (!defaultTags) return <Loader />
    return (
        <div className="edit-tag-list">
            <p>Add game tags</p>
            {defaultTags.map((tag, idx) => {
                if (idx === 0) return
                return <span className={`btn txt-cap ${tags.includes(tag) ? 'added' : ''}`}
                    onClick={() => addRemoveTag(tag)} key={`tag${idx}`}>{tag} </span>
            })

            }
        </div>
    )
}
