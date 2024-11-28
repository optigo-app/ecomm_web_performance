import React from 'react'
import './Collection.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

function Collection() {
  return (
    <div className='roop_collection_main'>
      <p className='roop_col_title'>New Collection</p>
      <div className='roop_col_imageMain_div'>
        <div className='roop_col_image_div'>
          <img className='roop_col_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/Collection/collection1.jpg`} />
          {/* <p className='roop_col_name'>SILVER COLLECTION</p> */}
        </div>
        <div className='roop_col_image_div'>
          <img className='roop_col_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/Collection/collection2.jpg`} />
          {/* <p className='roop_col_name'>GOLD COLLECTION</p> */}
        </div>
        <div className='roop_col_image_div'>
          <img className='roop_col_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/Collection/collection3.jpg`} />
          {/* <p className='roop_col_name'>DIAMOND COLLECTION</p> */}
        </div>
      </div>

      <p className='roop_whyshop_title'>
        WHY SHOP WITH SONASONS?
        {/* WHY SHOP WITH ROOP JEWELLERS? */}
      </p>

      <div className="roop_col_shop_div_main">
        <div className="roop_col_shop_div">
          <div className="imageDiv">
            <img
              className="roop_whyshop_jewelImg"
              loading="lazy"
              src={`${storImagePath()}/images/HomePage/Shop/shop1.png`}
              alt="Certified Jewellery"
            />
            <h5 className='roop_shop_title'>QUALITY CERTIFIED JEWELLERY</h5>
          </div>
          <div className="onhover_show">
            <h5>QUALITY CERTIFIED JEWELLERY</h5>
            <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
          </div>
        </div>

        <div className="roop_col_shop_div">
          <div className="imageDiv">
            <img
              className="roop_whyshop_jewelImg"
              loading="lazy"
              src={`${storImagePath()}/images/HomePage/Shop/shop2.png`}
              alt="Certified Jewellery"
            />
            <h5>TRADITIONAL RETAIL SPACE</h5>
          </div>
          <div className="onhover_show">
            <h5>TRADITIONAL RETAIL SPACE</h5>
            <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
          </div>
        </div>

        <div className="roop_col_shop_div">
          <div className="imageDiv">
            <img
              className="roop_whyshop_jewelImg"
              loading="lazy"
              src={`${storImagePath()}/images/HomePage/Shop/shop3.png`}
              alt="Certified Jewellery"
            />
            <h5>PEACE OF MIND PROMISE</h5>
          </div>
          <div className="onhover_show">
            <h5>PEACE OF MIND PROMISE</h5>
            <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
          </div>
        </div>

        <div className="roop_col_shop_div">
          <div className="imageDiv">
            <img
              className="roop_whyshop_jewelImg"
              loading="lazy"
              src={`${storImagePath()}/images/HomePage/Shop/shop4.png`}
              alt="Certified Jewellery"
            />
            <h5>RISK-FREE ASSURANCE</h5>
          </div>
          <div className="onhover_show">
            <h5>RISK-FREE ASSURANCE</h5>
            <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Collection