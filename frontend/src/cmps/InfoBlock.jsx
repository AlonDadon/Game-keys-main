import React from 'react'

export function InfoBlock({ title, value }) {
    return (
        <div className="flex">
            <p className="dark-txt">{title}: </p>
            <p className="light-txt">{value}</p>
        </div>
    )
}
