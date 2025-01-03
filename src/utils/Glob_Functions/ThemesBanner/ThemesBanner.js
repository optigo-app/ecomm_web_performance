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
        }
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
        brandlogo: { // Corrected
          image: [
            `${storImagePath()}/Banner/brandlogo1.png`,
            `${storImagePath()}/Banner/brandlogo2.png`,
            `${storImagePath()}/Banner/brandlogo3.png`,
            `${storImagePath()}/Banner/brandlogo4.png`,
          ],
          video: [],
        },
        socialMediaBanner2: { // Corrected
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
          ],
          video: [],
        },
        affiliation: {
          image: [
            `${storImagePath()}/Banner/Affiliation1.png`,
            `${storImagePath()}/Banner/Affiliation2.png`,
            `${storImagePath()}/Banner/Affiliation3.png`,
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
          ],
          video: [],
        },
        popup: {
          image: [
            `${storImagePath()}/Banner/popup.png`,
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
        }
      };
      setBanners(bannerData);
    }, []); 
  return banners;
};

export default useHomeBannerImages;