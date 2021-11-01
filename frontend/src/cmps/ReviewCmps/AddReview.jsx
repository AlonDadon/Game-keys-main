import { Component } from 'react'
import { utilService } from '../../services/util.service'
import { Rating } from '../UtilCmps/Rating'

import { Link } from 'react-router-dom'
import { Modal } from '../UtilCmps/Modal'

export class AddReview extends Component {
    state = {
        review: {
            rate: null,
            txt: '',
        }
    }

    handleSubmit = (ev) => {
        ev.preventDefault()
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'radio' ? +target.value : target.value
        this.setState(prevState => ({
            review: {
                ...prevState.review,
                [field]: value
            }
        }))
    }
    onSubmit = async (ev) => {
        ev.preventDefault()
        const { review } = this.state
        if (review.rate < 1) {
            this.props.userMsg('GIVE US SOME STARS')
            setTimeout(() => {
                this.props.userMsg('')
              }, 2000);
            return
        }
        await this.props.onAddReview(review)
        this.setState({review: {
            rate: null,
            txt: '',

        }})
    }
    render() {
        const { rate, txt } = this.state.review;
        const { loggedInUser } = this.props
        return (
            <div className="add-review-form">
                <form onSubmit={!loggedInUser ? null : this.onSubmit}>
                    <h2>Write A Review </h2>
                    <h3>{loggedInUser && loggedInUser.fullname}</h3>
                    <Rating rate={rate} handleChange={this.handleChange} />
                    <div className="review-box-txt">
                    <textarea ref={this.textInput} name="txt" value={txt} id="" cols="40" rows="10" onChange={this.handleChange}></textarea>
                    </div>
                    <div className="review-btn">
                        {loggedInUser && < button className="btn-add-review">Send</button>}
                        {!loggedInUser && < button className="btn-login-review"><Link to="/login">Sign in</Link></button>}
                    </div>
                </form>
            </div>
        )

    }
}