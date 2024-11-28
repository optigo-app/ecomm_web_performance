import React from 'react';
import './CompanyData.modul.scss';

function CompanyData() {
  return (
    <div className="el_companyData_main" style={{ marginBlock: '1rem' }}>
      <div className="banner-stats">
        <div className="stat">
          <div>
            <span className='firstspantag'>Established Excellence</span>
            <p className='firstptag'>A legacy of success, driven by passion and innovation</p>
          </div>
        </div>
        <div className="stat rightBorder">
          <div>
            <span className='firstSpanData'>7</span>
            <p className='ptag'>Working Year</p>
          </div>
        </div>
        <div className="stat rightBorder">
          <div>
            <span className='firstSpanData'>300+</span>
            <p className='ptag'>Happy Retailers</p>
          </div>
        </div>
        <div className="stat rightBorder">
          <div>
            <span className='firstSpanData'>20000+</span>
            <p className='ptag'>Design</p>
          </div>
        </div>
        <div className="stat">
          <div>
            <span className='firstSpanData'>75000+</span>
            <p className='ptag'>Sq Feet Factory Size</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyData;