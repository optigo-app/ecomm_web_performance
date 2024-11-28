import React, { useEffect, useState } from 'react';
import './TopSection.modul.scss';
import { useRecoilValue } from 'recoil';
import { el_loginState } from '../../../Recoil/atom';
import { Skeleton } from '@mui/material';
import ReactPlayer from 'react-player';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import CountdownTimer from '../CountdownTimer/CountdownUI';

const TopSection = () => {
    const islogin = useRecoilValue(el_loginState);
    const [loading, setLoading] = useState(true);
    const [videoStarted, setVideoStarted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const checkVideo = `${storImagePath()}/images/HomePage/MainBanner/videos/HomepageMainBannerVideo.mp4`;
    const checkImag = `${storImagePath()}/images/HomePage/MainBanner/HomepageMainBannerVideo.png`;

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });

        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleVideoPlay = () => {
        setVideoStarted(true);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageLoaded(false);
    };
  
    return (
        <div>
            {!islogin ? (
                <>
                    {loading ? (
                        <div className="loader-container">
                            <Skeleton variant="rectangular" width='100%' height={700} animation="wave" />
                        </div>
                    ) : (
                        <ReactPlayer
                            url={checkVideo}
                            playing={true}
                            muted={true}
                            controls={!videoStarted}
                            loop={true}
                            width='100%'
                            height='auto'
                            onPlay={handleVideoPlay}
                        />
                    )}
                </>
            ) : (
                <>
                    {loading ? (
                        <div className="loader-container">
                            <Skeleton variant="rectangular" width='100%' height={700} animation="wave" />
                        </div>
                    ) : (
                        <>
                            <img
                                loading="lazy"
                                src={checkImag}
                                className='elv_top_section_img'
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                alt="Main Banner"
                            />
                            {!imageLoaded && (
                                <Skeleton variant="rectangular" width='100%' height={700} animation="wave" />
                            )}
                            <CountdownTimer />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default TopSection;
