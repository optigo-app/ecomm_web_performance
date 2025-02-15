import { Swiper, SwiperSlide } from 'swiper/react';
import './Craftmenship.modul.scss'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';


const sliderData = [
    {
        imageUrl: "/images/HomePage/Craftmenship/craftingImg01.jpg",
    },
    {
        imageUrl: "/images/HomePage/Craftmenship/craftingImg02.jpg",
    },
    {
        imageUrl: "/images/HomePage/Craftmenship/craftingImg03.jpg",
    },
];

export default function Craftmenship({ banner }) {
    return (
        <div className='el_craftmenshipId_main' name='craftmenshipId' id="craftmenshipId">
            <div className='elv_craftman_div'>
                <p className='craftmenship'>Our Craftmenship</p>
                <span className='elv_craft_subtitle'>Crafting Timeless Elegance with Precision</span>
            </div>
            <Swiper
                navigation={true}
                modules={[Pagination, Navigation]}
                className="craft_mySwiper"
            >
                {banner?.image?.slice(0, 3)?.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <img loading="lazy" src={slide} alt={`Slide ${index}`} style={{ width: '100%', height: '70vh', objectFit: 'cover' }} />
                        {/* <img loading="lazy" src={storImagePath() + slide.imageUrl} alt={`Slide ${index}`} style={{ width: '100%', height: '70vh', objectFit: 'cover' }} /> */}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}