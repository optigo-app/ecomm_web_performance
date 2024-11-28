import React, { useEffect, useState } from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import { useNavigate } from 'react-router-dom'

const TheDifference = () => {
    const navigate = useNavigate();
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch(`${storImagePath()}/html/smrTheDeffrence.html`)  /*for kayara */
            // fetch(`${storImagePath()}/html/MdJewells.html`)   /*for maiora */
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
                setTimeout(() => {
                    const learnMoreElements = document.querySelectorAll('.smr_learnMore');
                    learnMoreElements.forEach((element) => {
                        element.addEventListener('click', handleLearnMoreClick);
                    });
                }, 0);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });

        return () => {
            const learnMoreElements = document.querySelectorAll('.smr_learnMore');
            learnMoreElements.forEach((element) => {
                element.removeEventListener('click', handleLearnMoreClick);
            });
        };
    }, []);

    const handleLearnMoreClick = () => {
        navigate('/natural-diamond');
    };


    return (
        <div style={{ marginBlock: '10px' }}>
            {/* <p className='smilingTitle'>The KayraCreation Difference</p> */}
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
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
        </div>
    )
}

export default TheDifference