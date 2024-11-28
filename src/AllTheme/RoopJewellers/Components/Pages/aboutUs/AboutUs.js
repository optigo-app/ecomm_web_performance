import React, { useEffect, useState } from 'react'
import { storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import AXboutUs from './AQbout';

export default function AboutUs() {

    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch(`${storImagePath()}/html/About.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });
    }, []);


    return (
        <div className='stam_contactMain'>
            {/* <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div> */}
            <AXboutUs/>
        </div>
    )
}
