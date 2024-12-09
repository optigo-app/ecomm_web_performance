import React, { useEffect, useState } from 'react';
import "./TermsCondition.modul.scss";
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../../Home/Footer/Footer';

function TermsAndConditions() {

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/html/TermsCondition.html`)
    // fetch(`${storImagePath()}/html/TermsConditionsona.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error('Error fetching the HTML file:', error);
      });
  }, []);

  return (
    <div className='dt_terms_condtionMain'>
      <div className='dt_Terms_sub_div'>
        <div className='dt_Term_Sub_Set' style={{ marginInline: '10%', paddingBottom: '80px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
