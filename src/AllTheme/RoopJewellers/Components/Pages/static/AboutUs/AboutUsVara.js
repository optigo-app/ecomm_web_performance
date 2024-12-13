import React from 'react'
import './AboutUsVara.scss';
import { storImagePath } from './../../../../../../utils/Glob_Functions/GlobalFunction';

const AboutUsVara = () => {

    const AboutImages = {
        header : storImagePath()+'/images/about/bg.png',
        banner1 : storImagePath()+'/images/about/1.png',
        banner2 : storImagePath()+'/images/about/2.png',
        banner3  : storImagePath()+'/images/about/headerlogo2.png',
    }
return (
    <div className="container_AboutUs">
      <div className="subheader_adu"
      style={{
        backgroundImage: `url(${AboutImages.header})`,
      }}
      >
        <div className="subheader_adu_content">ABOUT US</div>
      </div>
      <div className="container_aboutus_adu">
        <div className="abu_content_part">
          <div className="abu_content">About Us</div>
          <div className="abu_content_para">
            <div className="abu_content_para_m">
              Established in 2016, our journey began with a simple yet profound
              passion for crafting blessings (meaning of vara) in the form of
              exquisite diamond jewelry. With over 7 years of experience in the
              B2B diamond jewelry sector, we have honed our craft to offer you a
              diverse range of designs that are more than just ornaments, they
              are expressions of love and life’s treasured moments.
            </div>
            <div className="abu_content_para_m">
              At Vara, we are not just in the business of making jewelry; we are
              in the business of crafting stories, forging connections, and
              making the world a little brighter with every piece we create.
            </div>
            <div className="abu_content_para_m">
              Welcome to Vara Jewels, where dreams, diamonds, and a better world
              come together!
            </div>
          </div>
        </div>
        <div className="abu_content_part_2">
          <img src={AboutImages.banner1} alt="#aboutusimg" className="aboutus_img" width="70" />
        </div>
      </div>
      <div className="our_vision_abu_container">
        <div className="img_w_post__abu">
          <img src={AboutImages.banner3} alt="#visionimg" className="img_w_post__abu_unique" />
        </div>
        <div className="our_vision_abu_content">
          <div>
            <div className="abu_content_copy">Our Vision</div>
            <div className="abu_content_para_m abu_content_para">
              To Be India's premier jewelry manufacturing company. With a
              steadfast commitment to integrity, punctuality, patience, and
              professionalism, we strive to fulfill every client's desires and
              exceed their expectations.
            </div>
          </div>
          <div>
            <div className="abu_content_copy">Our Mission</div>
            <div className="abu_content_para_m abu_content_para">
              Through flawless craftsmanship, cutting-edge designs, and
              unwavering quality, we aim to reinvent the fine jewelry market in
              India. We also try to encapsulate the very best in style and
              luxury. We strive to be the pinnacle of ageless beauty, creating
              new benchmarks for the sector while maintaining a keen eye on the
              future.
            </div>
          </div>
        </div>
      </div>
      <div className="our_values_abu_container">
        <div className="our_values_abu_container_img">
          <img src={AboutImages.banner2} className="ourvalimg" alt="#ourvalimg" />
        </div>
        <div className="our_values_abu_content">
          <div>
            <div className="abu_content_copy_2">Our Values</div>
            <div className="abu_content_para_m abu_content_para">
              At Vara, our values are the cornerstone of everything we do,
              shaping our journey and the jewelry we create.
            </div>
          </div>
          <div className="abu_content_para_m abu_content_para">
            <b style={{ color: "black" }}>Persistence –</b> Our commitment to
            excellence and craftsmanship runs in every piece we craft. We pour
            our hearts into every design, ensuring that it not only meets but
            exceeds your expectations.
          </div>
          <div className="abu_content_para_m abu_content_para">
            <b style={{ color: "black" }}>Precision –</b> We do not settle for
            anything less than perfection. From the initial spark of the design
            idea to the final finishing touches, we strive for precision in
            every detail.
          </div>
          <div className="abu_content_para_m abu_content_para">
            <b style={{ color: "black" }}>Principled Practices –</b> We believe in
            doing what’s right always. We prioritize ethics, social
            responsibility, and environmental sustainability in everything we
            do.
          </div>
        </div>
      </div>
     </div>
  )
}

export default AboutUsVara
