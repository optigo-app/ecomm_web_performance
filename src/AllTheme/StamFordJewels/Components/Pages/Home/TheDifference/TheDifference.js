import React, { useEffect, useState } from 'react'
import './TheDifference.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'
import { useNavigate } from 'react-router-dom'

const TheDifference = () => {
    const navigate = useNavigate();
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
        fetch(`${storImagePath()}/html/smrTheDeffrence.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error('Error fetching the HTML file:', error);
            });
    }, []);

    return (
        <div style={{marginBlock: '10px'}}>
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
    )
}

export default TheDifference