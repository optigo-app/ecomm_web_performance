import React from 'react'
import './Footer.modul.scss'
import { Link } from 'react-router-dom'
import img  from "../../../Assests/Optigo_R_Logo.png"

const Footer = () => {
  return (
    <>
      <div className='hem_FooterMain_div'>
        <div className='hem_footer_Top'>
          <div className='hem_footer_sec1_div'>
            <div className='hem_footer_logo_div'>
              <img
                className='hem_footer_logo'
                src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L//companylogo/hemratnajewelsxv/headerlogo2.png'
                alt='hemratnalogo' />
              <span className='hem_footer_logo_desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</span>
            </div>
            <div className='hem_footer_all_li'>
              <div>
                <span className='hem_footer_contact_us'>Contact us</span>
                <div className='hem_footer_contact_div'>
                  <div className='hem_footer_contact_address'>
                    <span className='hem_footer_contact_header'>Address</span>
                    <p className='hem_footer_contact_desc'>B-104, Ruby Appartment, Near Nayara Petrol Pump, Gitanjali, Varachha Road,Surat-395006(GUJARAT).</p>
                  </div>
                  <div className='hem_footer_contact_online'>
                    <div>
                      <span className='hem_footer_contact_header'>Phone</span>
                      <p className='hem_footer_contact_det'>+919106302259</p>
                    </div>
                    <div>
                      <span className='hem_footer_contact_header'>Email</span>
                      <p className='hem_footer_contact_det'>Hemratna.Jewellers@Gmail.Com</p>
                    </div>
                  </div>
                  <div className='hem_footer_contact_social_media'>
                    <div>
                      <span className='hem_social_span'>Follow us</span>
                      <div style={{ marginTop: '10px'}}>
                        <Link to='https://www.facebook.com/hemratnajewellerssurat?mibextid=ZbWKwL' target='_black' className='hem_social_icon'>
                          <img src='https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png' alt='facebook.png' className='hem_fb_size' />
                        </Link>
                        <Link to='https://www.instagram.com/hemratnajewellerssurat/?igshid=MzMyNGUyNmU2YQ%3D%3D' target='_blank' className='hem_social_icon'>
                          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png' alt='instagram.png' className='hem_ins_size' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className='hem_footer_trademark'>
            <div>
              <span className='hem_trademark_title'>Powered By </span>
              <img className='hem_footer_trademark_logo' src={img} alt='optigologo' />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer