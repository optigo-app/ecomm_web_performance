import React, { useEffect, useState } from 'react'
import './NaturalDiamond.scss'
import { storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../Home/Footer/Footer'

const NatualDiamond = () => {
    const [htmlContent, setHtmlContent] = useState('');
    useEffect(() => {
        fetch(`${storImagePath()}/html/NaturalDiamond.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html)
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            })
    }, [])
    return (
        <div className='NaturalDiaMain'>
            <div className='daimondsEveryAbout'>
                <div style={{ marginInline: '6%', minHeight: '400px' }}>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
                <Footer />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })}>BACK TO TOP</p>
            </div>
        </div>
    )
}

export default NatualDiamond;