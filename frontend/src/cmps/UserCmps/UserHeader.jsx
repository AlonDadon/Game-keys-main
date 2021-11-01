
export function UserHeader({fullname, img}) {
    const backgroundImg = "https://res.cloudinary.com/dat4toc2t/image/upload/v1623183702/GameKeys/img/user-profile-hero_cytz5i.jpg"
    const userImg = img
    return (
        <header>
            <div className="user-profile-header container">
                <img className="hero" src={backgroundImg} alt="" />
                <div>
                    <img className="avatar" src={userImg} alt=""></img>
                </div>
            </div>
            <h2 className="username-title" >Hello {fullname}</h2>
        </header>
    )


}