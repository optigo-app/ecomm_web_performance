import React from 'react'
import './SustainAbility.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const SustainAbility = () => {
  return (
    <div className='stam_sustaionMain'>
        <div className='sustaionMain'>
        <div style={{ textAlign: 'center' }}>
          <p className='sustaionMainTitle'>Committed on Sustainability</p>
          <p className='sustaionMainTitleDesc'>For our planet, our home, and our future</p>
        </div>
        <div className='sustainBoxImageBoxMainDiv' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#fafafa', padding: '20px 20px 0px 20px', textAlign: 'center' }} className='sustainBoxImageBoxMain'>
            <img src={`${storImagePath()}/images/HomePage/sustainability/sustainability1.png`} alt={''}  className='sustaionImage1'/>
            <p style={{ marginTop: "7px", color: '#7d7f85', fontSize: '13px', fontWeight: '600' }}>1% for the Planet</p>
          </div>
          <div style={{ background: '#fafafa', padding: '20px 20px 0px 20px', textAlign: 'center' }} className='sustainBoxImageBoxMain'>
            <img src={`${storImagePath()}/images/HomePage/sustainability/sustainability2.png`} alt={''} className='sustaionImage2' />
            <p style={{ marginTop: "7px", color: '#7d7f85', fontSize: '13px',fontWeight: '600' }}> Certified Butterfly Mark on ESG+</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SustainAbility