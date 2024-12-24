

import React, { useEffect, useState } from 'react'
import './AboutUs.modul.scss'
import { storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../Home/Footer/Footer';

export default function AboutUs() {

    const [htmlContent, setHtmlContent] = useState('');
    const data = [
        {
            title: "Crafting Timeless Elegance",
            desc: "At [Your Brand Name], we believe that jewelry is more than just an accessory—it's a statement of individuality and grace. Our collections are carefully designed and crafted by skilled artisans, ensuring each piece embodies the perfect balance of beauty and craftsmanship. From the selection of the finest materials to the intricate details of every design, we create jewelry that tells a story and lasts a lifetime.",
            img: `${storImagePath()}/about/2.png`,
        },
        {
            title: "Our Commitment to Quality",
            desc: "Every piece of jewelry we create is a reflection of our dedication to quality. We source only the finest gemstones and precious metals, ensuring that each item meets the highest standards of excellence. Whether it’s a sparkling diamond ring or a delicate gold necklace, our commitment to quality ensures that every creation exudes luxury and sophistication.",
            img: `${storImagePath()}/about/4.png`,
        },
        {
            title: "Designed for Every Moment",
            desc: "Our jewelry is designed to complement every aspect of life—from everyday elegance to the most special occasions. Each collection is crafted with a blend of modern trends and timeless sophistication, making it easy to find a piece that’s perfect for you or a loved one. Celebrate life’s most precious moments with jewelry that speaks to the heart and soul.",
            img: `${storImagePath()}/about/4.png`,
        },
    ];
    const AboutBanner = `${storImagePath()}/about/1.png`;
    const AboutLastBanner = `${storImagePath()}/about/22.jpg`;

    useEffect(() => {
        // fetch(`${storImagePath()}/html/About.html`) c:\Users\User\Downloads\favicon_io (1)\MaioraAbout.html
        fetch(`${storImagePath()}/html/MaioraAbout.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });
    }, []);

    return (
        <div className='smr_about_mainDiv'>
            <div className='daimondsEveryAbout'>
                <div className='smr_daimondsEveryAbout_sub' style={{ paddingBottom: '80px', minHeight: '400px' }}>
                {/* Old sonasons about us */}
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    {/* <div className="stam_about_l">
                        <div className="bgimage_banner_stam">
                            <img src={AboutBanner} alt="" />
                        </div>
                        <div className="desc_stam_ford_p">
                            <p>
                                Lorem, ipsum dolor sit amet dolorum iure id veniam asperiores
                                dignissimos quas. Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Praesentium, debitis? Lorem ipsum dolor amet consectetur.{" "}
                            </p>
                        </div>
                        <div className="grid_layout_stam_about">
                            {data?.map(({ desc, img, title, left }, idx) => {
                                return <div className="stam_grid_card">
                                    <div className="left_stam_banner">
                                        <img src={img} alt="" />
                                    </div>
                                    <div className="right_det_stam">
                                        <h1>{title}</h1>
                                        <p>{desc}</p>
                                    </div>
                                </div>;
                            })}
                        </div>
                        <div className="card_list_stamford">
                            {Array.from({ length: 4 }).map((val, i) => {
                                return <div class="stam_card">
                                    <div className="details_Stame">
                                        <h2>Lorem ipsum dolor.</h2>
                                        <ul>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                            <span>Lorem ipsum dolor sit amet.</span>
                                        </ul>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div> */}
                </div>
                <Footer />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })}>BACK TO TOP</p>
            </div>
        </div>
    )
}


{/* <div>
                <img
                    src="https://cdn.accentuate.io/19336364132/3641674891364/Stocksy_txpdd2f673ddEJ200_Medium_1086442.jpg?1733x1155"
                    alt="..."
                    className="smiling-About-container"
                />
                <div className="smiling-About-container2"></div>
            </div>
            <div className='smining-about-title'>
                <p style={{
                    textAlign: 'center',
                    fontSize: '40px',
                    color: 'white',
                    fontFamily: 'FreightDispProBook-Regular,Times New Roman,serif'
                }}>About Us</p>
            </div> */}

// <div className='daimondsEveryAboutSub'>
// <div style={{
//     paddingBlock: '70px'
// }}>
//     <p style={{
//         textAlign: 'center',
//         fontSize: '15px',
//         fontWeight: 500,
//         fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif',
//         color: '#7d7f85'
//     }}>#WEAREKAYRACREATION</p>
//     <p style={{
//         textAlign: 'center',
//         fontSize: '22px',
//         fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif',
//         color: '#7d7f85'
//     }}>Spread the Chain of Smile to Everyone from Lab to Home to Community.</p>
//     <p
//         style={{
//             textAlign: 'center',
//             fontSize: '30px',
//             fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif',
//             color: '#7d7f85'
//         }}>A DIAMONDS ARE FOREVER</p>
// </div>
// <div className='about-daimondBoxMain'>
//     <div className='about-daimondBox1'>
//         <p style={{ fontSize: '25px', color: '#7d7f85', fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif' }}>Wear a Smile</p>
//         <p style={{ textAlign: 'center', color: '#7d7f85', fontSize: '13px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel orci porta non pulvinar neque laoreet suspendisse interdum. Risus nullam eget felis eget nunc lobortis mattis. Eleifend quam adipiscing vitae proin sagittis nisl. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Eget dolor morbi non arcu. Id aliquet lectus proin nibh nisl condimentum id venenatis. Massa enim nec dui nunc mattis enim. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Porttitor leo a diam sollicitudin tempor id eu. Id leo in vitae turpis massa sed elementum. Sagittis eu volutpat odio facilisis mauris. Sed vulputate odio ut enim. Dignissim diam quis enim lobortis scelerisque fermentum dui faucibus in.</p>
//     </div>
//     <div className='about-daimondBox2'>
//         <img src={demo1img} className='about-daimondBox2-image' />
//     </div>
// </div>

// <div className='about-daimondBoxMain' style={{ marginTop: '80px' }}>
//     <div className='about-daimondBox2'>
//         <img src={demo2img} className='about-daimondBox2-image' />
//     </div>
//     <div className='about-daimondBox1'>
//         <p style={{ fontSize: '25px', color: '#7d7f85', fontFamily: 'FreightDispProMedium-Regular,Times New Roman,serif' }}>Wear a Smile</p>
//         <p style={{ textAlign: 'center', color: '#7d7f85', fontSize: '13px' }}>Dictum varius duis at consectetur lorem donec massa sapien faucibus. Eget magna fermentum iaculis eu non diam phasellus vestibulum. Sit amet luctus venenatis lectus magna fringilla urna. Aenean et tortor at risus viverra adipiscing. A diam maecenas sed enim ut sem. Faucibus pulvinar elementum integer enim neque volutpat. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Purus sit amet luctus venenatis lectus magna. Nam libero justo laoreet sit amet. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Donec ultrices tincidunt arcu non sodales neque sodales ut. Magna eget est lorem ipsum dolor sit. Eu sem integer vitae justo eget. Integer vitae justo eget magna fermentum iaculis eu non diam.</p>
//     </div>
// </div>
// </div>





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
                    <p style={{ fontSize: '30px', color: '#7d7f85', textAlign: 'center', fontFamily : 'FreightDispProMedium-Regular, "Times New Roman", serif' }}>KayraCreation Brand Story</p>
                    <div className='about-foundersDesc'>
                        <p style={{ fontSize: '14px', color: '#7d7f85', width: '700px', textAlign: 'center', letterSpacing: '1px' }}>A journey of our diamonds, our mission and our passion with your support and purchase. Watch a short video about us and our mission that we promised together with you. </p>
                    </div>
                    <div style={{display : 'flex', justifyContent : 'center'}}>
                        <iframe src="https://player.vimeo.com/video/431344262" width="640" height="480" frameborder="0" allowfullscreen=""></iframe>
                    </div>
                </div> */}

{/* <ContactForm /> */ }