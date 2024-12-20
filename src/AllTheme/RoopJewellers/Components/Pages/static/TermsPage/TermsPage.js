import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import './termsPage.scss'

const VaratermsData = {
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
}

const ShinjinitermsData = {
  introduction: {
    text: "Before using our website located at https://shinjinijewels.com and any associated websites linked to it, please take a moment to read and understand these Terms and Conditions carefully. You accept the below TERMS AND CONDITIONS by using our website."
  },
  sections: [
    {
      title: "Product Information",
      content: [
        {
          subtitle: "Product Availability:",
          text: "We make every effort to ensure that the jewelry items listed on our website are available for purchase. However, due to high demand or limited stock, some items may be unavailable or out of stock. We will notify you if an item is out of stock after your purchase."
        },
        {
          subtitle: "Product Accuracy:",
          text: "While we strive to provide accurate descriptions, images, and prices for all jewelry items, slight discrepancies may occur due to differences in lighting, screen settings, or natural variations in materials."
        }
      ]
    },
    {
      title: "Ordering and Payment",
      content: [
        {
          subtitle: "Order Placement:",
          text: "Once you place an order through our website, you will receive an order confirmation email with details of your purchase. This does not signify that your order has been accepted. Acceptance of your order and the completion of the contract between you and Shinjini Jewels will occur when we ship your items."
        },
        {
          subtitle: "Pricing:",
          text: "All prices listed on our website are in [Currency] and are subject to change without notice. Any applicable taxes, shipping, and handling charges will be added during checkout."
        },
        {
          subtitle: "Payment Methods:",
          text: "We accept all major credit cards, debit cards, and other payment methods via secure payment gateways. Payments are processed at the time of order confirmation."
        }
      ]
    },
    {
      title: "Shipping and Delivery",
      content: [
        {
          subtitle: "Shipping Method:",
          text: "We offer several shipping options, which will be provided at checkout. Delivery times will vary depending on your location, and we are not responsible for any delays caused by postal services or customs."
        },
        {
          subtitle: "International Shipping:",
          text: "We do offer international shipping; however, customs duties, taxes, or import fees are the responsibility of the customer."
        },
        {
          subtitle: "Shipping Costs:",
          text: "Shipping costs will be calculated at checkout and depend on the delivery location, weight of the order, and chosen shipping method."
        },
        {
          subtitle: "Lost or Damaged Items:",
          text: "If an item is lost or damaged during shipping, please contact us immediately, and we will assist in resolving the issue."
        }
      ]
    },
    {
      title: "Returns and Exchanges",
      content: [
        {
          subtitle: "Return Policy:",
          text: "We are committed to your satisfaction. If you are not happy with your purchase, you can return it within [X] days from the date of receipt. The item must be in its original condition and packaging, unused, and with all tags intact. Please note that some items, such as custom-made jewelry or final sale products, may not be eligible for returns."
        },
        {
          subtitle: "Exchange Policy:",
          text: "If you wish to exchange an item, we offer exchanges for items of equal value within [X] days of receipt. The item must meet the same conditions as our return policy."
        },
        {
          subtitle: "Refunds:",
          text: "Refunds will be issued in the same form of payment as the original purchase. Please allow [X] business days for the refund to process."
        }
      ]
    },
    {
      title: "Warranty",
      content: [
        {
          subtitle: "Limited Warranty:",
          text: "We offer a limited warranty on all our jewelry products to ensure that they are free from defects in materials and craftsmanship. The warranty covers repair or replacement of faulty items due to manufacturing defects within [X] months from the date of purchase."
        },
        {
          subtitle: "Exclusions:",
          text: "The warranty does not cover damage caused by misuse, accidental wear and tear, alterations, or repairs done by unauthorized parties."
        }
      ]
    },
    {
      title: "Intellectual Property",
      content: [
        {
          subtitle: "Copyright and Trademarks:",
          text: "All content on this website, including images, logos, text, and designs, is owned by Shinjini Jewels or its licensors and is protected by copyright and trademark laws. You may not use, copy, or distribute any content from this website without our express written permission."
        },
        {
          subtitle: "Product Design:",
          text: "Our jewelry designs are unique to Shinjini Jewels and are protected under intellectual property laws. Any unauthorized use or replication of our designs is prohibited."
        }
      ]
    },
    {
      title: "Customer Responsibilities",
      content: [
        {
          subtitle: "Account Security:",
          text: "If you create an account on our website, you are responsible for maintaining the confidentiality of your account details, including your password. You agree to notify us immediately of any unauthorized use of your account."
        },
        {
          subtitle: "Accuracy of Information:",
          text: "You agree to provide accurate and complete information when making a purchase or interacting with our website. We are not responsible for any issues caused by inaccurate or incomplete information."
        }
      ]
    },
    {
      title: "Privacy and Data Protection",
      content: [
        {
          subtitle: "Personal Data:",
          text: "We take your privacy seriously. For more information on how we collect, use, and protect your personal data, please refer to our Privacy Policy."
        },
        {
          subtitle: "Third-Party Services:",
          text: "We may use third-party services, such as payment processors or delivery providers, to fulfill your order. These third parties have their own privacy policies, and we encourage you to review them."
        }
      ]
    },
    {
      title: "Limitation of Liability",
      content: [
        {
          subtitle: "No Liability for Loss:",
          text: "We are not liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our website, the purchase of our jewelry, or any other transaction with us."
        },
        {
          subtitle: "Limitation of Damages:",
          text: "Our liability, in any case, is limited to the amount paid for the product in question."
        }
      ]
    },
    {
      title: "Governing Law and Dispute Resolution",
      content: [
        {
          subtitle: "Governing Law:",
          text: "These Terms & Conditions shall be governed by and construed in accordance with the laws of [Country/Region]."
        },
        {
          subtitle: "Dispute Resolution:",
          text: "Any disputes arising from or related to these Terms & Conditions will be resolved through binding arbitration in [Location]."
        }
      ]
    }
  ],
  conclusion: {
    text: "These Terms and Conditions are designed to ensure a transparent and positive experience for all our valued customers at Shinjini Jewels. Your satisfaction and trust are our top priorities, and we are here to assist you throughout your jewelry journey."
  }
}


