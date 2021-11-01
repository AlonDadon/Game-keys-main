
export function Screen({ isHidden, toggleIsHidden }) {

    return (
        <div onClick={() => toggleIsHidden()} className={`screen ${isHidden && 'hidden-screen'}`} >
        </div>
    )
}


