import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./Service.scss";
const ServicePolicy = () => {
  const Banner = `${storImagePath()}/about/22.jpg`;

  // const [htmlContent, setHtmlContent] = useState('');

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // useEffect(() => {
  //   fetch(`${storImagePath()}/html/servicePolice.html`)
  //     .then((response) => response.text())
  //     .then((html) => {
  //       setHtmlContent(html);
  //       console.log('htmlssssssss', html);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching the HTML file:', error);
  //     });
  // }, []);

  return (
    // <div className="stam_service">
    //   <div
    //     className="stam_banner"
    //     style={{
    //       backgroundImage: `url(${Banner})`,
    //     }}
    //   >
    //     <h1>Service Policy Page</h1>
    //   </div>
    //   <div className="main_content_stamford">
    //     <main class="stamford_do_main">
    //       <h2>SERVICE & SECURITY</h2>
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
    //         adipisci voluptatum qui saepe? Corrupti, consectetur libero
    //         architecto illo quis pariatur nisi mollitia ipsam temporibus id
    //         minus voluptates vitae vel quae..
    //       </p>
    //       <p>Lorem ipsum dolor sit amet Lorem, ipsum. Lorem, ipsum dolor.</p>
    //       <p>
    //         Lorem ipsum dolor sit amet consectetur{" "}
    //         <a href="mailto:lorem@lorem.in">lorem@lorem.in</a> adipisicing elit.
    //         Perspiciatis, accusantium minus magnam animi voluptas neque Lorem
    //         ipsum dolor sit.
    //       </p>
    //     </main>
    //   </div>
    // </div>

    <div className="stam_contactMain">
      <main className="stam_sp-service-policy">
        <div className="content_stam">
          <div className="title">
            <h2>Service Policy</h2>
          </div>
          <div className="stam_sp-service-policy__content">
            <p>
              At Sonasons Luxury Jewelry, we are committed to providing
              exceptional service to our valued customers. Our service policy is
              designed to ensure your complete satisfaction with every purchase
              and interaction.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Quality Assurance
            </h2>
            <p>
              Every piece of jewelry from Sonasons undergoes rigorous quality
              checks to meet our high standards of craftsmanship and luxury.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Returns and Exchanges
            </h2>
            <p>
              We offer a 30-day return policy on all purchases. Items must be
              returned in their original condition with all accompanying
              documentation.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Lifetime Warranty
            </h2>
            <p>
              All Sonasons jewelry comes with a lifetime warranty against
              manufacturing defects. We're committed to the longevity and
              quality of our pieces.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Customer Support
            </h2>
            <p>
              Our dedicated customer service team is available to assist you
              with any queries or concerns. We strive to respond to all
              inquiries within 24 hours.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Privacy Policy
            </h2>
            <p>
              We value your privacy and are committed to protecting your
              personal information. Our privacy policy outlines how we collect,
              use, and safeguard your data.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Shipping Policy
            </h2>
            <p>
              We offer free shipping on orders over a certain amount. Standard
              shipping typically takes 3-5 business days. Expedited shipping
              options are available at checkout.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Payment Methods
            </h2>
            <p>
              We accept various payment methods, including credit cards, PayPal,
              and other secure online payment options. Please ensure that your
              payment information is accurate during checkout.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">Product Care</h2>
            <p>
              To maintain the beauty of your jewelry, we recommend following our
              care instructions, including regular cleaning and proper storage.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Custom Orders
            </h2>
            <p>
              We offer custom jewelry options to suit your unique style. Custom
              orders are non-refundable and require a deposit at the time of
              order.
            </p>
            <h2 className="stam_sp-service-policy__subtitle">
              Feedback and Reviews
            </h2>
            <p>
              We appreciate your feedback and encourage you to leave reviews
              about your experience. Your insights help us improve our services
              and products.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicePolicy;

{
  /* <div className='daimondsEveryAbout'>
        <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div> */
}