export default function TermsAndConditions() {
  return (
    <div className="shinjini-terms">
      <Banner />
      <main className="shinjini-main">
        <h1 className="shinjini-title">Terms and Conditions</h1>

        <div className="shinjini-content">
          <p className="shinjini-introduction">{ShinjinitermsData.introduction.text}</p>

          {ShinjinitermsData.sections.map((section, index) => (
            <section key={index} className="shinjini-section">
              <h2 className="shinjini-section-title">{section.title}</h2>
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="shinjini-section-content">
                  <h3 className="shinjini-subtitle">{item.subtitle}</h3>
                  <p className="shinjini-text">{item.text}</p>
                </div>
              ))}
            </section>
          ))}

          <p className="shinjini-conclusion">{ShinjinitermsData.conclusion.text}</p>
        </div>
      </main>
    </div>
    // <div className="vaara-terms">
    //     <Banner/>
    //   <main className="vaara-main">
    //     <h1 className="vaara-title">Terms and Conditions</h1>

    //     <div className="vaara-content">
    //       <p className="vaara-introduction">{termsData.introduction.text}</p>

    //       {termsData.sections.map((section, index) => (
    //         <section key={index} className="vaara-section">
    //           <h2 className="vaara-section-title">{section.title}</h2>
    //           {section.content.map((item, itemIndex) => (
    //             <div key={itemIndex} className="vaara-section-content">
    //               <h3 className="vaara-subtitle">{item.subtitle}</h3>
    //               <p className="vaara-text">{item.text}</p>
    //             </div>
    //           ))}
    //         </section>
    //       ))}

    //       <p className="vaara-conclusion">{termsData.conclusion.text}</p>
    //     </div>
    //   </main>
    // </div>
  )
}


const Banner = ({ title = "Terms and Conditions" }) => {
  const Image = `url(${storImagePath() + "/images/HomePage/Terms/Banner.jpg"
    })`;
  return (
    <>
      <div
        className="shinjini-banner"
        style={{
          backgroundImage: Image,
        }}
      >
        <h1>{title}</h1>
      </div>
    </>
  );
};
// const Banner = ({ title = "Terms and Conditions" }) => {
//     const Image = `url(${
//       storImagePath() + "/images/1tnc.png"
//     })`;
//     return (
//       <>
//         <div
//           className="vaara-banner"
//           style={{
//             backgroundImage: Image,
//           }}
//         >
//           <h1>{title}</h1>
//         </div>
//       </>
//     );
//   };