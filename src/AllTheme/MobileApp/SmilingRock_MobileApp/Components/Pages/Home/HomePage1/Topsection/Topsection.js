import * as React from 'react';
import './Topsection.scss';
import Slider from "react-slick";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { smrMA_loginState } from '../../../../Recoil/atom';


const Topsection = ({ data }) => {

    const [islogin, setislogin] = useRecoilState(smrMA_loginState);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true, // Enable autoplay
        autoplaySpeed: 3000,
        // prevArrow: false,
        // nextArrow: false,
    };


    return (
        <Card className='main_topSectop_card' sx={{ marginTop: !islogin ? 1.7 : "2rem", boxShadow: "none" }}>

            <Slider {...settings}>
                {data?.image?.slice(0, 4).map((path, index) => (
                    <Box key={index} sx={{ height: '500px', overflow: 'hidden', outline: "none" }}>
                        <CardMedia
                            component="img"
                            loading="lazy"
                            image={path}
                            alt={`Banner ${index + 1}`}
                            sx={{ objectFit: 'cover', height: '500px', width: '100%', outline: "none" }}
                        />
                    </Box>
                ))}
            </Slider>

            <CardContent sx={{ paddingInline: 0.3, paddingBlock: "10px" }}>
                <Typography gutterBottom className='srmm_topSection_contents_header' component="div">
                    Summer's Collection
                </Typography>
                <Typography variant="body2" className='srmm_topSection_contents' sx={{ color: 'text.secondary' }}>
                    Minimal efforts, maximum impact - meet the styles that will see you through vacation and beyond
                </Typography>
                <Button className='srmm_topSection_button'>
                    Shop Now
                </Button>
            </CardContent>
        </Card>
    )
}

export default Topsection
