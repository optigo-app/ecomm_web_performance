import React, { useRef, useEffect, useState } from 'react'
import './ShopOurInstagram.scss'
import { IoClose } from "react-icons/io5";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { FaPinterest } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function ShopOurInstagram({ data }) {

    const [showOverlay, setShowOverlay] = useState(false);
    const inputRef = useRef(null);
    // const [storeInit,setStoreInit] = useState();

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         if(Object.keys(JSON.parse(localStorage.getItem("storeInit")))?.length){
    //             let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    //             console.log("storeinit",storeinit?.UploadLogicalPath,storeinit?.ukey,storeinit?.ufcc)
    //             setStoreInit(storeinit)
    //         }
    //     },800)
    // },[])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // arrows: false,
        // prevArrow: false, 
        // nextArrow: false,
    };


    const toggleOverlay = () => {
        // setShowOverlay(!showOverlay);
    };



    return (
        <div>
            {showOverlay && (
                <>
                    <div className="shopInstaoverlay">
                        <div className="searchClose">
                            <IoClose style={{ height: '50px', width: '50px', color: 'white' }} onClick={toggleOverlay} />
                        </div>
                        <div style={{ width: '1000px', height: '500px' }}>
                            <Slider {...settings}>
                                <div className='overlyBox1'>
                                    <img src='https://cdn.showcasegalleries.io/media/instagram/public-showcase-media.sfo3.digitaloceanspaces.com/18048267676371955.jpg' style={{ height: '500px' }} />
                                    <div className='overlyBox1Content'>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingInline: '100px'
                                        }}>
                                            NEW COLLECTION LAUNCH! FLOW with the movement within you. <br /><br />
                                            "Being in the FLOW means being aware that the river of life is flowing to us at every moment."<br /><br />Discover more at www.smilingrocks.com<br /><br />
                                            <span class="hashtag">#SmilingRocksCo</span>
                                            <span class="hashtag">#labgrowndiamonds</span>
                                            <span class="hashtag">#jewelry</span>
                                            <span class="hashtag">#finejewelry</span>
                                            <span class="hashtag">#fashionjewelry</span>
                                            <span class="hashtag">#Flow</span>
                                            <span class="hashtag">#hoops</span>
                                            <span class="hashtag">#earrings</span>
                                            <span class="hashtag">#rings</span>
                                            <span class="hashtag">#bracelets</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='overlyBox1'>
                                    <img src='https://cdn.showcasegalleries.io/media/instagram/public-showcase-media.sfo3.digitaloceanspaces.com/17947561016152002.jpg' style={{ height: '500px' }} />
                                    <div className='overlyBox1Content'>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingInline: '100px'
                                        }}>
                                            NEW COLLECTION LAUNCH! FLOW with the movement within you. <br /><br />
                                            "Being in the FLOW means being aware that the river of life is flowing to us at every moment."<br /><br />Discover more at www.smilingrocks.com<br /><br />
                                            <span class="hashtag">#SmilingRocksCo</span>
                                            <span class="hashtag">#labgrowndiamonds</span>
                                            <span class="hashtag">#jewelry</span>
                                            <span class="hashtag">#finejewelry</span>
                                            <span class="hashtag">#fashionjewelry</span>
                                            <span class="hashtag">#Flow</span>
                                            <span class="hashtag">#hoops</span>
                                            <span class="hashtag">#earrings</span>
                                            <span class="hashtag">#rings</span>
                                            <span class="hashtag">#bracelets</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='overlyBox1'>
                                    <img src='https://cdn.showcasegalleries.io/media/instagram/public-showcase-media.sfo3.digitaloceanspaces.com/18222140416080296.jpg' style={{ height: '500px' }} />
                                    <div className='overlyBox1Content'>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingInline: '100px'
                                        }}>
                                            NEW COLLECTION LAUNCH! FLOW with the movement within you. <br /><br />
                                            "Being in the FLOW means being aware that the river of life is flowing to us at every moment."<br /><br />Discover more at www.smilingrocks.com<br /><br />
                                            <span class="hashtag">#SmilingRocksCo</span>
                                            <span class="hashtag">#labgrowndiamonds</span>
                                            <span class="hashtag">#jewelry</span>
                                            <span class="hashtag">#finejewelry</span>
                                            <span class="hashtag">#fashionjewelry</span>
                                            <span class="hashtag">#Flow</span>
                                            <span class="hashtag">#hoops</span>
                                            <span class="hashtag">#earrings</span>
                                            <span class="hashtag">#rings</span>
                                            <span class="hashtag">#bracelets</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='overlyBox1'>
                                    <img src='https://cdn.showcasegalleries.io/media/instagram/public-showcase-media.sfo3.digitaloceanspaces.com/17886020417717199.jpg' style={{ height: '500px' }} />
                                    <div className='overlyBox1Content'>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            paddingInline: '100px'
                                        }}>
                                            NEW COLLECTION LAUNCH! FLOW with the movement within you. <br /><br />
                                            "Being in the FLOW means being aware that the river of life is flowing to us at every moment."<br /><br />Discover more at www.smilingrocks.com<br /><br />
                                            <span class="hashtag">#SmilingRocksCo</span>
                                            <span class="hashtag">#labgrowndiamonds</span>
                                            <span class="hashtag">#jewelry</span>
                                            <span class="hashtag">#finejewelry</span>
                                            <span class="hashtag">#fashionjewelry</span>
                                            <span class="hashtag">#Flow</span>
                                            <span class="hashtag">#hoops</span>
                                            <span class="hashtag">#earrings</span>
                                            <span class="hashtag">#rings</span>
                                            <span class="hashtag">#bracelets</span>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </>
            )
            }
            <div className='ShopInstagrtamMain' style={{ position: 'relative' }}>
                <p className='shopinstaMainTitle'>Visit Our Socials</p>
                {/* <p className='shopinstaMainDesc'>Follow @loveInDiamond and get inspired with photos of our lab-grown diamond jewelry, customized and styled for you!</p> */}

                <div className='ShopInstagrtamImages'>
                    <div className='shopInimage'>
                        <a href='https://www.instagram.com/loveindiamonds/?igsh=MTVic2NuM2o2NW01Yw%3D%3D&utm_source=qr'>
                            <div className='socialIcon'>
                                <AiFillInstagram />
                            </div>
                            <img src={data?.image?.[0]} className='shopInimage1' />
                        </a>
                    </div>
                    <div className='shopInimage'>
                        <a href='https://www.facebook.com/people/Love-in-Diamonds/100077999103991/?mibextid=LQQJ4d&rdid=IvML6a4iuib2w3Ga&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FUyob7trhQBjGvXnA%2F%3Fmibextid%3DLQQJ4d'>
                            <div className='socialIcon'>
                                <FaFacebookF />
                            </div>
                            <img src={data?.image?.[1]} className='shopInimage2' />
                        </a>
                    </div>
                    <div className='shopInimage'>
                        <a href='https://www.linkedin.com/company/love-in-diamonds/'>
                            <div className='socialIcon'>
                                <FaLinkedin />
                            </div>
                            <img src={data?.image?.[2]} className='shopInimage3' />
                        </a>
                    </div>
                    <div className='shopInimage'>
                        <a href='https://in.pinterest.com/LoveinDiamonds/?invite_code=9eeee2e007154baabac791e34e75bdb2'>
                            <div className='socialIcon'>
                                <FaPinterest />
                            </div>
                            <img src={data?.image?.[3]} className='shopInimage4' />
                        </a>
                    </div>
                </div>


                <div className='ShopInstagrtamImage-mobile'>
                    <div style={{ display: 'flex' }}>
                        <div className='shopInimage'>
                            <a href='https://www.instagram.com/loveindiamonds/?igsh=MTVic2NuM2o2NW01Yw%3D%3D&utm_source=qr'>
                                <div className='socialIcon'>
                                    <AiFillInstagram />
                                </div>
                                <img src={data?.image?.[0]} className='shopInimage1' />
                            </a>
                        </div>
                        <div className='shopInimage'>
                            <a href='https://www.facebook.com/people/Love-in-Diamonds/100077999103991/?mibextid=LQQJ4d&rdid=IvML6a4iuib2w3Ga&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FUyob7trhQBjGvXnA%2F%3Fmibextid%3DLQQJ4d'>
                                <div className='socialIcon'>
                                    <FaFacebookF />
                                </div>
                                <img src={data?.image?.[1]} className='shopInimage2' />
                            </a>
                        </div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className='shopInimage'>
                            <a href='https://www.linkedin.com/company/love-in-diamonds/'>
                                <div className='socialIcon'>
                                    <FaLinkedin />
                                </div>
                                <img src={data?.image?.[2]} className='shopInimage3' />
                            </a>
                        </div>
                        <div className='shopInimage'>
                            <a href='https://in.pinterest.com/LoveinDiamonds/?invite_code=9eeee2e007154baabac791e34e75bdb2'>
                                <div className='socialIcon'>
                                    <FaPinterest />
                                </div>
                                <img src={data?.image?.[3]} className='shopInimage4' />
                            </a>
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}
