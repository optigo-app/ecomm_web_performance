import React from 'react'
import './FAQ.modul.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../../Home/Footer/Footer';

export default function FAQ() {
    const [htmlContent, setHtmlContent] = useState('');


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        fetch(`${storImagePath()}/html/accoridan.html`)
        // fetch(`${storImagePath()}/html/accoridansona.html`) 
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
                <div  className='dt_Faq_Sub_Set' style={{ marginInline: '10%', paddingBottom: '80px' }}>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
