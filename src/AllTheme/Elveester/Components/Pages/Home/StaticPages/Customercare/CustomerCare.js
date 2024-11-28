import React, { useEffect } from 'react'
import './CustomerCare.modul.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const CustomerCare = () => {

    const customerArr = [
        {
            title: 'Engraving Service', image: `${storImagePath()}/images/HomePage/CustomerService/CustomerServicesSubnBanner1Img.jpg`, desc: 'Crafting memories that last a lifetime with our precision engraving service. Personalize your moments with intricate details and heartfelt messages. Elevate your cherished possessions with a touch of uniqueness. Unleash the art of engraving – where every mark tells a story,Discover the difference of our dedicated approach to cleaning and services.'
        },
        {
            title: 'Cleaning and Polishing', image: `${storImagePath()}/images/HomePage/CustomerService/CustomerServicesSubnBanner2Img.jpg`, desc: 'Elevate your surroundings with our exceptional cleaning and services. Impeccable cleanliness, efficient solutions, and a commitment to excellence define our work. Experience a space that radiates freshness and order, tailored just for you.Unleash the art of engraving – where every mark tells a story,discover the difference of our dedicated approach to cleaning and services.'
        },
        {
            title: 'Repair Service', image: `${storImagePath()}/images/HomePage/CustomerService/CustomerServicesSubnBanner3Img.jpg`, desc: 'Your jewel is a precious creation and proper care in its use and handling will preserve its shine over time. If you see any signs of damage, you should refrain from wearing it until you have had it examined at our display office. We will take care of your jewel and broken parts may be repaired to restore the beauty of your jewel. You will receive a quotation once the type of service that needs to be carried out has been assessed. The service will be carried out as quickly as possible, upon your acceptance.'
        },
    ]

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        })
    }, [])
    return (
        <div className="elv_customer_mainDiv">
            <div className="elv_customer_div">
                <img className='elv_customer_image_1' src={`${storImagePath()}/images/HomePage/CustomerService/CustomerServiceMainBanner1Img.jpg`} alt="customerServices.jpg" />
                <div className='elv_customer_details_div'>
                    <h3 className='elv_customer_head_title'>AFTER SALES SERVICE</h3>
                    <div className='elv_customer_details'>
                        <p>Our commitment is to provide you with the highest level of jewelry care services. Our experts will be delighted to offer you advice and services to personalize your jewels, restore them, or simply preserve their beauty and longevity.</p>

                        <div className='elv_customer_cards_div'>
                            {customerArr?.map((i, index) => {
                                return (
                                    <div className='elv_customer_card' key={index}>
                                        <img className='elv_customer_card_img' src={i?.image} alt="" />
                                        <div className='elv_customer_card_title'>
                                            <span>{i?.title}</span>
                                        </div>
                                        <div className={index === 2 ? 'elv_customer_card_desc_1' : 'elv_customer_card_desc'}>
                                            <p>{i?.desc}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerCare