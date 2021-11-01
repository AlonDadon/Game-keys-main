import React from 'react'

export const Loader = () => {
    return(
        <div className="flex justify-center">
        <div className="lds-roller">
            <div></div><div></div><div></div><div></div>
            <div></div><div></div><div></div><div></div>
            </div>
        </div>
    )
}
