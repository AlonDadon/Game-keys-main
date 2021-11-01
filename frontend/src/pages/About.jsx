
export const About = () => {
    const imgUrls = ['https://res.cloudinary.com/dat4toc2t/image/upload/v1627133999/GameKeys/img/about/about-img5_e0mzaj.jpg',
        'https://res.cloudinary.com/dat4toc2t/image/upload/v1627135561/GameKeys/img/about/about-img6_vsbf2h.jpg',]


    return (
        <section className="about ">
            <div className="about-info flex justify-center">
                <div className="info-title">
                    <h1>This is GameKeys</h1>
                </div>
                <div className="info-txt">
                    <p>We believe that games should be easy to: access, share, buy & sell and to be affordable, this is why we came with GameKeys.
                        A market place for games, where you can share your thoughts, buy/sell games, get updateed with the newest trands in the gaming industry, and be a part of a community.</p>
                    <p>We work with our own game-app! but we also work with all the major platforms, such as: Steam, Google play and HBO-Games and more.</p>
                </div>
            </div>
            <div className="slogen">
                <img className="slogen-img bottom-img" alt="about" src={imgUrls[0]}>
                </img>
                <img className="slogen-img top-img" alt="about" src={imgUrls[1]}>
                </img>
                <div className="test"></div>
                <h2 className="slogen-txt">We are keys, for games!</h2>
            </div>
        </section>
    )
}