import React from 'react'
import './SocialMediaSection.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const sliderData = [
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia1.jpg",
    link: 'https://www.instagram.com/p/DLFavolo8AL/?hl=en',
    icon: `${storImagePath()}/images/HomePage/SocialLinks/instagram.png`
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia2.jpg",
    link: 'https://in.pinterest.com/pin/706854104054503002/',
    icon: `${storImagePath()}/images/HomePage/SocialLinks/pinterest.png`
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia3.jpg",
    link: 'https://www.facebook.com/photo?fbid=1106048178220743&set=a.555547953270771',
    icon: `${storImagePath()}/images/HomePage/SocialLinks/facebook.png`
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/socialMedia4.jpg",
    link: 'https://www.linkedin.com/company/31187751/admin/page-posts/published/',
    icon: `${storImagePath()}/images/HomePage/SocialLinks/linkedin.png`
  },
];

export default function SocialMediaSection({ banner }) {
  const updatedata = sliderData?.map((item, index) => ({
    ...item,
    imageUrl: banner?.image?.[index] || item?.imageUrl
  }));

  return (
    <div className='mainSocialMediaConatiner' id='mainSocialMediaConatinerID' name='mainSocialMediaConatinerID'>
      <div className='elv_socialMed_div'>
        <h2 className='socialmediaptag'>Social Media</h2>
        <span className='elv_social_subtitle'>Stay Connected, Stay Inspired.</span>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1240: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination]}
        // pagination={{ clickable: true }}
        className="social_mySwiper"
      >
        {updatedata.map((slide, index) => (
          <div style={{ background: 'red' }} key={index}>
            <SwiperSlide key={index} style={{ marginRight: '0px', padding: '30px 20px 0px 19px' }}>
              <Link to={slide?.link}>
                <div style={{ position: 'relative' }}>
                  <img loading="lazy" src={slide?.imageUrl} alt={`Slide ${index}`} style={{ objectFit: 'contain', width: '100%', padding: '0px' }} />
                  {/* <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{ objectFit: 'contain', width: '100%', padding: '0px' }} /> */}
                </div>
                <div className='elv_social_div'>
                  <img src={slide?.icon} className='elv_social_icon' height={25} width={25} alt="icons.png" />
                </div>
              </Link>
            </SwiperSlide>
          </div>
        ))}
      </Swiper>
    </div>
  );
}