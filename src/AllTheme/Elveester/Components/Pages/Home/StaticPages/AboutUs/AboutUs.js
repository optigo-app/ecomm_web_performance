import React, { useEffect, useState } from 'react'
import './AboutUs.modul.scss'
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CompanyData from '../../ComapnayData/CompanyData';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const AboutUs = () => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabArr = ["about", "our mission", "our goal"];

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])

    return (
        <div className="elv_aboutus_maindiv">
            <div className="elv_aboutus_div">
                <img className='elv_aboutus_mainImg' src={`${storImagePath()}/images/HomePage/AboutUs/AboutUsMainBannerImg.jpg`} alt="aboutus.jpg" />
                <div className='elv_aboutus_details_div'>
                    <h2 className='elv_aboutus_head_title'>ABOUT US</h2>
                    <div className='elv_aboutus_details'>
                        <div className="elv_aboutus_details_leftside">
                            <Box sx={{ width: '100%', typography: 'body1' }}>
                                <TabContext value={value} className='elv_aboutus_desc'>
                                    <Box>
                                        <TabList
                                            onChange={handleChange}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-around',
                                                padding: 0,
                                                margin: 0,
                                                minHeight: '48px',
                                                paddingInline: '3%',
                                                fontFamily: 'sans-serif',
                                            }}
                                        >
                                            {tabArr.map((label, index) => (
                                                <Tab
                                                    key={index}
                                                    label={label}
                                                    value={(index + 1).toString()}
                                                    sx={{
                                                        flex: 1,
                                                        fontSize: '20px',
                                                        fontWeight: '700',
                                                        color: "#706c6c",
                                                        borderBottom: '1px solid white',
                                                        zIndex: 1,
                                                        fontFamily: 'sans-serif',
                                                        '&.Mui-selected': {
                                                            color: '#706c6c',
                                                            fontWeight: '600',
                                                            borderBottom: '2px solid black',
                                                            zIndex: 1
                                                        },
                                                        '@media screen and (max-width: 1000px)': {
                                                            // Styles for screens 1000px and wider
                                                            fontSize: '15px'
                                                        },
                                                    }}
                                                />
                                            ))}
                                        </TabList>
                                    </Box>
                                    {tabArr.map((_, index) => (
                                        <TabPanel key={index} value={(index + 1).toString()} sx={{
                                            '@media screen and (max-width: 425px)': {
                                                padding: '24px !important'
                                            },
                                        }}>
                                            {(index === 0 ? (
                                                <Aboutpara />
                                            ) : index === 1 ? (
                                                <Missionpara />
                                            ) : <Goalpara />)
                                            }
                                        </TabPanel>
                                    ))}
                                </TabContext>
                            </Box>
                        </div>
                        <div className="elv_aboutus_details_rightside">
                            <div style={{ marginRight: '5%' }}>
                                <img className='elv_aboutus_sec_img' src={`${storImagePath()}/images/HomePage/AboutUs/AboutUsVisitngImg.jpg`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <CompanyData />
                </div>
            </div >
        </div >
    )
}

export default AboutUs

const Aboutpara = () => {
    return (
        <>
            <div className='elv_paragraph_style'>
                <p>
                    Established in 2017 and housed in the heart of Gujarat’s inner south, Elvee Jewels is a name that embodies a trend of designing and manufacturing jewelry that is synonymous with beauty and sophistication.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                    We are constantly creating innovative strategies to provide the finest quality products according to all social and cultural trends. It has a reputation for doing things differently, with a keen eye for beauty and modern technology. We are focused on serving customers with refined taste and love to be beautiful. Elvee has proven beyond a doubt their commitment to designing timeless pieces of jewelry.
                </p>
                <p style={{ marginBottom: '0.5rem' }}>
                    We believe we are on the right path towards the accomplishment of our vision with Promise. Promise is renowned for its modern jewelry. It has fused inspiration and technical processes into creations to develop brilliant collections. We always say that style defines who you are and enhances your personality keeping this in mind we are introducing to you a new range of jewelry.Lovent - High Fashion Jewelry. Beyond Basic - Lab-grown Diamond jewelry, Nuera - Gold jewelry, Diament - Platinum Jewelry. An array of wondrous pieces spotlighting the same boundless creativity and expertise.
                </p>
            </div>
        </>
    )
}
const Missionpara = () => {
    return (
        <>
            <div className='elv_paragraph_style'>
                <p>
                    Our vision? It’s simple. We strive each day to build a beautiful company. Of course, beauty means different things to different people and our goal is to be successful at every level; for both our customers and the team. People at Elvee are smart, ambitious, go-getters and love what they do. We believe in authenticity and all our interactions are genuine. When you love what you do, you’re inspired to do it better every day.
                </p>
            </div>
        </>
    )
}
const Goalpara = () => {
    return (
        <>
            <div className='elv_paragraph_style'>
                <p>
                    Our commitment is to provide our customers with the most creative, and highest value end-to-end products. Our strategy to realize this goal is simple: via customer-centric. The customer is always at the center of our business.
                </p>
            </div>
        </>
    )
}