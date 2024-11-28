import React, { useEffect, useState } from 'react'
import { Suspense } from 'react';
import './Terms.modul.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const Terms = () => {

    const [firstImageLaod, setFirstImageLoad] = useState(false);

    const termsArr = [
        { title: 'PRODUCT AVAILABILITY', desc: "All of our jewelry is designed and manufactured on-site. We develop new designs by brand wise such as modern jewellerires, high fashion jewelleries occassional orianted jewellery, plain gold jewelleries at every months. These new designs will appeare on our website also we present new products on gem and jewellery exhibitions at india and international sectors." },
        { title: 'INFORMATION ON OUR SITE', desc: "We make every effort to ensure that our online catalog is as accurate and complete as possible. To allow you to view our pieces in full detail, some pieces may appear larger or smaller than their actual size and weight in our product images; and since every computer monitor is set differently, size may vary slightly." },
        { title: 'RETURN POLICY', desc: "We committed to complete customer satisfaction. We take pride in the quality and workmanship of our merchandise manufactured in our state-of-the-art facility, and we are confident that you will be completely satisfied. The contents of the package must be in their original condition and secure within the box. For your security do not indicate the contents of the package on the exterior of the box." },
        { title: 'SHIPPING POLICY', desc: "All of our shipments will be delivered using Indian Courier as well as international couriors. All custom orders will be shipped the following day when your order is completed." },
        { title: 'LIMITED WARRANTY', desc: "Our guarantee is simple and straightforward. If something is wrong due to faulty workmanship, we take care of it. It's a fair way of doing business. That being said, precious metals erode and stones can become damaged over time. When normal wear occurs, repairs can be done in house by our expert staff at the normal repair fee. Any work performed by a jeweler other than Elvee automatically voids the warranty. It is the responsibility of the customer to maintain insurance against loss or damage not covered by the warranty." },
    ]

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <div className="elv_terms_main_div">
            <div className="elv_terms_div">
                <div className='elv_terms_image_div'>
                    <Suspense fallback="">
                        <img className='elv_terms_image_1' src={`${storImagePath()}/images/HomePage/Terms-and-Condtions/TermConditionMainBanner.jpg`} alt="terms.jpg" onLoad={() => setFirstImageLoad(true)} />
                    </Suspense>
                    {firstImageLaod && (
                        <div>
                            <Suspense fallback="">
                                <img className='elv_terms_image_2' src={`${storImagePath()}/images/HomePage/Terms-and-Condtions/trans-logo.png`} alt="" />
                            </Suspense>
                        </div>
                    )}
                </div>
                <div className='elv_terms_descriptions_div'>
                    <h3 className='elv_terms_head_title'>TERMS AND CONDITIONS</h3>
                    <div className='elv_terms_desc'>
                        <p>These terms and conditions apply to Web site located at www.elvee.in and It is a basic terms and condition and please it carefully. By using the site, you agree to be bound by these TERMS AND CONDITIONS.</p>

                        {termsArr?.map((i, index) => {
                            return (
                                <>
                                    <div key={index} className='mt-5'>
                                        <span className='elv_terms_title_main'>{i?.title}</span>
                                        <p className='elv_terms_para_main'>
                                            {i?.desc}
                                        </p>
                                    </div>
                                </>
                            )
                        })}

                        <p className='my-5'>* The policy of terms and condition will be change after you cover the membership and above policy is consider as basic policy for non-membership customers.</p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Terms