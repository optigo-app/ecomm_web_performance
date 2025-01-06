import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './TermsCondition.modul.scss'
import { getDomainName, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const PrivacyPolicy = () => {

    const navigation = useNavigate();


    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        const FetchApi = async () => {
            const filename = await getDomainName();
            fetch(`${storImagePath()}/html/${filename}/MA_PrivacyPolicy.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });
        }
        FetchApi()
    }, []);

    return (
        <div className='smrMA_static_tremMain'>
            <p className="SmiCartListTitleN" style={{ height:'70px', zIndex:'9999999999999'}}>
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigation(-1)} />Privacy Policy
            </p>
            <div style={{ marginInline: '2%', marginTop: '10px', paddingBottom: '80px' ,paddingTop:"100px", minHeight: '400px',}}>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    )
}

export default PrivacyPolicy