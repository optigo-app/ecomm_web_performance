import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './TermsCondition.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const Support = () => {

    const navigation = useNavigate();


    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch(`${storImagePath()}/html/MA_Support.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });
    }, []);

    return (
        <div className='smrMA_static_tremMain'>
            <p className="SmiCartListTitleN" style={{height:'70px'}}>
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigation(-1)} />Support
            </p>
            <div style={{ marginInline: '2%', marginTop: '10px', paddingBottom: '80px' ,paddingTop:"70px", minHeight: '400px',}}>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                {/* <p style={{fontWeight: 500 , fontSize: '18px', marginTop: '250px', textAlign: 'center'}}>Coming soon...</p> */}
            </div>
        </div>
    )
}

export default Support