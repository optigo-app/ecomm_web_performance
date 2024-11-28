import React from 'react'
import { useRecoilValue } from 'recoil';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './PromotionBaner1.modul.scss'

const PromotionBaner1 = () => {



    return (
        <div className='stam_Banner_main'>
            <div className='stam_BannerMAinTitleMAin'>
                <p className='stam_BannerMAinTitle1'>GET READY TO SPARKLE</p>
                <p className='stam_BannerMAinTitle2'>DISCOVER OUR COLLECTIONS</p>
                <p className='stam_BannerMAinTitle3'>Browse through our latest collection launch, with a variety of earrings, necklaces and rings, perfect for stacking, styling, layering and adorning every part of you.</p>
            </div>
            <div className='stam_Banner_main_div'>
                <div>
                    <div className='stam_Banner_main_div_main1'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner1.jpg`} className='stam_Banner_Iamge1' />
                        <p className='stam_banner_Title'>Ring</p>
                        <div class="products__desc">
                            <h2 class="products__title">RING</h2>
                            <p class="products__subtitle">A symbol of commitment and joy, our rings are the perfect representation of love for you, blended with unique designs. Make a statement with Stamford, worn together or individually. Our selection of diamond rings create impactful eye-catching silhouettes</p>
                        </div>
                    </div>
                    <div className='stam_Banner_main_div_main2'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner2.jpg`} className='stam_Banner_Iamge2' />
                        <p className='stam_banner_Title'>BRACELET</p>
                        <div class="products__desc">
                            <h2 class="products__title">BRACELET</h2>
                            <p class="products__subtitle">Drawing on our discerning eye for hand-selecting and arranging the finest natural diamonds, our diamond bracelets encompass graceful and architectural shapes. Each creation follows the curves of the wrist producing an eye-catching display of light that showcases the character of each diamond, offering a timeless symbol of individuality.</p>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <div className='stam_Banner_main_div_main3'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner3.jpg`} className='stam_Banner_Iamge3' />
                        <p className='stam_banner_Title'>Chain</p>
                        <div class="products__desc">
                            <h2 class="products__title">CHAIN</h2>
                            <p class="products__subtitle">A treasure trove of perfectly cut diamond pendants in stunning arrangements that will help you stand apart in any setting with your unmatched beauty.</p>
                        </div>
                    </div>
                    <div className='stam_Banner_main_div_main4'>
                        <img src={`${storImagePath()}/images/HomePage/Banner/banner4.jpg`} className='stam_Banner_Iamge4' />
                        <p className='stam_banner_Title'>EARRINGS</p>
                        <div class="products__desc">
                            <h2 class="products__title">EARRINGS</h2>
                            <p class="products__subtitle">diamond studs, drop earrings and hoops reveal the precise artistry of our craftspeople. Whether an understated or an intricate arrangement, each pair of diamonds is hand-selected and expertly matched, to ensure harmonious balance in every design.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='festiveBox'>
                <p className='smilingFestiMainTitle1' style={{ color: 'gray' }}>LAB GROWN DIAMONDS</p>
                <p className='smilingFestiMainTitle2' style={{ color: 'gray', fontSize: '40px', margin: '0px' }}>Festive Finds!</p>
                <p className='smilingFestiMainTitle3' style={{ color: 'gray', margin: '0px', fontSize: '13px' }}>
                    Explore your jewelry for upcoming holiday!
                </p>
            </div> */}
        </div>
    )
}

export default PromotionBaner1