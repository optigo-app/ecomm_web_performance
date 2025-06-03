import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSetRecoilState } from 'recoil';
import ColorThief from 'colorthief';
import { TinyColor } from '@ctrl/tinycolor';
import { smrMA_logoColor } from '../../../../Recoil/atom';

const Banner1 = ({ data }) => {
    const ref = useRef(null);
    const imgRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const setLogoColor = useSetRecoilState(smrMA_logoColor);

    const handleImageLoad = () => {
        try {
            const img = imgRef.current;
            if (img && img.complete) {
                const thief = new ColorThief();
                const [r, g, b] = thief.getColor(img);
                const bgColor = `rgb(${r}, ${g}, ${b})`;

                const textColor = getTextColor(bgColor);
                console.log("TCL: handleImageLoad -> textColor", textColor)
                setLogoColor(textColor);
            }
        } catch (error) {
            console.error('Color extraction failed:', error);
        }
    };

    const getTextColor = (backgroundColor = 'rgb(255,255,255)') => {
        const color = new TinyColor(backgroundColor);
        console.log("TCL: getTextColor -> color.isLight()", color.isLight())
        return color.isLight() ? '#000000' : '#FFFFFF';
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 70 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
                textAlign: 'center',
                overflow: 'hidden',
                backgroundColor: '#fff'
            }}
        >
            <img
                ref={imgRef}
                src={data?.image?.[0]}
                alt="Optimized Banner"
                style={{ width: '100%', height: 'auto' }}
                loading="lazy"
                crossOrigin="anonymous"
                onLoad={handleImageLoad}
            />
            <div style={{ padding: '16px', width: "95%", marginInline: "auto" }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>
                    💍 Jewellery Bestseller
                </h2>
                <p style={{ color: '#777', marginTop: '8px' }}>
                    Discover our most loved pieces by customers this season.
                </p>
            </div>
        </motion.div>
    );
};

export default Banner1;
