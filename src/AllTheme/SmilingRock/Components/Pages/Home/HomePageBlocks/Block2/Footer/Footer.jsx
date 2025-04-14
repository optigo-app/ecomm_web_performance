import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import './Footer.scss'
import {
    Container,
    Divider,
    Stack,
    useTheme,
    useMediaQuery,
} from "@mui/material"
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';

const Footer = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [email, setemail] = useState("");
    const StoreData = JSON?.parse(sessionStorage?.getItem("storeInit"));
    const [companyInfoData, setCompanuInfoData] = useState(StoreData);
    const [socialMediaData, setSocialMediaData] = useState([]);
    const [loading1, setLoading1] = useState(false);
    const [result, setResult] = useState();
    const navigation = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let interval;
        const fetchData = () => {
            try {
                const storeInitData = sessionStorage.getItem("storeInit");
                if (storeInitData) {
                    const parsedStoreInit = JSON?.parse(storeInitData);
                    const companyInfoDataStr = sessionStorage.getItem("CompanyInfoData");
                    if (companyInfoDataStr) {
                        const parsedCompanyInfo = JSON?.parse(companyInfoDataStr);
                        setCompanuInfoData(parsedCompanyInfo);

                        const socialLinkStr = parsedCompanyInfo?.SocialLinkObj;
                        if (socialLinkStr) {
                            try {
                                const parsedSocialMediaData = JSON?.parse(socialLinkStr);
                                setSocialMediaData(parsedSocialMediaData);
                            } catch (error) {
                                console.error("Error parsing social media data:", error);
                            }
                        }
                    }

                    setLoading(false);
                    clearInterval(interval); // Clear the interval once data is found
                }
            } catch (error) {
                console.error("Error parsing data from sessionStorage:", error);
                setLoading(false);
                clearInterval(interval); // Clear the interval in case of error
            }
        };

        // Initial fetch
        fetchData();

        // Set up interval for continuous checking
        interval = setInterval(fetchData, 1000);

        // Cleanup function to clear interval on unmount
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, []);

    const HandleFormSubmit = async (e) => {
        setLoading1(true);

        const isValidEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        e.preventDefault();
        if (email.trim() === "") {
            setLoading1(false);
            setResult("Email is required.");
            return;
        } else if (!isValidEmail(email)) {
            setLoading1(false);
            setResult("Please enter a valid email address.");
            return;
        } else {
            setResult("");
        }

        const storeInit = JSON?.parse(sessionStorage?.getItem("storeInit"));
        const newslater = storeInit?.newslatter;
        if (newslater && email) {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            const newsletterUrl = `${newslater}${email}`;
            fetch(newsletterUrl)
                .then((response) => response.text())
                .then((result) => {
                    setResult(result); setLoading1(false); setTimeout(() => {
                        setResult(""); // Clear the result after 3000 ms
                        setemail('')

                    }, 3000);
                })
                .catch((error) => setResult(error));
        }
    };

    const footerSections = [
        {
            title: "POLICIES",
            links: [
                { name: "Privacy Policy", url: "/privacyPolicy" },
                { name: "Terms & Conditions", url: "/terms-and-conditions" },
                { name: "Contact", url: "/contactUs" }
            ],
        },
        {
            title: "ABOUT",
            links: [
                { name: "Our Story", url: "aboutUs" },
                { name: "Bespoke Jewellery", url: "bespoke-jewellery" },
                { name: "Appointment", url: "/appointment" },
            ]
        }
    ]
    return (
        <Box sx={{ bgcolor: "#f8f8f8", pt: 4, pb: 2 }}>
            <Container maxWidth="lg">
                <Grid sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Grid item xs={12} md={8}>
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: "bold", fontFamily: "PanText-Regular, serif" }}>
                                Join&nbsp;
                                <Typography component="span" variant="h6" sx={{ fontWeight: "bold", fontFamily: "PanText-Regular, serif" }}>
                                    Sonasons
                                </Typography>
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "PanText-Regular, serif" }}>
                                Join our rewards program today to earn points, get personal offers and enjoy exclusive benefits.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
                        <Button
                            variant="contained"
                            sx={{
                                bgcolor: "#222222",
                                "&:hover": { bgcolor: "#000000" },
                                borderRadius: 0,
                                px: 3,
                                fontFamily: "PanText-Regular, serif"
                            }}
                        >
                            JOIN NOW
                        </Button>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />
                <Grid spacing={4} sx={{
                    display: "flex", justifyContent: "space-between", width: "100%", flexWrap: 'nowrap',
                    '@media (max-width: 1000px)': {
                        flexWrap: 'wrap',
                    }
                }}>
                    <Grid item xs={12} sm={6} md={3} sx={{ flex: "1 1 25%" }}>
                        <ContactInformation socialLinkStr={socialMediaData} companyInfoData={companyInfoData} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} sx={{ flex: "1 1 25%" }}>
                        <NewsLetter
                            onsubmit={HandleFormSubmit}
                            email={email}
                            setemail={setemail}
                            loading1={loading1}
                            result={result}
                            setResult={setResult}
                        />
                    </Grid>
                    {footerSections.map((section) => (
                        <Grid item xs={12} sm={6} md={3} key={section.title} marginTop="2rem" sx={{ flex: "1 1 25%", marginLeft: "1rem" }}>
                            <Typography variant="subtitle2" className='smr1_font-fam' fontWeight="bold" gutterBottom>
                                {section.title}
                            </Typography>
                            <Stack spacing={1}>
                                {section.links.map((link) => (
                                    <RouterLink to={link.url} key={link.name} className="smr1_font-fam" style={{ fontSize: "0.8rem", textDecoration: 'none', color: '#696969' }}>
                                        {link.name}
                                    </RouterLink>
                                ))}
                            </Stack>
                        </Grid>
                    ))}
                </Grid>


                <Divider sx={{ my: 3 }} />

                <Grid spacing={2} display="flex" alignItems="center" justifyContent="space-between" sx={{
                    flexWrap: 'nowrap',
                    '@media (max-width: 1000px)': {
                        flexWrap: 'wrap',
                        justifyContent: "center"
                    }
                }}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="body2" sx={{ fontFamily: "PanText-Regular, serif" }} color="text.secondary">
                            © ALL RIGHTS RESERVED. 2025 Sonasons
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" }, flexWrap: 'wrap' }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ gap: { xs: "5px", md: "10px" }, flexWrap: { xs: 'wrap', md: 'nowrap' }, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                                {/* <IconButton size="small" color="inherit">
                                    <FacebookIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <InstagramIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <TwitterIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <YouTubeIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="inherit">
                                    <PinterestIcon fontSize="small" />
                                </IconButton> */}
                                {socialMediaData?.map((val, i) => {
                                    return <React.Fragment key={i}>
                                        <RouterLink
                                            key={i}
                                            to={val?.SLink}
                                            style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                            target="_blank"
                                        >
                                            <img src={val?.SImgPath} alt="" width={20} height={20} style={{
                                                mixBlendMode: "darken"
                                            }} />
                                        </RouterLink>
                                    </React.Fragment>
                                })}
                            </Stack>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box >

    )
}

