import React, { useEffect, useState } from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion';

const TheDifference = () => {
    // const navigate = useNavigate();
    // const [htmlContent, setHtmlContent] = useState('');

    // useEffect(() => {
    //     fetch(`${storImagePath()}/html/sonasonsTheDifference.html`)  /*for sonasons */
    //         // fetch(`${storImagePath()}/html/smrTheDeffrence.html`)  /*for kayara */
    //         // fetch(`${storImagePath()}/html/MdJewells.html`)   /*for maiora */
    //         .then((response) => response.text())
    //         .then((html) => {
    //             setHtmlContent(html);
    //             setTimeout(() => {
    //                 const learnMoreElements = document.querySelectorAll('.smr_learnMore');
    //                 learnMoreElements.forEach((element) => {
    //                     element.addEventListener('click', handleLearnMoreClick);
    //                 });
    //             }, 0);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching the HTML file:', error);
    //         });

    //     return () => {
    //         const learnMoreElements = document.querySelectorAll('.smr_learnMore');
    //         learnMoreElements.forEach((element) => {
    //             element.removeEventListener('click', handleLearnMoreClick);
    //         });
    //     };
    // }, []);

    // const handleLearnMoreClick = () => {
    //     navigate('/natural-diamond');
    // };


    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}  // Starts slightly below and invisible
            animate={{ opacity: 1, y: 0 }}   // Ends up at normal position with full opacity
            transition={{
                duration: 1,                   // Animation lasts 1 second
                ease: 'easeOut'                // Smooth easing function
            }}
        >
            {/* <p className='smilingTitle'>The KayraCreation Difference</p> */}
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
            {/* <div className='smilingRock'>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img className="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference1.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>Natural Diamond & jewellery</p>
                        <p className='learnMore' onClick={() => navigate('/natural-diamond')}>LEARN MORE</p>
                    </div>
                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference2.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>

                        <p className='smilingBoxName'>1% of each purchase goes to your choice of charity</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>

                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference3.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>

                        <p className='smilingBoxName'>Laser inscribed diamonds with Sonasons logo</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>

                </div>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img class="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference4.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>ECG+ Certified Brand Butterfly Mark</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>

                </div>
            </div> */}
            <div className="smilingPAgeMain" style={{ paddingBlock: '8%' }}>
                <p className="smilingTitle">The Sonasons Difference</p>
                <div className="smr_smilingRock">
                    <div className="smr_smilingRockBox">
                        <div className="smr_diffrence_box1_main">
                            <img
                                className="smr_deffrence_img"
                                src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference1.webp`}
                                alt="Natural Diamond & jewellery"
                            />
                        </div>
                        <div className="smr_diffrence_box2_main">
                            <p className="smr_smilingBoxName">Natural Diamond & jewellery</p>
                            {/* <p className='smr_learnMore'>LEARN MORE</p> */}
                        </div>
                    </div>
                    <div className="smr_smilingRockBox">
                        <div className="smr_diffrence_box1_main">
                            <img
                                className="smr_deffrence_img"
                                src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference2.webp`}
                                alt="1% of each purchase goes to your choice of charity"
                            />
                        </div>
                        <div className="smr_diffrence_box2_main">
                            <p className="smr_smilingBoxName">
                                1% of each purchase goes to your choice of charity
                            </p>
                            {/* <p className='smr_learnMore_N'>LEARN MORE</p> */}
                        </div>
                    </div>
                    <div className="smr_smilingRockBox">
                        <div className="smr_diffrence_box1_main">
                            <img
                                className="smr_deffrence_img"
                                src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference3.webp`}
                                alt="Laser inscribed diamonds with Sonasons logo"
                            />
                        </div>
                        <div className="smr_diffrence_box2_main">
                            <p className="smr_smilingBoxName">Laser inscribed diamonds with Sonasons logo</p>
                            {/* <p className='smr_learnMore_N'>LEARN MORE</p> */}
                        </div>
                    </div>
                    <div className="smr_smilingRockBox">
                        <div className="smr_diffrence_box1_main">
                            <img
                                className="smr_deffrence_img"
                                src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference4.webp`}
                                alt="ECG+ Certified Brand Butterfly Mark"
                            />
                        </div>
                        <div className="smr_diffrence_box2_main">
                            <p className="smr_smilingBoxName">ECG+ Certified Brand Butterfly Mark</p>
                            {/* <p className='smr_learnMore_N'>LEARN MORE</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default TheDifference