import React, { useEffect, useState } from 'react'
import './AboutUs.modul.scss'
import Footer from '../../Home/Footer/Footer';
import useHomeBannerImages from '../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';
export default function AboutUs() {
    const banner = useHomeBannerImages();
    const data = banner?.aboutusBanner;
    return (
        <div className='paddingTopMobileSet'
            // style={{ background: '#efe5ff' }}
            style={{ background: '#fff' }}
        >
            {/* https://cdn.accentuate.io/19336364132/3641674891364/Stocksy_txpdd2f673ddEJ200_Medium_1086442.jpg?1733x1155 */}
            <div>
                {/* <img
                    src="https://cdn.accentuate.io/19336364132/3641674891364/Stocksy_txpdd2f673ddEJ200_Medium_1086442.jpg?1733x1155"
                    alt="..."
                    className="dt-About-container"
                /> */}
                <div className="dt-About-container2"></div>
            </div>
            <div className='dt-about-title'>
                <p style={{
                    textAlign: 'center',
                    fontSize: '40px',
                    color: '#3f3151',
                }}>About Us</p>
            </div>
            <div className='daimondsEveryAbout'>
                <div className='daimondsEveryAboutSub'>
                    <div style={{
                        paddingBlock: '70px'
                    }}
                        className=' daimondsEveryAboutSubTitle'
                    >
                        {/* <p style={{
                            textAlign: 'center',
                            fontSize: '15px',
                            fontWeight: 500,
                            fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif',
                            color: '#7d7f85'
                        }}>#LOVEINDIAMOND </p> */}
                        {/* <p style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif',
                            color: '#7d7f85'
                        }}>Let Your Love In Diamonds Be Forever.</p> */}
                        <p
                            style={{
                                textAlign: 'center',
                                fontSize: '30px',
                                color: '#3f3151'
                            }}>Let Your Love In Diamonds Be Forever.</p>
                    </div>
                    <div className='about-daimondBoxMains'>
                        <div className='about-daimondBox11'>
                            <p style={{ fontSize: '25px', color: '#3f3151' }}>ABOUT US</p>
                            <p style={{ textAlign: 'center', color: '#5f497a', fontSize: '16px' }}>Love in diamonds located amid The Diamond City Of India, Surat is a hub of explicit designs and rare shades of diamonds.
                                For over 40 years, our family has become a part of various families and their beautiful stories. We are a diamond
                                manufacturing and designing unit that strives to give a captivating combination of hue, saturation, and brilliance that
                                cannot be duplicated.
                                Our gems are a symbol of love and commitment. With sparkle, incredibly designed shapes with different shades of rare
                                colors. The precision of our cuts and the elegant craftsmanship of our artisans is our mastered tool.
                                The choice of the stone reflects the kind of personality, the color signifies the intensity of emotions and the cuts on it
                                give the reflection of the overall facets of love.
                            </p>
                        </div>
                        <div className='about-daimondBox21'>
                            <img src={data?.image?.[0]} className='about-daimondBox21-image' />
                        </div>
                    </div>

                    <div className='about-daimondBoxMains' style={{ marginTop: '80px' }}>
                        <div className='about-daimondBox2'>
                            <img src={data?.image?.[1]} className='about-daimondBox2-image' />
                        </div>
                        <div className='about-daimondBox1'>
                            <p style={{ fontSize: '25px', color: '#3f3151' }}>VISION</p>
                            <p style={{ textAlign: 'center', color: '#5f497a', fontSize: '16px' }}>Our vision lies in adding souls to the stones. Every jewel is a statement of raw and real stories rooted in deep sentiments.
                                <br />
                                <br />
                                We believe that every stone narrates a story and our artisans give it a shape through gemstones and diamonds. Our
                                jewelry is a beautiful creation of love and commitment and our artisans hallmark it with trust to adds “forever” to it.</p>
                        </div>
                    </div>
                    <div className='about-daimondBoxMains' style={{ marginTop: '80px' }}>
                        <div className='about-daimondBox1'>
                            <p style={{ fontSize: '25px', color: '#3f3151' }}>RUSHIT PATEL
                                (FOUNDER & MANAGING DIRECTOR)
                            </p>
                            <p style={{ textAlign: 'center', color: '#5f497a', fontSize: '16px' }}>
                                Meet the visionary behind Love In Diamonds, Mr. Rushit Patel. With over two decades of diverse business expertise, his true passion lies the world of diamonds. Hailing from the renowned diamond city of India and enriched by his experiences across African countries, he holds an unwavering fascination for the captivating allure of diamonds.
                                <br />
                                <br />
                                Endowed with an impeccable eye for gems, Mr. Patel sees beyond mere stones, recognizing them as vessels of emotion that reflect the wearer's unique essence. From the elegance of classic cuts to the breathtaking brilliance of vibrant hues, he relentlessly pursues perfection in every facet.
                                <br />
                                <br />
                                Fueled by boundless creativity and an unwavering commitment to excellence, Mr. Patel stands as a true luminary in the field. At Love In Diamonds, he ensures that each jewel is not just a creation, but a masterpiece crafted from the heart to resonate deeply with your soul.
                            </p>
                        </div>
                        <div className='about-daimondBox2'>
                            <img src={data?.image?.[2]} className='about-daimondBox2-image' />
                        </div>
                    </div>
                </div>

                {/* <div>
                    <div>
                        <p style={{ fontSize: '25px', color: '#7d7f85', textAlign: 'center', fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif', marginTop: '80px' }}>Gentereted</p>
                        <div className='about-foundersDesc'>
                            <p style={{ fontSize: '14px', color: '#7d7f85', width: '600px', textAlign: 'center', letterSpacing: '1px' }}>Sodales ut eu sem integer vitae justo eget. Nisi porta lorem mollis aliquam ut porttitor leo a diam. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Risus pretium quam vulputate dignissim suspendisse in est ante in. Consequat nisl vel pretium lectus quam id. Sed vulputate odio ut enim blandit volutpat maecenas volutpat. Habitasse platea dictumst quisque sagittis purus sit amet volutpat consequat. Enim tortor at auctor urna nunc id cursus metus aliquam. Quis viverra nibh cras pulvinar mattis nunc sed blandit. Urna molestie at elementum eu facilisis sed. Sed risus pretium quam vulputate. Commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Vitae et leo duis ut diam quam nulla porttitor massa. Tristique senectus et netus et malesuada fames. Tempor orci dapibus ultrices in iaculis nunc. Nisi porta lorem mollis aliquam ut. Auctor elit sed vulputate mi sit amet.</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src='https://smilingrocks.com/cdn/shop/files/Founders-2LSC_1950x.jpg?v=1659340743' className='about-foundersImges' />
                    </div>
                </div>

                <div>
                    <p style={{ fontSize: '30px', color: '#7d7f85', textAlign: 'center', fontFamily : 'FreightDispProMedium-Regular, "Times New Roman", serif' }}>Sonasons Brand Story</p>
                    <div className='about-foundersDesc'>
                        <p style={{ fontSize: '14px', color: '#7d7f85', width: '700px', textAlign: 'center', letterSpacing: '1px' }}>A journey of our diamonds, our mission and our passion with your support and purchase. Watch a short video about us and our mission that we promised together with you. </p>
                    </div>
                    <div style={{display : 'flex', justifyContent : 'center'}}>
                        <iframe src="https://player.vimeo.com/video/431344262" width="640" height="480" frameborder="0" allowfullscreen=""></iframe>
                    </div>
                </div> */}

                {/* <ContactForm /> */}
                <Footer />
            </div>
        </div>
    )
}
