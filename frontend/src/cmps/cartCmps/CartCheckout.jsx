
export function CartCheckout({ totalPrice, loggedInUser, onCheckOut }) {
    return (
        <>
            <div className="flex column">
                {/* <div className="flex space-between align-center pad-15"> */}
                <div className="total-price flex column align-end pad-15">
                    <div className="flex" >
                        <p className="dark-txt" >Subtotal:</p>
                        <p className="" >${totalPrice}</p>
                    </div>
                    <div className="tax flex" >
                        <p className="dark-txt" >Tax:</p>
                        <p>0</p>
                    </div>
                    <div className="flex" >
                        <p className="dark-txt" >Total:</p>
                        <p className="f-price" >${totalPrice}</p>
                    </div>
                </div>

                <div className="flex gap-10 pad-5">
                    <p className="dark-txt">Payment method:</p>
                    <p className="visa" >Visa ending in 4758</p>
                </div>
                <div className="flex gap-10 pad-5 ">
                    <p className="dark-txt" >Gift options:</p>
                    <p >This purchase is for your own account.</p>
                </div>
                <div className="flex gap-10 pad-5">
                    <p className="dark-txt" >Game keys account:</p>
                    <p className="txt-cap" >{loggedInUser.username}</p>
                </div>
                <div className="align-end pad-15">
                    <button className="btn-med btn btn-success" onClick={() => onCheckOut(loggedInUser._id)}>Purchase</button>
                </div>
            </div>
        </>
    )
}