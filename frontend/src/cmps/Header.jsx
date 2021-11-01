import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from "../store/actions/user.actions"
import { loadCarts } from "../store/actions/cart.actions"
import { Screen } from "./UtilCmps/Screen"
import NotifyMe from 'react-notification-timeline';
import { UserMsg } from './UtilCmps/UserMsg'
import { ReactComponent as ShoppingCart } from '../assets/img/icons/shopping-cart-sketch.svg'

class _Header extends Component {
    state = {
        isHidden: true,
        data: [],
        sumOfItems: 0
    }
   async componentDidMount() {
        await this.props.loadCarts()
        this.setState({ sumOfItems: this.props.carts.length })
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.msg) {
            if (prevProps.msg === "You got a gift!!!")
                this.updateData(prevProps.msg);
        }
        if(prevState.sumOfItems !== this.props.carts.length){
            this.setState({ sumOfItems: this.props.carts.length })
        }
    }

    updateData(msg) {
        const data =
        {
            "update": msg,
            "timestamp": Date.now()
        }
        this.setState({ data: [...this.state.data, data] })

    }

    toggleIsHidden = (isHidden) => {
        if (isHidden === undefined) {
            const { isHidden } = this.state
            this.setState({ isHidden: !isHidden })

        } else {
            this.setState({ isHidden: isHidden })
        }
    }

    readAll = () => {
        this.setState({ data: [] });
    }

    flexClass = 'flex space-around space-between align-center'

    onLogout = async () => {
        try {
            await this.props.logout()
        } catch (err) {
            console.log('err', err);
        }
    }

    render() {
        const { data, sumOfItems, isHidden } = this.state
        const logo = "https://res.cloudinary.com/dat4toc2t/image/upload/v1623183631/GameKeys/img/logo/GameKeys-BIG_k1kusx.png"
        const { loggedInUser } = this.props;
        return <header className={`main-header`}>
            {this.props.msg && <UserMsg msg={this.props.msg} />}
            <div className={`container ${this.flexClass}`}>
                {/* {this.props.msg && <div className="user-msg"></div>} */}
                <Link to="/"><img src={logo} className="logo-img" alt=""></img></Link>

                <nav className={`${this.flexClass} ${!isHidden && 'show'} ${!loggedInUser && 'loggedin-check'}`}>
                    <div className="link-container" >
                        <NavLink onClick={() => this.toggleIsHidden(true)} exact to="/">Home</NavLink>
                        <NavLink onClick={() => this.toggleIsHidden(true)} to="/game">Explore</NavLink>
                        <NavLink onClick={() => this.toggleIsHidden(true)} exact to="/about">About us</NavLink>
                        {!loggedInUser && <Link onClick={() => this.toggleIsHidden(true)} className="btn-login" to="/login">Login</Link>}
                    </div>

                    {loggedInUser && <div className="user-header">
                        {/* </details> */}
                    </div>}
                    {/* <Screen isHidden={this.state.isHidden} toggleIsHidden={this.toggleIsHidden} /> */}
                    {loggedInUser && <div className="user-menu-container flex " >
                        <div className="flex  align-center" >
                            <NotifyMe
                                data={data}
                                storageKey='notific_key'
                                notific_key='timestamp'
                                notific_value='update'
                                heading='Notification Alerts'
                                sortedByKey={false}
                                showDate={true}
                                size={18}
                                color="#b9e4fd"
                                markAsReadFn={() => this.readAll()}
                            />
                            <img onClick={() => this.toggleIsHidden()} src={loggedInUser.imgUrl} alt="" />
                        </div>

                        <div className={`user-menu ${isHidden && 'hidden-menu'}`}>
                            <div className="drop-down">
                                <Link onClick={() => this.toggleIsHidden(true)} to="/profile">Profile</Link>
                                {loggedInUser && <a onClick={this.props.logout}>Logout:
                                    <span className="light-txt txt-cap"> {loggedInUser.username}</span></a>}
                                <Link onClick={() => this.toggleIsHidden(true)} to="/game/order">Shoping cart</Link>
                                {/* <a>My store</a> */}
                                <Link onClick={() => this.toggleIsHidden(true)} to="/profile/edit">Edit profile</Link>
                            </div>
                        </div>
                    </div>}

                    <div className="shopping-cart" onClick={() => this.toggleIsHidden(true)}>
                        <div className="shopping-cart-info">
                            <span className="cart-item-num">{sumOfItems}</span>
                            <Link to="/game/order"><ShoppingCart className="shopping-cart-svg" /></Link>
                        </div>
                    </div>

                </nav>

                <div onClick={() => this.toggleIsHidden(true)}
                    className={`screen ${isHidden && 'hidden-screen'}`} >
                </div>
                <button className="btn-menu " onClick={() => this.toggleIsHidden(false)}>☰</button>
            </div>
        </header>
    }

}
const mapStateToProps = state => {
    return {
        loggedInUser: state.userModule.loggedInUser,
        carts: state.cartModule.carts
    }
}
const mapDispatchToProps = {
    logout,
    loadCarts
}


export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header)