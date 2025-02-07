import React from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'
import { useRecoilValue } from 'recoil';
import { lov_loginState } from '../../../Recoil/atom';

const PromotionBaner1 = ({ data }) => {

    const islogin = useRecoilValue(lov_loginState);

    return (
        <div>
            <div className='lovFestiveMainImage'>
                <img src={data?.image?.[0]} style={{ width: '100%' }} alt={"#promoBanner1"} />
                {islogin === true && <div className='lovfestiveBox'>
                    <p className='lovFestiMainTitle1' style={{ color: 'white' }}>LOVE IN DIAMONDS</p>
                    <p className='lovFestiMainTitle2' style={{ color: 'white', fontSize: '30px', margin: '0px' }}>Diamonds are Forever!</p>
                    <p className='lovFestiMainTitle3' style={{ color: 'white', margin: '0px', fontSize: '13px' }}>
                        Discover the world of Jewellery & Diamonds
                    </p>
                    <div>
                        <button className='DiscoverBtn'
                        // onClick={handleNaviagtion}
                        >View All Products</button>
                    </div>
                </div>}
                <div className='DiamondEveryOneMain'>
                    <div className='daimondEvery'>
                        <p className='daimondEveryTitle'>WELCOME TO THE WONDROUS WORLD OF DIAMONDS</p>
                        <p className='daimondEveryTitleDesc' style={{ fontSize: '16px', color: '#7d7595' }}>Explore your journey of emotions through the wonderful world of Love in Diamonds. A house of unparalleled collections with the sublime beauty of the finest gemstones. A place filled with incredible shapes and rare colors with striking designs.</p>
                        {/* <p className='daimondLearnMore' style={{fontSize : '11px' ,fontWeight: '500',letterSpacing: '1px', color : 'rgb(95,73,122)', marginBlock: '50px'}}>LEARN MORE</p> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PromotionBaner1