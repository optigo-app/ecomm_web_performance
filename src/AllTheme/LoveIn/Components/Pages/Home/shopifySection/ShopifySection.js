import React, { useEffect, useState } from 'react'
// import image1 from '../../../assets/Lovein/shopify1.jpg'
// import image2 from '../../../assets/Lovein/shopify2.jpg'
// import image3 from '../../../assets/shopifysection/iamge3.webp'
// import image4 from '../../../assets/Lovein/rushit-patel.jpg'
// import image5 from '../../../assets/shopifysection/image5.webp'
// import image6 from '../../../assets/shopifysection/image6.webp'
import './shopifySection.scss'
import ReactPlayer from 'react-player'

export default function ShopifySection({ data }) {

    // const [storeInit,setStoreInit] = useState();

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         if(Object.keys(JSON.parse(localStorage.getItem("storeInit")))?.length){
    //             let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    //             console.log("storeinit",storeinit?.UploadLogicalPath,storeinit?.ukey,storeinit?.ufcc)
    //             setStoreInit(storeinit)
    //         }
    //     },800)
    // },[])


    const dataJSON = [
        {
            id: 0,
            Title: 'Craftsmanship',
            Decription: 'With our exquisite collection of diamond rings, earrings, necklaces, pendants, bracelets, and fashionable fine jewelry of all kinds, we offer a stunning range of exquisitely Hand-crafted fine jewelry.We have a unique and spectacular way of styling our designs. Only the best lab-grown diamonds, labgrown colored diamonds, and precious metals are used by us. Every piece of jewelry is individually handcrafted beyond imagination, and our wide assortment guarantees that they will discover the precise grace and design that perfectly captures the significant events in their lives and appeals to their unique persona and lifestyles in your cases. Join us in our journey to experience the whimsical world of lab-grown diamond jewelry!',
            // Link: 'DISCOVER MORE',
            // images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner2.jpg`
        },
        // {
        //     id: 1,
        //     Title: 'Carbon For Carbon',
        //     Decription: 'Sonasons has launched Carbon For Carbon campaign and is working with charity partners to plant trees and improve the environment impact of unnecessary carbon usage.',
        //     Link: 'LISTEN NOW',
        //     images: "https://media.istockphoto.com/id/1340519929/photo/concept-depicting-the-issue-of-carbon-dioxide-emissions-and-its-impact-on-nature-in-the-form.jpg?s=612x612&w=0&k=20&c=6u0Q-VfW1YHp1qPRPXw-_zR3VlyZX-8xGuX6lWbd-rA="
        // },
        // {
        //     id: 2,
        //     Title: 'Love in Diamonds with Celebrities at Red Carpet',
        //     Decription: 'Celebrities and Top Influencers wearing sustainable lab-grown diamonds jewelry',
        //     Link: 'DISCOVER',
        //     images: image1
        // },
        {
            id: 2,
            Title: 'WHERE LOVE SHINES THE BRIGHTEST',
            Decription: "We believe that every diamond is a testament to the enduring power of love. Our slogan, 'Where Love Shines the Brightest,' encapsulates our dedication to crafting exquisite lab-grown diamonds and high-finished jewelry that radiate with love's brilliance. Diamonds have long been revered as symbols of love, embodying strength, purity, and everlasting commitment. As manufacturers of high-end jewelry, we understand the profound significance that diamonds hold in celebrating life's most cherished moments. From engagement rings to anniversary gifts, each piece we create is imbued with the timeless essence of love, illuminating the hearts of those who wear them.",
            // SubDecription: "The wonder of 5 decades. Welcome to wonderful world of Love in Diamonds. House of incredible shapes & rare colours with magnificent designs of unparalleled collections & a stunning range of exquisitely handcrafted fine diamond jewelry. Love in Diamonds offers the upmost customer satisfaction to demonstrate this with our exquisite collection of diamond rings, earrings, necklaces, pendants, bracelets, and fashionable fine jewelry of all kinds with unique & spectacular way of styling our designs which is individually handcrafted beyond imagination. That is how we like to introduce our story. ",
            // Link: 'DISCOVER',
            // images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner1.jpg`
        },
        {
            id: 3,
            Title: 'BRAND STORY',
            Decription: "Love In Diamonds is a premier manufacturer of high-end, impeccably finished lab-grown diamond jewelry. Our journey began with a vision to capture the essence of love and beauty through exquisite craftsmanship. With a commitment to sustainability and innovation, we bring to life the brilliance of lab-grown diamonds in stunning designs that reflect elegance and sophistication. Each piece is meticulously crafted to illuminate your style and celebrate the moments that matter most. Discover the radiance of love with Love In Diamonds.",
            // Link: 'DISCOVER',
            // images: `${storImagePath()}/images/HomePage/BottombBanner/BottombBanner3.jpg`
        },
        // {
        //     id: 4,
        //     Title: 'Featured In',
        //     Decription: 'Check out the press coverage of Sonasons by top media in the world',
        //     Link: 'DISCOVER',
        //     images: "https://qodeinteractive.com/magazine/wp-content/uploads/2019/11/How-to-Add-Featured-Images-to-Your-WordPress-Posts-Featured.jpg"
        // },
        // {
        //     id: 5,
        //     Title: 'Listen To Sonasons Podcast',
        //     Decription: 'Tune into Sonasons podcast and join the Smiling Community. Here we will share thoughts with guest speakers on jewelry industry and sustainability.',
        //     Link: 'LISTEN NOW',
        //     images: "https://media.istockphoto.com/id/1138180728/vector/vector-of-a-smart-phone-and-headphones.jpg?s=612x612&w=0&k=20&c=XKUfukfHOaBOBIcvwBCOsJ9wPJYtgCcAaCRzDFt7kks="
        // },
    ]
    return (
        <div style={{ background: '#d8cbef' }} className='py-1'>
            <div>
                <div className='shopifyMain'>
                    <div className='shopifyDesc'>
                        <p className='shopifyTitle' style={{ textTransform: 'uppercase' }}>Craftsmanship</p>
                        <p className='shopifyDescription' style={{
                            textAlign: 'center',
                            lineHeight: '1.6',
                            fontWeight: 'normal'
                        }}>With our exquisite collection of diamond rings, earrings, necklaces, pendants, bracelets, and fashionable fine jewelry of all kinds, we offer a stunning range of exquisitely Hand-crafted fine jewelry.We have a unique and spectacular way of styling our designs. Only the best lab-grown diamonds, labgrown colored diamonds, and precious metals are used by us. Every piece of jewelry is individually handcrafted beyond imagination, and our wide assortment guarantees that they will discover the precise grace and design that perfectly captures the significant events in their lives and appeals to their unique persona and lifestyles in your cases. Join us in our journey to experience the whimsical world of lab-grown diamond jewelry!</p>
                        {/* <p style={{ fontSize: '12px', letterSpacing: '1px' }}>{data.Link}</p> */}
                    </div>
                    <div className='shopifyMainImage'>
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=6_K0BWuRQf0"
                            playing={true}
                            loop={true}
                            muted
                            controls={false}
                            width="100%"
                            height="600px"
                        />
                        {/* <video controls style={{ height: '600px', width: '100%', objectFit: 'cover' }}>
                            <source src={`https://youtube.com/shorts/6_K0BWuRQf0?si=n2cYRHXKvdxcpqoY`} type="video/mp4" />
                        </video> */}

                        {/* <Video videoUrl={'https://www.youtube.com/shorts/6_K0BWuRQf0'} videoId="DkVfi2ApzwQ" width='100%' height="600px" /> */}
                        {/* <img src={`${storImagePath()}/images/HomePage/BottombBanner/BottomBanner1.jpg`} style={{ height: '600px', width: '100%', objectFit:'cover' }} /> */}
                    </div>
                </div>
                <div className='shopifyMain'>
                    <div className='shopifyMainImage'>
                        <img src={data?.image?.[0]} style={{ height: '600px', width: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className='shopifyDesc'>
                        <p className='shopifyTitle' style={{ textTransform: 'uppercase' }}>WHERE LOVE SHINES THE BRIGHTEST</p>
                        <p className='shopifyDescription' style={{
                            textAlign: 'center',
                            lineHeight: '1.6',
                            fontWeight: 'normal'
                        }}>We believe that every diamond is a testament to the enduring power of love. Our slogan, 'Where Love Shines the Brightest,' encapsulates our dedication to crafting exquisite lab-grown diamonds and high-finished jewelry that radiate with love's brilliance. Diamonds have long been revered as symbols of love, embodying strength, purity, and everlasting commitment. As manufacturers of high-end jewelry, we understand the profound significance that diamonds hold in celebrating life's most cherished moments. From engagement rings to anniversary gifts, each piece we create is imbued with the timeless essence of love, illuminating the hearts of those who wear them.</p>
                        {/* <p style={{ fontSize: '12px', letterSpacing: '1px' }}>{data.Link}</p> */}
                    </div>
                </div>
                <div className='shopifyMain'>
                    <div className='shopifyDesc'>
                        <p className='shopifyTitle' style={{ textTransform: 'uppercase' }}>BRAND STORY</p>
                        <p className='shopifyDescription' style={{
                            textAlign: 'center',
                            lineHeight: '1.6',
                            fontWeight: 'normal'
                        }}>Love In Diamonds is a premier manufacturer of high-end, impeccably finished lab-grown diamond jewelry. Our journey began with a vision to capture the essence of love and beauty through exquisite craftsmanship. With a commitment to sustainability and innovation, we bring to life the brilliance of lab-grown diamonds in stunning designs that reflect elegance and sophistication. Each piece is meticulously crafted to illuminate your style and celebrate the moments that matter most. Discover the radiance of love with Love In Diamonds.</p>
                        {/* <p style={{ fontSize: '12px', letterSpacing: '1px' }}>{data.Link}</p> */}
                    </div>
                    <div className='shopifyMainImage shopifyMainImage3'>
                        <img src={data?.image?.[1]} className='ShopifyMainImage3' style={{ height: '600px', width: '100%', objectFit: 'contain' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
