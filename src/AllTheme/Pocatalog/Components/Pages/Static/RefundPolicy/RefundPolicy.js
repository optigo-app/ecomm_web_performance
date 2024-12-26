import React, { useEffect, useState } from 'react';
import './RefundPolicy.scss'
import { getDomainName, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';


export default function RefundPolicy() {


  const [htmlContent, sethtmlContent] = useState(null);


  useEffect(() => {
   const FetchHtml = async()=>{
    try {
     const filename = await getDomainName();
      const res = await   fetch(`${storImagePath()}/html/${filename}/refundpolicy.html`)
      const html = await res.text();
      sethtmlContent(html);
    } catch (error) {
      return error
    }
   }
   FetchHtml();
  }, [htmlContent])
  
  

  return (
    <div className="main_warrpper_pro">
      <div className='procatalog-terms'>
        <Banner />
        <main className="procatalog-main">
          <div dangerouslySetInnerHTML={{
            __html  : htmlContent
          }}></div>
        </main>
      </div>
    </div>
  )
}


const Banner = ({ title = "Refund Policy" }) => {
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

const termsData = {
  "sections": [
    {
      "title": "REFUND POLICY",
      "content": [
        {
          "text": "1. Refund requests must be made within 14 days of the purchase date."
        },
        {
          "text": "2. Items eligible for a refund must be unused, in original packaging, and with proof of purchase."
        },
        {
          "text": "3. Refunds will be issued in the original payment method (credit card, bank transfer, etc.)."
        },
        {
          "text": "4. Shipping costs for returning the items are the responsibility of the customer, unless the product is defective."
        },
        {
          "text": "5. Refunds will be processed within 7 business days after the product is received and inspected."
        },
        {
          "text": "6. Non-refundable items include customized products, gift cards, and sale items."
        },
        {
          "text": "7. In case of damaged or defective items, customers can request an exchange or full refund within 7 days."
        },
        {
          "text": "8. Refunds will not be processed for items that have been used, washed, or altered in any way."
        },
        {
          "text": "9. If the item is returned without its original packaging or with missing parts, the refund may be delayed or denied."
        },
        {
          "text": "10. A restocking fee of up to 10% may apply for returned items, depending on the condition and reason for return."
        },
        {
          "text": "11. Refunds will only be processed once the returned product is inspected and approved by our returns department."
        },
        {
          "text": "12. In the case of a returned item being lost or damaged during shipping, the customer must file a claim with the carrier."
        },
        {
          "text": "13. We reserve the right to reject refund requests for items that do not meet the above conditions."
        },
        {
          "text": "14. If a refund is issued after the return period has expired, a store credit may be offered instead."
        },
        {
          "text": "15. For defective or incorrect items, the customer is entitled to a full refund, exchange, or repair at no extra cost."
        },
        {
          "text": "16. Refunds for gift purchases will only be issued to the original purchaser unless otherwise agreed."
        },
        {
          "text": "17. If a product is returned after the 14-day window but within 30 days, a store credit or exchange may be offered."
        },
        {
          "text": "18. Refunds are not applicable for clearance or promotional items, unless explicitly stated in the product description."
        },
        {
          "text": "19. If a customer receives an incorrect product, we will cover the return shipping and issue a full refund."
        },
        {
          "text": "20. Any promotional discounts, offers, or gift cards applied to an order will be deducted from the refund amount."
        },
        {
          "text": "21. Refund requests will be denied if the product shows signs of wear, use, or alterations not caused by shipping or manufacturing defects."
        },
        {
          "text": "22. Returns initiated after the refund policy period has passed will be subject to approval by the customer service team."
        },
        {
          "text": "23. The company is not liable for any loss or damage that may occur during the return shipping process."
        },
        {
          "text": "24. Customers must ensure that returned items are securely packaged to avoid damage during transit."
        },
        {
          "text": "25. Refunds may take longer to process during peak shopping periods or holidays."
        }
      ]
    }
  ],
  "conclusion": {
    "text": "NB. The company reserves the right to modify the above Terms & Conditions without prior notice."
  }
}
// 

// {
//   <div className="procatalog-content-p">

//   {termsData.sections.map((section, index) => (
//     <section key={index} className="procatalog-section">
//       {/* <h2 className="procatalog-section-title">{section.title}</h2>  */}
//       {section.content.map((item, itemIndex) => (
//         <div key={itemIndex} className="procatalog-section-content">
//           <h3 className="procatalog-subtitle">{item.subtitle}</h3>
//           <p className="procatalog-text">{item.text}</p>
//         </div>
//       ))}
//     </section>
//   ))}
//   <p className="procatalog-conclusion">{termsData.conclusion.text}</p>
// </div>
// }