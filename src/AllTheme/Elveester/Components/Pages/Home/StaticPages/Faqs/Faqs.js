import React, { useEffect } from 'react'
import './Faqs.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import FaqSecData from '../FaqData/FaqSecData';
import useHomeBannerImages from '../../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner';

import {
    websiteFaqs,
    productFaqs,
    careRepairFAQ,
    customerServiceFaq,
    designCustoFaq,
    qualityAssuranceFaq,
    paymentFaq,
    shippingFaq,
    contactFaq,
    anyOtherQues
} from '../../../Constants/Faqlist';
import { Helmet } from 'react-helmet-async';

const allFaqs = [
    ...websiteFaqs,
    ...productFaqs,
    ...careRepairFAQ,
    ...customerServiceFaq,
    ...designCustoFaq,
    ...qualityAssuranceFaq,
    ...paymentFaq,
    ...shippingFaq,
    ...contactFaq,
    ...anyOtherQues
];


export const generateFAQJsonLd = (faqArray) => {
    const structured = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqArray.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": Array.isArray(faq.answer)
                    ? faq.answer.join('<br/>') // join multi-line answers
                    : faq.answer
            }
        }))
    };

    return structured;
};

const Faqs = () => {
    const { faqBanner } = useHomeBannerImages();
    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }, [])

    const jsonLd = generateFAQJsonLd(allFaqs);

    return (
        <>
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd, null, 2)}
                </script>
            </Helmet>
            <div className='elv_FaqSection'>
                <div className="image_bar">
                    <img src={faqBanner?.image?.[0]} alt="faq.png" />
                    {/* <img src={`${storImagePath()}/images/HomePage/Faq/FAQ_Banner.jpg`} alt="faq.png" /> */}
                </div>
                <FaqSecData />
            </div>
        </>
    )
}

export default Faqs