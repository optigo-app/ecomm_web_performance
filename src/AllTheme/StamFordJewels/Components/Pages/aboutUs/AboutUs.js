import React, { useEffect, useState } from 'react'
import './AboutUs.modul.scss'
import { storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../Home/Footer/Footer';
import AboutS from './AboutS';

export default function AboutUs() {

    // const [htmlContent, setHtmlContent] = useState('');

    // useEffect(() => {
    //     fetch(`${storImagePath()}/html/About.html`)
    //         .then((response) => response.text())
    //         .then((html) => {
    //             setHtmlContent(html);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching the HTML file:', error);
    //         });
    // }, []);

    return (
        <div className='stam_contactMain'>
            <AboutS/>
            {/* <div className='daimondsEveryAbout'>
                <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            </div> */}
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
{
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

{/* <ContactForm /> */ }}