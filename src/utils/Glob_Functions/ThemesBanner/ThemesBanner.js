import { useState, useEffect } from "react";
import { storImagePath } from "../GlobalFunction";

const useHomeBannerImages = () => {
    const [banners, setBanners] = useState({
        mainBanner: {
          image: [],
          video: [],
        },
        middleBanner: {
          image: [],
          video: [],
        },
        brandlogo: {  // Changed name to avoid duplication
          image: [],
          video: [],
        },
        socialMediaBanner2: {  // Changed name to avoid duplication
          image: [],
          video: [],
        },
        trendingBanner: {
          image: [],
          video: [],
        },
        bestsellerBanner: {
          image: [],
          video: [],
        },
        newArrivalBanner: {
          image: [],
          video: [],
        },
        bottomBanner: {
          image: [],
          video: [],
        },
        lookbookBanner: {
          image: [],
          video: [],
        },
        promotionalBanner: {
          image: [],
          video: [],
        },
        collectionBanner: {
          image: [],
          video: [],
        },
        affiliation: {
          image: [],
          video: [],
        },
        photoGallery: {
          image: [],
          video: [],
        },
        popup: {
          image: [],
          video: [],
        },
        navbarMenu  :{
          image: [],
          video: [],
        },
        categoryBanner: {
          image: [],
          video:[],
        },
        aboutusBanner: {
          image: [],
          video:[],
        },
        careerBanner: {
          image: [],
          video:[],
        },
        historyBanner: {
          image: [],
          video:[],
        },
        contactusBanner: {
          image: [],
          video:[],
        },
        termsBanner: {
          image: [],
          video:[],
        },
        servicesBanner: {
          image: [],
          video:[],
        },
        appointmentBanner: {
          image: [],
          video:[],
        },
        customizeBanner: {
          image: [],
          video:[],
        },
        faqBanner: {
          image: [],
          video:[],
        },
      });

    useEffect(() => {
      const bannerData = {
          mainBanner: {
            image: [
              `${storImagePath()}/Banner/Homepagemainbanner1.png`,
              `${storImagePath()}/Banner/Homepagemainbanner2.png`,
              `${storImagePath()}/Banner/Homepagemainbanner3.png`,
              `${storImagePath()}/Banner/Homepagemainbanner4.png`,
            ],
            video: [`${storImagePath()}/Banner/homepagemainvideo.mp4`,`${storImagePath()}/Banner/homepagemainvideo2.mp4`],
          },
          middleBanner: {
            image: [
              `${storImagePath()}/Banner/middlebanner1.png`,
              `${storImagePath()}/Banner/middlebanner2.png`,
              `${storImagePath()}/Banner/middlebanner3.png`,
            ],
            video: [`${storImagePath()}/Banner/middlebanner1.mp4`,
              `${storImagePath()}/Banner/middlebanner2.mp4`,
              `${storImagePath()}/Banner/middlebanner3.mp4` 
            ],
          },
          brandlogo: { 
            image: [
              `${storImagePath()}/Banner/brandlogo1.png`,
              `${storImagePath()}/Banner/brandlogo2.png`,
              `${storImagePath()}/Banner/brandlogo3.png`,
              `${storImagePath()}/Banner/brandlogo4.png`,
              `${storImagePath()}/Banner/brandlogo5.png`,
              `${storImagePath()}/Banner/brandlogo6.png`,
            ],
            video: [],
          },
          socialMediaBanner2: { 
            image: [
              `${storImagePath()}/Banner/socialmediabanner1.png`,
              `${storImagePath()}/Banner/socialmediabanner2.png`,
              `${storImagePath()}/Banner/socialmediabanner3.png`,
              `${storImagePath()}/Banner/socialmediabanner4.png`,
              `${storImagePath()}/Banner/socialmediabanner5.png`,
            ],
            video: [],
          },
          trendingBanner: {
            image: [
              `${storImagePath()}/Banner/trendingbanner1.png`,
              `${storImagePath()}/Banner/trendingbanner2.png`,
            ],
            video: [],
          },
          bestsellerBanner: {
            image: [
              `${storImagePath()}/Banner/bestsellerbanner1.png`,
              `${storImagePath()}/Banner/bestsellerbanner2.png`,
            ],
            video: [],
          },
          newArrivalBanner: {
            image: [
              `${storImagePath()}/Banner/newarrivalbanner1.png`,
              `${storImagePath()}/Banner/newarrivalbanner2.png`,
            ],
            video: [],
          },
          bottomBanner: {
            image: [
              `${storImagePath()}/Banner/bottombanner1.png`,
              `${storImagePath()}/Banner/bottombanner2.png`,
            ],
            video: [`${storImagePath()}/Banner/bottombannerVideo1.mp4`,],
          },
          lookbookBanner: {
            image: [
              `${storImagePath()}/Banner/lookbookbanner1.png`,
              `${storImagePath()}/Banner/lookbookbanner.png`,
            ],
            video: [],
          },
          promotionalBanner: {
            image: [
              `${storImagePath()}/Banner/promotionalbanner1.png`,
              `${storImagePath()}/Banner/promotionalbanner2.png`,
              `${storImagePath()}/Banner/promotionalbanner3.png`,
              `${storImagePath()}/Banner/promotionalbanner4.png`,
              `${storImagePath()}/Banner/promotionalbanner5.png`,
            ],
            video: [],
          },
          collectionBanner: {
            image: [
              `${storImagePath()}/Banner/collectionbanner1.png`,
              `${storImagePath()}/Banner/collectionbanner2.png`,
              `${storImagePath()}/Banner/collectionbanner3.png`,
              `${storImagePath()}/Banner/collectionbanner4.png`,
              `${storImagePath()}/Banner/collectionbanner5.png`,
              `${storImagePath()}/Banner/collectionbanner6.png`,
            ],
            video: [],
          },
          affiliation: {
            image: [
              `${storImagePath()}/Banner/Affiliation1.png`,
              `${storImagePath()}/Banner/Affiliation2.png`,
              `${storImagePath()}/Banner/Affiliation3.png`,
              `${storImagePath()}/Banner/Affiliation4.png`,
              `${storImagePath()}/Banner/Affiliation5.png`,
              `${storImagePath()}/Banner/Affiliation6.png`,
              `${storImagePath()}/Banner/Affiliation7.png`,
              `${storImagePath()}/Banner/Affiliation8.png`,
              `${storImagePath()}/Banner/Affiliation9.png`,
              `${storImagePath()}/Banner/Affiliation10.png`,
              `${storImagePath()}/Banner/Affiliation11.png`,
              `${storImagePath()}/Banner/Affiliation12.png`,
            ],
            video: [],
          },
          photoGallery: {
            image: [
              `${storImagePath()}/Banner/photogallery1.png`,
              `${storImagePath()}/Banner/photogallery2.png`,
              `${storImagePath()}/Banner/photogallery3.png`,
              `${storImagePath()}/Banner/photogallery4.png`,
              `${storImagePath()}/Banner/photogallery5.png`,
              `${storImagePath()}/Banner/photogallery6.png`,
              `${storImagePath()}/Banner/photogallery7.png`,
              `${storImagePath()}/Banner/photogallery8.png`,
              `${storImagePath()}/Banner/photogallery9.png`,
              `${storImagePath()}/Banner/photogallery10.png`,
            ],
            video: [],
          },
          popup: {
            image: [
              `${storImagePath()}/Banner/popup.png`,
              `${storImagePath()}/Banner/popup1.png`,
              `${storImagePath()}/Banner/popup2.png`,
            ],
            video: [],
          },
          navbarMenu :{
            image: [
              `${storImagePath()}/Banner/navbarMenu1.png`,
              `${storImagePath()}/Banner/navbarMenu2.png`,
              `${storImagePath()}/Banner/navbarMenu3.png`,
              `${storImagePath()}/Banner/navbarMenu4.png`,
            ],
            video: [],
          },
          categoryBanner :{
            image: [
              `${storImagePath()}/Banner/categorybanner01.png`,
              `${storImagePath()}/Banner/categorybanner02.png`,
              `${storImagePath()}/Banner/categorybanner03.png`,
              `${storImagePath()}/Banner/categorybanner04.png`,
            ],
            video: [],
          },
          aboutusBanner :{
            image: [
              `${storImagePath()}/Banner/aboutusBanner1.png`,
              `${storImagePath()}/Banner/aboutusBanner2.png`,
            ],
            video: [],
          },
          careerBanner :{
            image: [
              `${storImagePath()}/Banner/careerBanner1.png`,
              `${storImagePath()}/Banner/careerBanner2.png`,
            ],
            video: [],
          },
          historyBanner :{
            image: [
              `${storImagePath()}/Banner/historyBanner1.png`,
              `${storImagePath()}/Banner/historyBanner2.png`,
            ],
            video: [],
          },
          contactusBanner :{
            image: [
              `${storImagePath()}/Banner/contactBanner1.png`,
            ],
            video: [],
          },
          termsBanner :{
            image: [
              `${storImagePath()}/Banner/termsBanner1.png`,
              `${storImagePath()}/Banner/termsBanner2.png`,
            ],
            video: [],
          },
          servicesBanner :{
            image: [
              `${storImagePath()}/Banner/servicesBanner1.png`,
              `${storImagePath()}/Banner/servicesBanner2.png`,
              `${storImagePath()}/Banner/servicesBanner3.png`,
              `${storImagePath()}/Banner/servicesBanner4.png`,
            ],
            video: [],
          },
          appointmentBanner :{
            image: [
              `${storImagePath()}/Banner/appointBanner1.png`,
              `${storImagePath()}/Banner/appointBanner2.png`,
              `${storImagePath()}/Banner/appointBanner3.png`,
              `${storImagePath()}/Banner/appointBanner4.png`,
              `${storImagePath()}/Banner/appointBanner5.png`,
              `${storImagePath()}/Banner/appointBanner6.png`,
              `${storImagePath()}/Banner/appointBanner7.png`,
              `${storImagePath()}/Banner/appointBanner8.png`,
              `${storImagePath()}/Banner/appointBanner9.png`,
            ],
            video: [],
          },
          customizeBanner :{
            image: [
              `${storImagePath()}/Banner/customizeBanner1.png`,
              `${storImagePath()}/Banner/customizeBanner2.png`,
              `${storImagePath()}/Banner/customizeBanner3.png`,
            ],
            video: [],
          },
          faqBanner :{
            image: [
              `${storImagePath()}/Banner/faqBanner1.png`,
            ],
            video: [],
          },
        };
        setBanners(bannerData);
      }, []); 
    return banners;
};

export default useHomeBannerImages;