export default Footer;

const NewsLetter = ({ onsubmit, email, setemail, loading1, result, setResult }) => {
    const alreadySubs = 'Already Subscribed.';
    const success = "Thank you"

    return (
        <div className="smr1_footer-section">
            <h4>NEWSLETTER</h4>
            <p className="address_hoq">
                Subscribe to get special offers, new collection launches, and
                once-in-a-while deals.
            </p>
            <form className="smr1_subscribe-form" onSubmit={onsubmit}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    name="email"
                    onChange={(e) => setemail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
            </form>
            {
                loading1 ? <span className="hoq_error_message" style={{ color: 'black' }}>Loading...</span> : (
                    <>
                        {result && (
                            <span
                                className="hoq_error_message"
                                style={{
                                    color: result.startsWith("Thank You!") ? "#04AF70" : "#FF0000",
                                    marginTop: "0px",
                                    display: "block",
                                }}
                            >
                                {result}
                            </span>
                        )}
                    </>
                )}
        </div>
    );
};

const ContactInformation = ({ socialLinkStr, companyInfoData }) => {
    return (
        <div className="smr1_footer-section">
            <h4>CONTACT US</h4>
            <p className="add_hoq_new_kl">
                {companyInfoData?.FrontEndAddress},
                <br />
                {companyInfoData?.FrontEndCity},
                <br />
                {companyInfoData?.FrontEndState},
                <br />
                {companyInfoData?.FrontEndZipCode}
            </p>
            <p className="add_hoq_new_kl">
                Mob. {companyInfoData?.FrontEndContactno1}
                <br />
                Email:     {companyInfoData?.FrontEndEmail1}
            </p>
            {/* <div className="social-links">
                {
                    socialLinkStr?.map((val, i) => {
                        return <React.Fragment key={i}>
                            <RouterLink
                                key={i}
                                to={val?.SLink}
                                style={{ display: "flex", alignItems: "center", gap: "5px" }}
                                target="_blank"
                            >
                                <img src={val?.SImgPath} alt="" width={15} height={15} style={{
                                    mixBlendMode: "darken"
                                }} />
                                {val?.SName}
                            </RouterLink>
                        </React.Fragment>
                    })
                }
            </div> */}
        </div>
    );
};