
export const ImgModal = ({ imgs, imgPreviewIdx, isOpenModal, toggleOpenModal, changeIdxByDiff }) => {
    return (<>
        <div className={`${isOpenModal && 'visible'}  img-modal flex column justify-center `}>
            <h6>{imgPreviewIdx}/{imgs.length - 1}</h6>
            <img src={imgs[imgPreviewIdx]} alt="" />
            <div className="button-group flex space-between" >
                <button className="btn-primary" onClick={() => changeIdxByDiff(-1)} >Back</button>
                <button className="btn-primary" onClick={() => changeIdxByDiff(1)} >Next</button>
            </div>
        </div>
        <div className={`${isOpenModal && 'visible'} screen-modal`} onClick={toggleOpenModal}  ></div>
    </>
    )
}
