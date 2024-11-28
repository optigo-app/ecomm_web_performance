import React, { useEffect, useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import './TermsCondition.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const TermsCondition = () => {

    const navigation = useNavigate();


    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch(`${storImagePath()}/html/MA_TermsCondition.html`)
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
            <p className="SmiCartListTitleN" style={{}}>
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigation(-1)} />Terms & Conditions
            </p>
            <div style={{ marginInline: '2%', paddingBottom: '80px', minHeight: '400px', paddingTop: '60px' }}>
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    )
}

export default TermsCondition