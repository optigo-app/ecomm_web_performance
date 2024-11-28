import React from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const TheDifference = () => {

    const VideoSrc = {
        video1:`${storImagePath()}/images/HomePage/a1.mp4`,
        video2:`${storImagePath()}/images/HomePage/a2.mp4`,
    };

    return (
        <div  className='mala_smilingPAgeMain'>
            <div className='mala_smilingPAgeMain_one'>
                {/* <img className="simple_card_gif " src={`${storImagePath()}/images/HomePage/gif1.gif`} alt="" /> */}
                <video src={VideoSrc?.video1}  muted loop autoPlay />
            </div>
            <div className='mala_smilingPAgeMain_two'>
                {/* <img className="simple_card_gif" src='https://malakan.com/wp-content/uploads/2024/04/Hompage-Ring-New-Large.gif' alt="" /> */}
                <video src={VideoSrc?.video2} muted loop autoPlay />
            </div>
        </div>
    )
}

export default TheDifference