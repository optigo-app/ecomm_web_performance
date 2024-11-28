import React, { useEffect, useState } from 'react'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import ExpertAdviceX from './ExpertX';

const ExpertAdvice = () => {
  const [htmlContent, setHtmlContent] = useState('');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetch(`${storImagePath()}/html/ExpertAdvice.html`)
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
      {/* <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div> */}
      <ExpertAdviceX/>
    </div>
  )
}

export default ExpertAdvice