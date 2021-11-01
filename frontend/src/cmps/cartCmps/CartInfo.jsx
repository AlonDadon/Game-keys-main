import { FriendsList } from "./FriendsList";


export function CartInfo({ totalPrice, toggleIsCheckout, onFriendSelect, frinedsList, onCheckOut, isOpenModal, toggleModal }) {
    return (
        <>
            <div className="flex space-between align-center pad-15">
                <p >Estimated total</p>
                <div>
                    <p className="f-price" >${totalPrice}</p>
                </div>
            </div>
            <div className="flex column  space-evenly align-center justify-center mr-1 pad-15">
                <p className="p-3">Is this a purchase for yourself or is it a gift? Select one to continue to checkout.</p>
                <div className="btn-container flex gap-10  ">
                    <button onClick={() => toggleIsCheckout()}
                        className="btn-main" >Purchase for myself</button>
                    <button className="btn-main" onClick={() => toggleModal(isOpenModal)}>Purchase as a gift</button>
                    {/* <button className="gift-btn btn btn-success btn-med" }>Purchase as a gift</button> */}
                </div>
            </div>
            <div className="pad-15">
                {isOpenModal && <FriendsList
                    isOpenModal={isOpenModal}
                    FriendsList={FriendsList}
                    onCheckOut={onCheckOut}
                    frinedsList={frinedsList}
                    toggleModal={toggleModal} />}
                <p>All prices include VAT where applicable</p>
            </div>

        </>

    )
}
