import { ReactComponent as Twitter } from '../assets/img/icons/twitter.svg'
import  {ReactComponent as Instagram} from '../assets/img/icons/instagram.svg'
import {ReactComponent as Facebook} from '../assets/img/icons/facebook.svg'

const logo = "https://res.cloudinary.com/dat4toc2t/image/upload/v1623183631/GameKeys/img/logo/GameKeys-BIG_k1kusx.png"
export function Footer() {
  return (
    <footer className="flex column align-center">
      <div className="icon-container flex mb-20  justify-center gap-10">
        <div className="flex align-center">
          <Twitter className="icon" />
          <div className="flex column">
            <p className="icon-title" >11.9k</p>
            <span>Followers</span>
          </div>
        </div>
        <div className="flex align-center">
          <Instagram className="icon" />
          <div className="flex column">
            <p className="icon-title" >48k</p>
            <span>Followers</span>
          </div>
        </div>
        <div className="flex align-center">
          <Facebook className="icon"/>
          <div className="flex column">
            <p className="icon-title" >883k</p>
            <span>LIKES</span>
          </div>
        </div>
      </div>
      <img className="logo-footer" src={logo} alt=""></img>
      <small>Copyrights Gamekeys.com 2021. all rights reserved &copy;2021</small>
    </footer>
  )
}