import React, { useEffect, useState } from 'react'
import './Privacy.modul.scss';
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const Privacy = () => {
    const [htmlContent, setHtmlContent] = useState('')

    useEffect(() => {
        fetch(`${storImagePath()}/html/privacy.html`)
            .then((response) => response.text())
            .then((html) => {
                setHtmlContent(html);
            })
            .catch((error) => {
                console.error("Error fetching the HTML file:", error);
            });
    }, [])
    return (
        <div className="elv_returnPolicy">
        <div
          className="return-policy"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
    </div>
    )
}

export default Privacy