import React from 'react'
import './SocialMedia.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { Button } from '@mui/material';
import { AiFillInstagram } from 'react-icons/ai';
import GoogleAnalytics from 'react-ga4';

const SocialMedia = () => {

    const photos = [
        {
            image: "/images/HomePage/Instagram/BottombBanner1.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner2.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner3.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner4.jpg",
        },
        {
            image: "/images/HomePage/Instagram/BottombBanner5.jpg",
        }
    ];
    
    const Sonaphotos = [
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner1.jpeg",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner2.webp",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner3.webp",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner4.webp",
        },
        {
            image: "/images/HomePage/Instagram/sona/BottombBanner5.jpg",
        }
    ];

    const Url = `https://www.instagram.com/houseofdiamondtine/`;
    const Url2 = `https://www.instagram.com/`;
    const DomainConnect = 1 ? Url : Url2 ;


    const HandleGoogleAn = (ClickedPostNo)=>{
        GoogleAnalytics.event({
            action: "Social Media Post Analtyics",
            category: `Social Media Post`,
            label: `User Clicked On Post Number ${ClickedPostNo}` ,
          });
    }

    return (
        <div className='dt_SocialMedia'>
            <p className='smr_bestseler1Title'>Follow Us On Instagram</p>
            <div className='dt_SocialmediawidgetsComponentsCard'>
                <div className="dt_instagram_gallery">
                    {photos?.map((photo, index) => (
                        <div key={index} className="dt_instagram_photo" onClick={() =>{ window.open(DomainConnect);
                            HandleGoogleAn(index+1)
                        }}>
                            <img src={storImagePath() + photo?.image} alt={`Instagram Photo ${index + 1}`} loading='lazy' />
                            <div className="dt_socialMedioverlay"></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button onClick={() => window.open(DomainConnect)} variant="contained" color="secondary" style={{ backgroundColor: '#a8807c', marginTop: '1rem', boxShadow: 'none' }} startIcon={<AiFillInstagram />}>
                    Follow us
                </Button>
            </div>

        </div>
    )
}

export default SocialMedia