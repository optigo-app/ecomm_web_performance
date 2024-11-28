import React from 'react'
import './WidgetsComponents.modul.scss'
import { Button, Card, CardMedia, Grid } from '@mui/material';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';



const services = [
    {
        image: "/images/HomePage/Banner/promoSetBanner2Img1.png",
        title: "CUSTOMISATION",
        buttonText: "Whatsapp up to start",
    },
    {
        image: "/images/HomePage/Banner/promoSetBanner2Img2.png",
        title: "TRY AT HOME",
        buttonText: "Book a visit",
    },
    {
        image: "/images/HomePage/Banner/promoSetBanner2Img2Hover.png",
        title: "BOOK AN APPOINTMENT",
        buttonText: "Book now",
    }
];

const WidgetsComponents = () => {
    return (
        <div className='dt_widgetsComponentsCard'>
            <Grid container spacing={2} justifyContent="center">
                {services.map((service, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <div className="widgetsTitleDiv mb-3">
                            <div class="lineContainer">
                                <p>{service?.title}</p>
                            </div>
                            <div className="containerLine">
                                <div className="line"></div>
                                <img src={storImagePath() + "/Diaomndtine/HomePage/Promo/Set/2/diamond.png"}
                                    alt="" class="centeredImage" loading='lazy' />
                                <div className="line"></div>
                            </div>
                        </div>
                        <Card className="service-card">
                            <div className="text-block">
                                <Button variant="contained" color="secondary" style={{ backgroundColor: '#a8807c', marginTop: '1rem', boxShadow: 'none' }}>
                                    {service.buttonText}
                                </Button>
                            </div>
                            <CardMedia
                                component="img"
                                height="100%"
                                width='100%'
                                src={storImagePath() + service.image}
                                alt={service.title}
                                loading='lazy'
                            // onError={handleImageError}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default WidgetsComponents