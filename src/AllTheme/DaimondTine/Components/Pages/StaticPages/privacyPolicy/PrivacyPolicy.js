import React, { useEffect, useState } from 'react';
import './Privacy.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../../Home/Footer/Footer';

function PrivacyPolicy() {

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/html/PrivacyPolicy.html`)
    // fetch(`${storImagePath()}/html/PrivacyPolicysona.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error('Error fetching the HTML file:', error);
      });
  }, []);

  return (
    <div className='dt_privacy_mainDiv'>
      <div className='dt_priVacySub_div'>
        <div className='dt_privacySubMobile' style={{ marginInline: '10%', paddingBottom: '80px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
