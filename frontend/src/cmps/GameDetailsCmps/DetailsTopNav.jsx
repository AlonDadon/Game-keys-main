import { Link } from 'react-router-dom'
export function DetailsTopNav({ game }) {
    const { tags, title } = game
    return (
        <div className="top-nav mb-2 container">
            <Link to={`/game`} >All Games  </Link> {'>'}
            <Link className="txt-cap" to={`/game/${tags[0]}`} >{tags[0] + '> '}  </Link>
            <Link to={`/game/${title}`} >{title}</Link>
        </div>
    )
}