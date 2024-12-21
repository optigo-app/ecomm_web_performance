import React from 'react'
import './Collection.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

function Collection() {
  return (
    // <div className='roop_collection_main'>
    //   {/* <p className='roop_col_title'>New Collection</p>
    //   <div className='roop_col_imageMain_div'>
    //     <div className='roop_col_image_div'>
    //       <img className='roop_col_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/Collection/collection1.jpg`} /> */}
    //   {/* <p className='roop_col_name'>SILVER COLLECTION</p> */}
    //   {/* </div>
    //     <div className='roop_col_image_div'> */}
    //   {/* <img className='roop_col_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/Collection/collection2.jpg`} /> */}
    //   {/* <p className='roop_col_name'>GOLD COLLECTION</p> */}
    //   {/* </div>
    //     <div className='roop_col_image_div'>
    //       <img className='roop_col_jewelImg' loading="lazy" src={`${storImagePath()}/images/HomePage/Collection/collection3.jpg`} /> */}
    //   {/* <p className='roop_col_name'>DIAMOND COLLECTION</p> */}
    //   {/* </div>
    //   </div> */}

    //   <p className='roop_whyshop_title'>
    //     WHY SHOP WITH SONASONS?
    //     {/* WHY SHOP WITH ROOP JEWELLERS? */}
    //   </p>

    //   <div className="roop_col_shop_div_main">
    //     <div className="roop_col_shop_div">
    //       <div className="imageDiv">
    //         <img
    //           className="roop_whyshop_jewelImg"
    //           loading="lazy"
    //           src={`${storImagePath()}/images/HomePage/Shop/shop1.png`}
    //           alt="Certified Jewellery"
    //         />
    //         <h5 className='roop_shop_title'>QUALITY CERTIFIED JEWELLERY</h5>
    //       </div>
    //       <div className="onhover_show">
    //         <h5>QUALITY CERTIFIED JEWELLERY</h5>
    //         <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
    //       </div>
    //     </div>

    //     <div className="roop_col_shop_div">
    //       <div className="imageDiv">
    //         <img
    //           className="roop_whyshop_jewelImg"
    //           loading="lazy"
    //           src={`${storImagePath()}/images/HomePage/Shop/shop2.png`}
    //           alt="Certified Jewellery"
    //         />
    //         <h5>TRADITIONAL RETAIL SPACE</h5>
    //       </div>
    //       <div className="onhover_show">
    //         <h5>TRADITIONAL RETAIL SPACE</h5>
    //         <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
    //       </div>
    //     </div>

    //     <div className="roop_col_shop_div">
    //       <div className="imageDiv">
    //         <img
    //           className="roop_whyshop_jewelImg"
    //           loading="lazy"
    //           src={`${storImagePath()}/images/HomePage/Shop/shop3.png`}
    //           alt="Certified Jewellery"
    //         />
    //         <h5>PEACE OF MIND PROMISE</h5>
    //       </div>
    //       <div className="onhover_show">
    //         <h5>PEACE OF MIND PROMISE</h5>
    //         <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
    //       </div>
    //     </div>

    //     <div className="roop_col_shop_div">
    //       <div className="imageDiv">
    //         <img
    //           className="roop_whyshop_jewelImg"
    //           loading="lazy"
    //           src={`${storImagePath()}/images/HomePage/Shop/shop4.png`}
    //           alt="Certified Jewellery"
    //         />
    //         <h5>RISK-FREE ASSURANCE</h5>
    //       </div>
    //       <div className="onhover_show">
    //         <h5>RISK-FREE ASSURANCE</h5>
    //         <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
    //       </div>
    //     </div>
    //   </div>

    // </div>
    <div className='roop_collection_main'>
  <p className='roop_whyshop_title'>
    
    {/* For Shinjini */}
    {/* WHY SHOP WITH SHINJINI JEWELS? */}

    {/* For Sonasons */}
    WHY SHOP WITH SONASONS?

    {/* For Vara */}
    {/* WHY SHOP WITH VARA? */}
    {/* Consider changing this if you want to personalize it for SEO or branding */}
  </p>

  <div className="roop_col_shop_div_main">
    {/* Shop Section 1 */}
    <div className="roop_col_shop_div">
      <div className="imageDiv">
        <img
          className="roop_whyshop_jewelImg"
          loading="lazy"
          src={`${storImagePath()}/images/HomePage/Shop/shop1.png`}
          alt="Certified jewellery, ensuring top-notch quality and craftsmanship"
        />
        <h5 className='roop_shop_title'>QUALITY CERTIFIED JEWELLERY</h5>
      </div>
      <div className="onhover_show">
        <h5>QUALITY CERTIFIED JEWELLERY</h5>
        <p>Indulge in Quality Certified Jewellery, a testament to the excellence of our craftsmanship.</p>
      </div>
    </div>

    {/* Shop Section 2 */}
    <div className="roop_col_shop_div">
      <div className="imageDiv">
        <img
          className="roop_whyshop_jewelImg"
          loading="lazy"
          src={`${storImagePath()}/images/HomePage/Shop/shop2.png`}
          alt="Traditional retail space offering a wide variety of jewellery options"
        />
        <h5>TRADITIONAL RETAIL SPACE</h5>
      </div>
      <div className="onhover_show">
        <h5>TRADITIONAL RETAIL SPACE</h5>
        <p>Experience the best of both worlds with our traditional retail space offering an extensive range of fine jewellery.</p>
      </div>
    </div>

    {/* Shop Section 3 */}
    <div className="roop_col_shop_div">
      <div className="imageDiv">
        <img
          className="roop_whyshop_jewelImg"
          loading="lazy"
          src={`${storImagePath()}/images/HomePage/Shop/shop3.png`}
          alt="Peace of mind promise with every purchase"
        />
        <h5>PEACE OF MIND PROMISE</h5>
      </div>
      <div className="onhover_show">
        <h5>PEACE OF MIND PROMISE</h5>
        <p>Our Peace of Mind Promise ensures complete satisfaction and peace with every jewellery purchase.</p>
      </div>
    </div>

    {/* Shop Section 4 */}
    <div className="roop_col_shop_div">
      <div className="imageDiv">
        <img
          className="roop_whyshop_jewelImg"
          loading="lazy"
          src={`${storImagePath()}/images/HomePage/Shop/shop4.png`}
          alt="Risk-free assurance for all jewellery purchases"
        />
        <h5>RISK-FREE ASSURANCE</h5>
      </div>
      <div className="onhover_show">
        <h5>RISK-FREE ASSURANCE</h5>
        <p>Enjoy the confidence of Risk-Free Assurance on all your jewellery purchases with us.</p>
      </div>
    </div>
  </div>
</div>

  )
}

export default Collection