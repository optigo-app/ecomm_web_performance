import React from 'react';
import './ShippingPolicy.scss'


export default function ShippingPolicy() {

 
  const termsData = {
    sections: [
      {
        "title": "SHIPPING POLICY",
        "content": [
          {
            "text": "1. We offer standard and expedited shipping options on all orders."
          },
          {
            "text": "2. All orders will be processed within 1-3 business days of receiving payment."
          },
          {
            "text": "3. Shipping charges will be calculated based on the delivery location and shipping method selected."
          },
          {
            "text": "4. Customers will be notified via email once their order has been shipped, along with tracking details (if applicable)."
          },
          {
            "text": "5. Free shipping promotions may apply to specific items or orders over a certain value, as stated during checkout."
          },
          {
            "text": "6. Delivery times vary by location, typically between 3-7 business days for standard shipping and 1-3 business days for expedited shipping."
          },
          {
            "text": "7. We currently ship to [list of countries/regions]. International shipping may incur additional customs duties or taxes."
          },
          {
            "text": "8. Shipping delays may occur due to factors beyond our control, such as weather conditions, customs delays, or holidays."
          },
          {
            "text": "9. If an order is returned to us due to an incorrect or incomplete address, the customer will be responsible for additional shipping charges to resend the order."
          },
          {
            "text": "10. We are not responsible for lost or damaged goods during transit, but we will assist in filing claims with the carrier if necessary."
          },
          {
            "text": "11. Orders with multiple items may be shipped separately, depending on product availability and warehouse locations."
          },
          {
            "text": "12. For international orders, customers may be required to provide additional documentation for customs clearance."
          },
          {
            "text": "13. If you receive a damaged or incorrect product, please contact our customer service team within 48 hours of receipt for assistance."
          },
          {
            "text": "14. Expedited shipping options are available at checkout, but cannot be guaranteed for all destinations."
          },
          {
            "text": "15. Customers are responsible for providing accurate shipping information at the time of purchase."
          },
          {
            "text": "16. We reserve the right to cancel or modify orders that cannot be shipped due to product unavailability or delivery issues."
          },
          {
            "text": "17. Shipping fees are non-refundable, except in cases where the product was defective or incorrectly shipped."
          },
          {
            "text": "18. We offer same-day processing for expedited orders placed before 12 PM EST (excluding weekends and holidays)."
          },
          {
            "text": "19. Orders may be delayed during peak seasons (e.g., holidays) and we recommend ordering early to ensure timely delivery."
          },
          {
            "text": "20. Please ensure that someone is available to receive the package. If the carrier is unable to deliver the package, additional delivery attempts or fees may apply."
          },
          {
            "text": "21. Delivery attempts may be limited by the carrier, after which the package may be returned to us."
          },
          {
            "text": "22. We do not cover any customs fees or duties for international shipments."
          },
          {
            "text": "23. If an order is shipped but returned due to customer refusal, we will refund the order amount minus shipping costs."
          },
          {
            "text": "24. In the event of a shipping issue, please contact our customer service team for assistance in resolving the matter."
          },
          {
            "text": "25. By placing an order, you agree to these shipping terms and conditions."
          }
        ]
      }
    ],
    "conclusion": {
      "text": "NB. The company reserves the right to modify the above Terms & Conditions without prior notice."
    }
  }

  return (
    <div className="main_warrpper_pro">
      <div className='procatalog-terms'>
        <Banner />
        <main className="procatalog-main">
          <div className="procatalog-content-p">

            {termsData.sections.map((section, index) => (
              <section key={index} className="procatalog-section">
                {/* <h2 className="procatalog-section-title">{section.title}</h2> */}
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="procatalog-section-content">
                    <h3 className="procatalog-subtitle">{item.subtitle}</h3>
                    <p className="procatalog-text">{item.text}</p>
                  </div>
                ))}
              </section>
            ))}

            <p className="procatalog-conclusion">{termsData.conclusion.text}</p>
          </div>
        </main>
      </div>
    </div>


    /*
    <div className="main_warrpper_pro">
          <div className='procatalog-terms'>
            <Banner/>
           <main className="procatalog-main">
            <div className="procatalog-content-p">
              <p className="procatalog-introduction">{termsData.introduction.text}</p>
    
              {termsData.sections.map((section, index) => (
                <section key={index} className="procatalog-section">
                  <h2 className="procatalog-section-title">{section.title}</h2>
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex} className="procatalog-section-content">
                      <h3 className="procatalog-subtitle">{item.subtitle}</h3>
                      <p className="procatalog-text">{item.text}</p>
                    </div>
                  ))}
                </section>
              ))}
    
              <p className="procatalog-conclusion">{termsData.conclusion.text}</p>
            </div>
          </main>
        </div>
        </div>
    */
  )
}


const Banner = ({ title = "Shipping Policy" }) => {
  return (
    <>
      <div
        className="procatalog-banner"
      >
        <h1>{title}</h1>
      </div>
    </>
  );
};