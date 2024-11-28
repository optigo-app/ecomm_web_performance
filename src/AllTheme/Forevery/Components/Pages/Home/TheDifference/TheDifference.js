import React from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const TheDifference = () => {
    
    return (
        <div style={{ paddingBlock: '5%' }} className='smilingPAgeMain'>
            <p className='smilingTitle'>The Sonasons Difference</p>
            <div className='smilingRock'>
                <div className='smilingRockBox'>
                    <div className='smilingRockBoxSub1'>
                        <img className="simple-card__img " src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference1.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>Natural Diamond & jewellery</p>
                        <p className='learnMore'>LEARN MORE</p>
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
                        <img class="simple-card__img "src={`${storImagePath()}/images/HomePage/TheDifference/TheDifference4.webp`} alt="" />
                    </div>
                    <div className='smilingRockBoxSub2'>
                        <p className='smilingBoxName'>ECG+ Certified Brand Butterfly Mark</p>
                        <p className='learnMore'>LEARN MORE</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default TheDifference