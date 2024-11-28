import React from 'react'
import './BottomBanner.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const BottomBanner = () => {

    const dataJSON = [
        // {
        //     id: 0,
        //     Title: 'Haute Couture',
        //     Decription: 'Revealing the beauty of lab grown diamonds in high jewelry. From the house of inspired designers, each bringing a unique taste in design and excellent quality in craftsmanship. A preview of our stunning atelier designs captivating every moment in time.',
        //     Link: 'DISCOVER MORE',
        //     images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner4.png`
        // },
        // {
        //     id: 1,
        //     Title: 'Carbon For Carbon',
        //     Decription: 'KayraCreation has launched Carbon For Carbon campaign and is working with charity partners to plant trees and improve the environment impact of unnecessary carbon usage.',
        //     Link: 'LISTEN NOW',
        //     images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner2.png`
        // },
        // {
        //     id: 2,
        //     Title: 'KayraCreation with Celebrities at Red Carpet',
        //     Decription: 'Celebrities and Top Influencers wearing sustainable lab-grown diamonds jewelry',
        //     Link: 'DISCOVER',
        //     images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner1.png`
        // },
        // {
        //     id: 3,
        //     Title: 'Meet The Founders',
        //     Decription: 'The founders of KayraCreation have a mission to spread smiles through supporting different charity organizations.',
        //     Link: 'DISCOVER',
        //     images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner3.jpg`
        // },
        // {
        //     id: 4,
        //     Title: 'Featured In',
        //     Decription: 'Check out the press coverage of KayraCreation by top media in the world',
        //     Link: 'DISCOVER',
        //     images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner5.jpg`
        // },
        // {
        //     id: 5,
        //     Title: 'Listen To sonasons Podcast',
        //     Decription: 'Tune into KayraCreation podcast and join the Smiling Community. Here we will share thoughts with guest speakers on jewelry industry and sustainability.',
        //     Link: 'LISTEN NOW',
        //     images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner6.jpg`
        // },
    ]
    return (
        <div className='for_BottomBannerMain'>
            {
                dataJSON.map((data, i) => (
                    <div>
                        <div className='shopifyMain'>
                            <div className='shopifyDesc'>
                                <p className='shopifyTitle'>{data.Title}</p>
                                <p className='shopifyDescription'>{data.Decription}</p>
                                {/* <p style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '1px', color: '#7d7f85' }}>{data.Link}</p> */}
                            </div>
                            <div className='shopifyMainImage'>
                                <img src={data.images} style={{ height: '100%', width: '100%', minHeight: '500px' }} className='for_shopifyImg'/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BottomBanner;