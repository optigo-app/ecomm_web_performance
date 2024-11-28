import React, { useEffect, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../../Home/Footer/Footer';

const ServicePolicy = () => {

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/html/servicePolice.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error('Error fetching the HTML file:', error);
      });
  }, []);

  return (
    <div className='contactMain'>
      <div className='daimondsEveryAbout'>
        <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
        <Footer />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
        <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
      </div>
    </div>
  )
}

export default ServicePolicy