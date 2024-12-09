import React from 'react'
import './Location.modul.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../../Home/Footer/Footer';

export default function Location() {
    const [htmlContent, setHtmlContent] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        fetch(`${storImagePath()}/html/Location.html`)
        // fetch(`${storImagePath()}/html/Locationsona.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });
    }, []);

    return (
        <div className='dt_faqMaindiv'>
            <div className='dt_FaqSubDivMain'>
                <div className='dt_Faq_Sub_Set' style={{ marginInline: '10%', paddingBottom: '80px' }}>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>

                <p className='dt_contactBox2Title'>Studio Address
                    <p className='dt_contactBox2Desc'>E-4, South EX-|| New Delhi 110049</p>

                    <p className='dt_contactBox2Title'>Opening Hours
                        <p className='dt_contactBox2Desc'>Monday - Friday 11am - 6pm <br /> Saturday 12am - 6pm</p>
                    </p>
                </p>

                <p className='dt_contactBox2Desc'>Our customer service team is available by phone from Monday-Friday 9.30am-6:30pm EST and Saturday 10am-5pm EST.</p>
                            <p className='dt_contactBox2Desc'>Our office is located at 33W 46th Str, STE#9W, New York, NY 10036</p>
                <div className='mt-4'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.057115060303!2d77.21861737616264!3d28.568047587004962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce25b4d73ffff%3A0x5244a585d7ba2ce3!2sDiamondtine!5e0!3m2!1sen!2sin!4v1717044522982!5m2!1sen!2sin"
                        style={{ border: "1px solid #f2f2f2" }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className='dt_contactus_map'
                    />

                </div>

            </div>
            <Footer />
        </div>
    )
}
