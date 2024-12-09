import React from 'react'
import './Collection.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const Collection = () => {
    return (
        <div className='el_Collection_main' id="elveeGiftMainId" name='elveeGiftMainId'>
            <p className='gorGiftBoxMainTitleMobile'>Gifting Made Easy</p>
            <div className='gorGiftMain'>
                <div className='gorGiftBox1'>
                    <div>
                        <p className='gorGiftBoxMainTitleWeb'>WOMEN</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img1.jpg`} className='gorGiftBox1Images' />
                    </div>
                    <div className='gorGiftBox1Sub1'>
                        <p className='gorGiftBoxMainTitleWeb'>KIDS</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img3.jpg`} className='gorGiftBox1Images' />
                    </div>
                </div>
                <div className='gorGiftBox1'>
                    <div>
                        <p className='gorGiftBoxMainTitleWeb'>MEN</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img2.jpg`} className='gorGiftBox1Images' />
                    </div>
                    <div className='gorGiftBox2Sub1' >
                        <p className='gorGiftBoxMainTitleWeb'>GIFTS</p>
                        <img loading="lazy" src={`${storImagePath()}/images/HomePage/Promo/Set/1/promoSetBanner1Img4.jpg`} className='gorGiftBox1Images' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Collection