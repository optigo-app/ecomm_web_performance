import * as React from 'react';
import Card from '@mui/material/Card';
import { Box } from '@mui/material';
import { motion, useInView } from 'framer-motion'; // ← updated
import { useRecoilState, useSetRecoilState } from 'recoil';
import ColorThief from 'colorthief';
import { TinyColor } from '@ctrl/tinycolor';
import { smrMA_loginState, smrMA_logoColor } from '../../../../Recoil/atom';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';


function getTextColor(backgroundColor = 'rgb(255,255,255)') {
    const color = new TinyColor(backgroundColor);
    return color.isLight() ? '#000000' : '#FFFFFF';
}

const VideoBanner1 = ({ data }) => {
    const sectionRef = React.useRef(null);
    const videoRef = React.useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-50px' }); // trigger once
    const [isPlaying, setIsPlaying] = React.useState(false);

    const setLogoColor = useSetRecoilState(smrMA_logoColor);

    const handleVideoLoad = () => {
        setTimeout(() => { }, 0);

        // Check if videoRef is not null before accessing its properties
        if (videoRef.current) {
            videoRef.current.controls = false;
        }
    };


    const handleVideoPlay = () => {
        setIsPlaying(true);
    };

    React.useEffect(() => {
        if (!data?.image?.[1]) return;

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = data.image[1];

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

    return (
        <Card
            ref={sectionRef}
            className="main_topSectop_card"
            sx={{ boxShadow: 'none' }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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
                        src={data?.image?.[1]}
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
                    <source src={data?.video?.[1]} type="video/mp4" />
                </video> :
                    <ReactPlayer
                        url={data?.video?.[1]}
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

            {/* Text with animation in view */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
                style={{ paddingInline: 0.3, paddingBlock: '10px', textAlign: 'center' }}
            >
                <h2 className="srmm_topSection_contents_header">
                    This Month's Must-Haves
                </h2>
                <p className="srmm_topSection_contents" style={{ color: '#777', marginTop: '8px' }}>
                    Discover the most sought-after jewellery pieces of the season — handpicked for their timeless elegance and modern charm.
                </p>
            </motion.div>
        </Card>
    );
};

export default VideoBanner1;

