import React from 'react';
import './PrivacyPolicy.scss'


export default function PrivacyPolicy() {

  /*const termsData = {
    introduction: {
      text: "Before using our website located at www.varajewels.com and any associated websites linked to it, please take a moment to read and understand these Terms and Conditions carefully. You accept the below TERMS AND CONDITIONS by using our website."
    },
    sections: [
      {
        title: "Product Availability",
        content: [
          {
            subtitle: "Crafted with Care:",
            text: "We take pride in crafting all our jewelry with precision and passion. If a piece you desire is currently on backorder, please reach out to us, and we will gladly provide you with an estimated availability date. Since our jewelry is meticulously crafted in-house, there may be a slight delay of 1-4 weeks before the piece can be shipped. If you need help or have any questions, don't hesitate to get in touch with us."
          }
        ]
      },
      {
        title: "Information on our Site",
        content: [
          {
            subtitle: "True Representation:",
            text: "We strive to present our jewelry catalog online as accurately and comprehensively as possible. To ensure you have the opportunity to examine our pieces in detail, please note that some jewelry may appear larger or smaller than the actual size in our photographs. Additionally, individual computer monitor settings may result in slight variations in perceived size"
          }
        ]
      },
      {
        title: "Policies",
        content: [
          {
            subtitle: "- Return Policy",
            text: "Your Satisfaction Matters: At Vara, we are dedicated to ensuring your complete satisfaction. We take pride in the quality and craftsmanship of our jewelry, all meticulously manufactured in our state-of-the-art facility. To facilitate returns, please ensure that the contents of the package are in their original condition and securely packed within the box. For added security, avoid indicating the package's contents on the box's exterior"
          },
          {
            subtitle: "- Exchange Policy",
            text: "Your Satisfaction Matters: At Vara, we are dedicated to ensuring your complete satisfaction. We take pride in the quality and craftsmanship of our jewelry, all meticulously manufactured in our state-of-the-art facility. To facilitate returns, please ensure that the contents of the package are in their original condition and securely packed within the box. For added security, avoid indicating the package's contents on the box's exterior"
          },
          {
            subtitle: "- Shipping Policy",
            text: "Your Satisfaction Matters: At Vara, we are dedicated to ensuring your complete satisfaction. We take pride in the quality and craftsmanship of our jewelry, all meticulously manufactured in our state-of-the-art facility. To facilitate returns, please ensure that the contents of the package are in their original condition and securely packed within the box. For added security, avoid indicating the package's contents on the box's exterior"
          }
        ]
      },
      {
        title: "Limited Warranty",
        content: [
          {
            subtitle: "Our Commitment to Quality:",
            text: "At Vara Jewels, we stand by the quality of our products. Our guarantee is straightforward: if any issue arises due to faulty workmanship, we will address it promptly. However, please note that precious metals may naturally wear over time, and gemstones may experience wear and tear. In such cases, our expert staff can perform repairs in-house for a standard repair fee. It's essential to understand that any work done by a jeweler other than Vara Jewels voids the warranty. We also recommend maintaining insurance against any loss or damage not covered by our warranty."
          }
        ]
      }
    ],
    conclusion: {
      text: "These Terms and Conditions are designed to ensure a transparent and positive experience for all our valued customers at Vara Jewels. Your satisfaction and trust are our top priorities, and we are here to assist you throughout your jewelry journey."
    }
  }*/

  // Almacarino Terms and Conditions
  const termsData = {
    sections: [
      {
        title: "GOLD JEWELLERY",
        content: [
          {
            text: "1.Repair warranty upto one year from the date of purchase."
          },
          {
            text: "2.Stone Exchange Value upto 80%(depends on condition of stone)"
          },
          {
            text: "3.Goods once sold will be treated as Sales Returnif returned unused within 7 days."
          },
          {
            text: "4.For outside Purchase Gold Exchange/Sales will attract Wastage of 7%."
          },
          {
            text: "5.0.00% Deduction of Wastage for ALMA Gold Product Exchange."
          },
          {
            text: "6.Refund Process if any will be done through Bank Transfer within 3 days of Receipt."
          },
        ]
      },
      {
        title: "SILVER JEWELLERY",
        content: [
          {
            text: "1.Repair warranty upto one year from the date of purchase."
          },
          {
            text: "2.Silver Exchange Value WILL BE 30.% on the purchase Value."
          },
          {
            text: "3.Refund option is not available."
          },
        ]
      },
      {
        title: "STONE JEWELLERY",
        content: [
          {
            text: "1.Return/Refund/Exchange options are not available."
          },
        ]
      },
    ],
    conclusion: {
      text: "NB.The company reserves right to modify the above Terms&conditions without prior notice."
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


const Banner = ({ title = "Terms and Conditions" }) => {
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