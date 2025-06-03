import React from 'react'
import './Collection.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const Collection = ({ banner }) => {
    return (
        <div className='el_Collection_main' id="elveeGiftMainId" name='elveeGiftMainId'>
            <p className='gorGiftBoxMainTitleMobile'>Gifting Made Easy</p>
            <div className='gorGiftMain'>
                <div className='gorGiftBox1'>
                    <div>
                        <h1 className='gorGiftBoxMainTitleWeb'>WOMEN</h1>
                        <img loading="lazy" src={banner?.image?.[0]} className='gorGiftBox1Images' height="45%" width="45%" alt='gift-for-womens' />
                        {/* <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.jpg`} className='gorGiftBox1Images' /> */}
                    </div>
                    <div className='gorGiftBox1Sub1'>
                        <h1 className='gorGiftBoxMainTitleWeb'>KIDS</h1>
                        <img loading="lazy" src={banner?.image?.[1]} className='gorGiftBox1Images' height="45%" width="45%" alt='gift-for-kids' />
                    </div>
                </div>
                <div className='gorGiftBox1'>
                    <div>
                        <h1 className='gorGiftBoxMainTitleWeb'>MEN</h1>
                        <img loading="lazy" src={banner?.image?.[2]} className='gorGiftBox1Images' height="45%" width="45%" alt='gift-for-men' />
                    </div>
                    <div className='gorGiftBox2Sub1' >
                        <h1 className='gorGiftBoxMainTitleWeb'>GIFTS</h1>
                        <img loading="lazy" src={banner?.image?.[3]} className='gorGiftBox1Images' height="45%" width="45%" alt='gifts' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection