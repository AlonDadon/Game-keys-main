import { Component } from 'react'

export class FriendsList extends Component {
    state = {
        friendId: null
    }

    onChoseFriend = (friendId) => {
        this.setState({ friendId })
    }

    render() {
        const { friendId } = this.state
        const { frinedsList, onCheckOut, toggleModal, isOpenModal } = this.props
        return (
            <div className="friends-modal flex column space-between">
                <div>
                    <h4>Chose from your friends list</h4>
                    {frinedsList.map(friend => {
                        return (
                            <div key={`friend${friend.friendId}`}>
                                <p className={`txt-cap ${(friendId === friend.friendId) && 'active'}`} onClick={() => this.onChoseFriend(friend.friendId)}>{friend.fullname}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="friends-btn flex justify-center gap-20 align-center" >
                    <button className="btn-main" onClick={() => onCheckOut(this.state.friendId)}>Purchase</button>
                    <a className="" onClick={() => toggleModal(isOpenModal)}>Back</a>
                </div>
            </div>
        )
    }
}
