import React from 'react'
import './Sustain.modul.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'

const SustainAbility = () => {
  return (
    <>
      <div className='smarMA_sustaionMain'>
        <div style={{ textAlign: 'center' }}>
          <p className='sustaionMainTitle'>Committed on Sustainability</p>
          <p className='sustaionMainTitle2' style={{
            marginBottom: '5px',
            marginTop:'-5px'
          }}>For our planet, our home, and our future</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#fafafa', textAlign: 'center' }} className='sustainBoxImageBoxMain'>
            <img style={{
              height: '154px',
              width:'154px'
            }} src={`${storImagePath()}/images/HomePage/BottombBanner/sustainability1.webp`} alt={''}  className='sustaionImage1'/>
            <p style={{ marginTop: "7px", color: '#7d7f85', fontSize: '13px', fontFamily: "TT Commons, sans-serif", fontWeight: '600' }}>1% for the Planet</p>
          </div>
          <div style={{ background: '#fafafa', textAlign: 'center' }} className='sustainBoxImageBoxMain'>
            <img style={{
              height: '154px',
              width:'154px'
            }} src={`${storImagePath()}/images/HomePage/BottombBanner/sustainability2.webp`} alt={''} className='sustaionImage2' />
            <p style={{ marginTop: "7px", color: '#7d7f85', fontSize: '13px', fontFamily: "TT Commons, sans-serif", fontWeight: '600' }}> Certified Butterfly</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default SustainAbility