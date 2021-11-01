import { Link } from 'react-router-dom'
import { Video } from '../Video.jsx'
import { InfoBlock } from '../InfoBlock'
export function DetailsPanel({ game, getDateString, setImgPreviewIdx, setIsOpenModal, }) {
    const { imgs, videoUrls, description, releasedAt, seller, tags } = game
    // const sDescription = description.slice(0, 250)
    const selectImgByIdx = (idx) => {
        setIsOpenModal(true)
        setImgPreviewIdx(idx)
    }
    const urlImgs = imgs.largeImgUrls
    return (
        <div className="details-container container flex gap-5 mb-20">
            <div className="video-container">
                <div className="video flex column justify-center gap-5">
                    <Video url={videoUrls[0]} />
                    {/* <div className="flex img-container gap-10"> */}
                    <div className="grid-container">
                        {urlImgs.map((img, idx) => {
                            if (idx >= 4) return
                            return <div className="s-img-container" key={'i' + idx} >
                                <img className={'s-img-game'}
                                    onClick={() => { selectImgByIdx(idx+1) }}

                                    src={urlImgs[idx + 1]}
                                    alt=""
                                /></div>
                        })}
                    </div>
                </div>
            </div>
            <div className="details-info flex  ">
                <div>
                    <img className="mb-10" src={urlImgs[0]} alt="" />
                    <p maxLength="10" className="s-desc">{description}</p>
                </div>
                <div>
                    <InfoBlock title="RELEASE DATE" value={getDateString(releasedAt)} />
                    <InfoBlock title="Seller" value={seller.fullname} />


                    <div className="tag-info flex column" >
                        <p className="dark-txt  mb-10"> Popular user-defined tags for this product:</p>
                        <div className="tag-container flex justify-center gap-5 ">
                            {tags.map((tag, idx) => <Link className="btn txt-cap" to={`/game?tag=${tag}`} key={idx}>{tag} </Link>).slice(0, 3)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}