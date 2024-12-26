import React from "react";
import "./PromotionBanner.modul.scss";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import FLower from '../../../Assets/flower.svg';
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import ZigZagLine from "../../../SVGComponent/ZigZagline";
import { useMediaQuery } from "@mui/material";

const PromotionalBanner = ({ onClose }) => {
    const image = {
        banner: `${storImagePath()}/images/HomePage/Promotion/banner.webp`,
    };
    const flower = FLower;

    const maxWidth1300px = useMediaQuery('(max-width:1300px)');
    const maxWidth900px = useMediaQuery('(max-width:900px)');
    const maxWidth550px = useMediaQuery('(max-width:550px)');

    return (
        <div className="smr_pm_PromotionalBanner">
            <div className="promotional-banner">
                <div className="banner-content">
                    {/* Main content container */}
                    <div className="main-content">
                        {!maxWidth900px && (
                            <ZigZagLine height={300} width={15} color="#D1D5DB" strokeWidth={1.5} />
                        )}
                        {/* Left side content */}
                        <div className="left-content">
                            <h1 className="main-heading">
                                {!maxWidth1300px ? (
                                    <>
                                        <span>Essential</span>
                                        <br />
                                        <span>Accessories</span>
                                    </>
                                ) : (
                                    <span>Essential Accessories</span>
                                )}
                            </h1>

                            <div className="cta-box">
                                <p className="cta-text">elevate your style game</p>
                            </div>

                            {/* Decorative stars */}
                            <div className="star-decor">
                                {[1, 2, 3].map((_, i) => (
                                    <MdOutlineStarPurple500 size={maxWidth550px ? 15 : 28} key={i} />
                                ))}
                            </div>
                        </div>

                        {/* Right side image */}
                        <div className="right-image-container">
                            {/* Top flower image */}
                            {!maxWidth900px && (
                                <div className="flower-image-container top">
                                    <img src={flower} alt="Flower Decoration" className="flower-image" />
                                </div>
                            )}

                            {/* Main banner image */}
                            <img
                                src={image?.banner}
                                alt="Gold rings on beige background"
                                className="main-image"
                            />

                            {/* Bottom flower image */}
                            {!maxWidth900px && (
                                <div className="flower-image-container bottom">
                                    <img src={flower} alt="Flower Decoration" className="flower-image rotated" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Decorative corner elements */}
                    <div className="corner-decor">
                        {/* <svg
                            className="corner-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M12 2C14.5 2 17 3 17 6C17 9 14.5 10 12 10C9.5 10 7 9 7 6C7 3 9.5 2 12 2Z"
                                strokeWidth="0.4"
                            />
                        </svg> */}
                        <RxCross2 className="corner-cancel" onClick={onClose} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;
