import React, { useCallback, useEffect, useRef, useState } from 'react';
import './Topsection.scss';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import ReactPlayer from 'react-player';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ColorThief from 'colorthief';
import { TinyColor } from '@ctrl/tinycolor';
import { smrMA_loginState, smrMA_logoColor } from '../../../../Recoil/atom';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

function getTextColor(backgroundColor = 'rgb(255,255,255)') {
    const color = new TinyColor(backgroundColor);
    return color.isLight() ? '#000000' : '#FFFFFF';
}

const Topsection = ({ data }) => {
    const setLogoColor = useSetRecoilState(smrMA_logoColor);
    const videoRef = useRef(null);
    const [videoStarted, setVideoStarted] = useState(false);
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoLoad = () => {
        setTimeout(() => { }, 0);

        // Check if videoRef is not null before accessing its properties
        if (videoRef.current) {
            videoRef.current.controls = false;
        }
    };


    const handleVideoPlay = () => {
        setVideoStarted(true);
    };

    const handleColorExtraction = useCallback((bgColor) => {
        console.log("TCL: handleColorExtraction -> bgColor", bgColor)
        const textColor = getTextColor(bgColor);
        setLogoColor(textColor);
    }, []);

    useEffect(() => {
        if (!data?.image?.[0]) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = data.image[0];

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const pixels = imageData.data;

                let rTotal = 0, gTotal = 0, bTotal = 0;
                let count = 0;

                for (let i = 0; i < pixels.length; i += 4 * 100) {
                    rTotal += pixels[i];
                    gTotal += pixels[i + 1];
                    bTotal += pixels[i + 2];
                    count++;
                }

                const avgR = Math.round(rTotal / count);
                const avgG = Math.round(gTotal / count);
                const avgB = Math.round(bTotal / count);

                const bgColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
                console.log("TCL: img.onload -> bgColor", bgColor)

                const textColor = getTextColor(bgColor);
                setLogoColor(textColor);
            } catch (err) {
                console.error('Color extraction failed:', err);
            }
        };

        img.onerror = () => {
            console.warn('Failed to load image for color extraction');
        };
    }, [data?.image?.[0], setLogoColor]);

    const isIOS = () => {
        return (
            typeof navigator !== 'undefined' &&
            /iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !window.MSStream
        );
    };
    console.log("TCL: isIOS -> isIOS", isIOS())

    return (
        <Card className='main_topSectop_card' sx={{ boxShadow: 'none' }}>
            {/* Animated video background */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{
                    height: '100svh',
                    width: '100%',
                    overflow: 'hidden',
                    outline: 'none',
                }}
            >
                {/* <video
                    ref={videoRef}
                    style={{ height: "100%", width: "100%", objectFit: 'cover' }}
                    muted
                    controls={false}
                    autoPlay
                    loop
                    playsInline
                    onLoadedData={handleVideoLoad}
                    onPlay={handleVideoPlay}
                    loading="lazy"
                    preload="auto"
                // poster={data?.image?.[0]}
                >
                    <source src={data?.video?.[0]} type="video/mp4" />
                </video> */}

                {!isPlaying && (
                    <img
                        src={data?.image?.[0]}
                        alt="poster"
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            zIndex: 1,
                        }}
                    />
                )}

                {isIOS() ? <video
                    ref={videoRef}
                    style={{ height: "100%", width: "100%", objectFit: 'cover' }}
                    muted
                    controls={false}
                    autoPlay
                    loop
                    playsInline
                    onLoadedData={handleVideoLoad}
                    onPlay={handleVideoPlay}
                    loading="lazy"
                    preload="auto"
                >
                    <source src={data?.video?.[0]} type="video/mp4" />
                </video> :
                    <ReactPlayer
                        url={data?.video?.[0]}
                        playing={true}
                        loop={true}
                        muted={true}
                        playsinline={true}
                        width="100%"
                        height="auto"
                        style={{ objectFit: 'cover' }}
                        onStart={() => setIsPlaying(true)}
                        onReady={() => setIsPlaying(true)}
                    />
                }
            </motion.div>

            {/* Text block with entrance animation on page load */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                style={{
                    paddingInline: 0.3,
                    paddingBlock: '10px',
                    textAlign: 'center',
                }}
            >
                <h2 className='srmm_topSection_contents_header'>
                    Summer's Collection
                </h2>
                <p
                    className='srmm_topSection_contents'
                    style={{ color: '#777', marginTop: '8px' }}
                >
                    Minimal efforts, maximum impact – meet the styles that will see you through vacation and beyond.
                </p>
            </motion.div>
        </Card>
    );
};


export default Topsection;
