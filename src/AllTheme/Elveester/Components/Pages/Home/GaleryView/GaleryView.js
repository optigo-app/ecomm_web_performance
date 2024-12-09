import React from 'react'
import './GaleryView.modul.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const sliderData = [
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg01.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg02.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg03.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg04.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg05.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg06.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg07.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg08.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg09.jpg",
  },
  {
    imageUrl: "/images/HomePage/Gallery/GalleryImg10.jpg",
  },
  // {
  //   imageUrl: "/images/HomePage/Gallery/GalleryImg11.jpg",
  // },
  // {
  //   imageUrl: "/images/HomePage/Gallery/GalleryImg12.jpg",
  // },
  // {
  //   imageUrl: "/images/HomePage/Gallery/GalleryImg13.jpg",
  // },
  // {
  //   imageUrl: "/images/HomePage/Gallery/GalleryImg14.jpg",
  // },
];

export default function GaleryView() {
  return (
    <div className='el_mainGalleryConatinerID' id='mainGalleryConatinerID' name='mainGalleryConatinerID123'>
      <div className='elv_gallery_div'>
        <p className='galeryComponents'>Gallery</p>
        <span className='elv_gallery_subtitle'>Where Every Piece Tells a Story.</span>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{ clickable: true }}
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
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1240: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide key={index} style={{ marginRight: '0px', padding: '20px' }}>
            <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{ objectFit: 'contain', width: '100%' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}