import ReactElasticCarousel from 'react-elastic-carousel'
import Item from './Item'

export function GameCarousel() {
    return (
        <>
            <div className="flex carousel">
                < ReactElasticCarousel >
                {/* <Item> <img src={backgroundImg2} alt="" /></Item>
                <Item> <img src={backgroundImg3} alt="" /></Item>
                <Item> <img src={backgroundImg4} alt="" /></Item> */}
                {/* // this.props.children */}
                <Item><div className="">a</div></Item>
                <Item><div className="">a</div></Item>
                <Item><div className="">5</div></Item>
                <Item><div className="">4</div></Item>
                    </ReactElasticCarousel >
                </div>
        </>
    )
}