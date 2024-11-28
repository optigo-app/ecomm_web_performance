import React, { useEffect, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../../Home/Footer/Footer';

const FunFact = () => {

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/html/FunFact.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
        console.log('htmlssssssss', html);
      })
      .catch((error) => {
        console.error('Error fetching the HTML file:', error);
      });
  }, []);


  return (
    <div className='stam_contactMain'>
      <div className='daimondsEveryAbout'>
        <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  )
}

export default FunFact