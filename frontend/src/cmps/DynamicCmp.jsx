import { SmallGamePreview } from './DynamicCmps/SmallGamePreview.jsx'
import { MainGamePreview } from './DynamicCmps/MainGamePreview.jsx'
import { CtgList } from './DynamicCmps/CtgList.jsx';
import { VideoGame } from './DynamicCmps/VideoGame.jsx';

var gGames = []
export function DynamicCmp({ games, type = 'main', src, utilService }) {


    let countGameToCut = 0
    if (type === 'main') countGameToCut = 11
    else if (type === 'video') countGameToCut = 2
    else countGameToCut = 4

    if (gGames.length < countGameToCut) gGames = [...games]


    const filterGames = gGames.splice(0, countGameToCut)
    const DynamicCmp = () => {
        switch (type) {
            case 'main':
                return (
                    <MainGamePreview games={filterGames} utilService={utilService} />
                )
            case 'video':
                return (
                    <VideoGame games={filterGames} />
                )
            case 'small':
                return (<>
                    <CtgList />
                    {/* <div className="preview-container flex container mb-30 gap-20 "> */}
                    <div className="s-preview-container grid-container container mb-30 gap-20 ">
                        {filterGames.map((game, idx) => {
                            if (idx > 3) return
                            return <SmallGamePreview game={game} key={game._id} />
                        })}
                    </div>
                </>
                )
            default: return <></>
        }
    }
    return (
        <div className="home-game-list mb-30">
            <DynamicCmp />
        </div>
    )
}