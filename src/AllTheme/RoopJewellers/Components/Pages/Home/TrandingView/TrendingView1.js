import React, { useEffect, useState } from 'react'
import './TrendingView1.scss';
import { formatter, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const TrendingView1 = () => {

    const trandingViewData = [
        '/images/HomePage/TrendingViewBanner/tranding1.png',
        '/images/HomePage/TrendingViewBanner/tranding4.png',
        '/images/HomePage/TrendingViewBanner/tranding2.jpg',
        '/images/HomePage/TrendingViewBanner/tranding3.png',
    ];

    return (
        <div className='stam_mainTrending1Div'>
            <div className='smr_trending1TitleDiv'>
                <span className='smr_trending1Title'>Trending</span>
            </div>
            <div className="stam_trendingProduct-grid">
                <div className='smr_leftSideBestTR'>
                    <img src={`${storImagePath()}/images/HomePage/TrendingViewBanner/TrendingViewImgHom2.webp`} alt="modalimages" />
                    <div className="smr_lookbookImageRightDT">
                        <p>SHORESIDE COLLECTION</p>
                        <h2>FOR LOVE OF SUN & SEA</h2>
                    </div>
                </div>
                <div className='smr_rightSideTR'>

                    {trandingViewData.slice(0, 4).map((imagePath, index) => (
                        <div key={index} className="product-card">
                            <div className='stam_btimageDiv'>
                                <img src={`${storImagePath()}${imagePath}`} alt={`trending-${index}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingView1;
