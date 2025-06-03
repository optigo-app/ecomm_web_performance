import React, { useEffect, useState } from 'react';
import './TopSection.modul.scss';
import { useRecoilValue } from 'recoil';
import { el_loginState } from '../../../Recoil/atom';
import { Skeleton } from '@mui/material';
import ReactPlayer from 'react-player';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import CountdownTimer from '../CountdownTimer/CountdownUI';

const TopSection = ({ banner }) => {
    const islogin = useRecoilValue(el_loginState);
    const [loading, setLoading] = useState(true);
    const [videoStarted, setVideoStarted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const checkVideo = banner?.video?.[0];
    const checkImag = banner?.image?.[0];
    const checkImag1 = banner?.image?.[0];

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });

        const timer = setTimeout(() => {
            setLoading(false);
        }, 50);

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
        <div className="top-section-container">
            {!islogin ? (
                <>
                    {loading ? (
                        <div className="loader-container content_1">
                            <Skeleton variant="rectangular" width="100%" className='content_1' sx={{ backgroundColor: "#F8F8F8" }} animation="wave" />
                        </div>
                    ) : (
                        <video
                            src={checkVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls={false}
                            width="100%"
                            height="auto"
                            onPlay={() => setVideoStarted(true)}
                        />
                    )}
                </>
            ) : (
                <>
                    {loading ? (
                        <div className="loader-container">
                            <Skeleton
                                variant="rectangular"
                                width="100%"
                                sx={{
                                    height: {
                                        backgroundColor: "#F8F8F8",
                                        xs: '40vh',
                                        sm: '50vh',
                                        md: '60vh',
                                        lg: '65vh',
                                        xl: '70vh'
                                    }
                                }}
                                animation="wave" />
                        </div>
                    ) : (
                        <>
                            <img
                                loading="lazy"
                                src={checkImag}
                                className="elv_top_section_img"
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                alt="Main Banner"
                            />
                            {!imageLoaded && (
                                <Skeleton variant="rectangular" width="100%" height="100%" sx={{ backgroundColor: "#F8F8F8" }} animation="wave" />
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