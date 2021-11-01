import { Link } from 'react-router-dom'
export function DetailsSideBar({ loggedInUser, isInLibrary }) {
    return (
        <div className="sign-in" >
            <h2>{(loggedInUser && isInLibrary) ? 'Did you like the game' : ' Is this game relevant to you?'}</h2>
            <p>{(loggedInUser && isInLibrary) ? 'Feel free to share a review and tell everyone what you think' :
                `Sign in to see reasons why you may or may not
                   like this based on your games, friends, 
                   and curators you follow.`}</p>
            <div>
                {!loggedInUser && <Link to="/login">Sign in</Link>}
                {loggedInUser && <a className="btn-add-review" >Add a review</a>}
            </div>
        </div>
    )
}