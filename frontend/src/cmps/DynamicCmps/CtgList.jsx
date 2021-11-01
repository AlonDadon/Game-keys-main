import { Link } from 'react-router-dom'
export function CtgList() {
    return (
        <>
            <h2 className="ctg-s-title mb-20 container">Browse game keys</h2>
            <div className="ctg-list  flex container gap-20 mb-30">
                <Link className="btn-big " to="/game?tag=adventure" >Adventure</Link>
                <Link className="btn-big " to="/game?tag=racing" >Racing</Link>
                <Link className="btn-big " to="/game?tag=action" >Action</Link>
                <Link className="btn-big " to="/game?tag=sports" >Sports</Link>
            </div>
            <div className="container flex space-between" >
                <h2 className="mb-20 ctg-s-title ">Best sellers</h2>
                <div>
                <Link className="btn btn-view align-end  title cap" to="/game"> View all</Link>
                </div>
            </div>
        </>
    )
}

