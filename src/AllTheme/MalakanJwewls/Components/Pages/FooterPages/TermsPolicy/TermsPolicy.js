import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TermsPolicy.scss";

const TermsPolicy = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

    // Shree diamonds Data
    //     <div class="malkan_contactMain">
    //   <main class="malkan_sp-service-policy">
    //     <div class="content_malkana">
    //       <div class="title">
    //         <h2>Terms & Conditions</h2>
    //       </div>

    //       <div class="malkan_sp-service-policy__content">
    //         <h3>1. General</h3>
    //         <p>
    //           1.1 SHREE DIAMOND reserves the right to amend these Terms at any time. Any changes will take effect immediately upon posting on the Website.
    //         </p>

    //         <h3>2. Products and Services</h3>
    //         <p>
    //           2.1 All products displayed on the Website are subject to availability. SHREE DIAMOND reserves the right to discontinue any product or service without prior notice.
    //         </p>
    //         <p>
    //           2.2 Product images on the Website are for illustrative purposes only. While we strive to ensure accuracy, slight variations in color, design, or size may occur.
    //         </p>
    //         <p>
    //           2.3 Prices displayed on the Website are in [insert currency] and may be inclusive or exclusive of applicable taxes, depending on the jurisdiction.
    //         </p>

    //         <h3>3. Orders and Payments</h3>
    //         <p>
    //           3.1 By placing an order on the Website, you agree to purchase the selected item(s) under these terms.
    //         </p>
    //         <p>
    //           3.2 Orders are confirmed only upon receipt of full payment. SHREE DIAMOND accepts payments via [list accepted payment methods].
    //         </p>
    //         <p>
    //           3.3 SHREE DIAMOND reserves the right to cancel or refuse any order for reasons including but not limited to:
    //         </p>
    //         <ul>
    //           <li>Product unavailability</li>
    //           <li>Errors in pricing or product information</li>
    //           <li>Suspicion of fraudulent activity</li>
    //         </ul>
    //         <p>
    //           3.4 If an order is canceled, any payments made will be refunded under our Refund Policy.
    //         </p>

    //         <h3>4. Shipping and Delivery</h3>
    //         <p>
    //           4.1 Shipping charges and estimated delivery times are provided at checkout and may vary based on location.
    //         </p>
    //         <p>
    //           4.2 SHREE DIAMOND is not responsible for delays caused by unforeseen circumstances, including but not limited to customs clearance, natural disasters, or courier issues.
    //         </p>
    //         <p>
    //           4.3 The risk of loss or damage to the products passes to you upon delivery.
    //         </p>

    //         <h3>5. Returns and Refunds</h3>
    //         <p>
    //           5.1 Returns are accepted only if initiated within [insert time frame, e.g., 14 days] of receiving the product and if the product meets the conditions outlined in our Return Policy.
    //         </p>
    //         <p>
    //           5.2 Custom-made or personalized jewelry is non-returnable and non-refundable unless defective or damaged.
    //         </p>
    //         <p>
    //           5.3 Refunds, if applicable, will be processed within [insert time frame, e.g., 7-14 business days] of approval.
    //         </p>

    //         <h3>6. Intellectual Property</h3>
    //         <p>
    //           6.1 All content on the Website, including but not limited to text, images, logos, and designs, is the property of SHREE DIAMOND or its licensors and is protected under applicable intellectual property laws.
    //         </p>
    //         <p>
    //           6.2 Unauthorized use, reproduction, or distribution of any content from the Website is strictly prohibited.
    //         </p>

    //         <h3>7. Limitation of Liability</h3>
    //         <p>
    //           7.1 SHREE DIAMOND will not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the Website or your purchase of products, except as required by applicable law.
    //         </p>
    //         <p>
    //           7.2 The Website is provided on an "as is" and "as available" basis. We make no guarantees regarding the accuracy, completeness, or reliability of the information provided.
    //         </p>

    //         <h3>8. Privacy Policy</h3>
    //         <p>
    //           8.1 By using the Website, you consent to the collection, use, and storage of your personal information as outlined in our Privacy Policy.
    //         </p>
    //         <p>
    //           8.2 SHREE DIAMOND is committed to protecting your privacy and ensuring that your data is secure.
    //         </p>

    //         <h3>9. Governing Law and Dispute Resolution</h3>
    //         <p>
    //           9.1 These Terms are governed by the laws of [insert applicable jurisdiction].
    //         </p>
    //         <p>
    //           9.2 Any disputes arising under these Terms shall be resolved through arbitration or mediation in [insert location] or as otherwise agreed upon by the parties.
    //         </p>

    //         <h3>10. Contact Us</h3>
    //         <p>
    //           For questions or concerns regarding these Terms or your experience with SHREE DIAMOND, please contact us at:
    //         </p>
    //         <ul>
    //           <li>Email: <a style={{
    //             color:"white"
    //           }} href="mailto:shreediamondandjewels@gmail.com">shreediamondandjewels@gmail.com</a></li>
    //           <li>Phone: 9837121598, 9719169165</li>
    //           <li>Address: 30, Dhamawala Bazar, Opp. Saraswati Market, Dehradun, Uttarakhand</li>
    //         </ul>
    //       </div>
    //     </div>
    //   </main>
    // </div>


    // Sonsons
    <div className="malkan_contactMain">
      <main className="malkan_sp-service-policy">
        <div className="content_malkana">
          <div className="title">
            <h2>Terms & Policy</h2>
          </div>
          <div className="malkan_sp-service-policy__content">
            <p>
              At Sonasons Luxury Jewelry, we are committed to providing exceptional service to our valued customers. Our service policy is designed to ensure your complete satisfaction with every purchase and interaction.
            </p>

            <h2 className="malkan_sp-service-policy__subtitle">Quality Assurance</h2>
            <p>
              Every piece of jewelry from Sonasons undergoes rigorous quality checks to meet our high standards of craftsmanship and luxury. We take pride in our materials, ensuring that each item is crafted with the utmost care and precision.
            </p>

            <h2 className="malkan_sp-service-policy__subtitle">Returns and Exchanges</h2>
            <p>
              We offer a 30-day return policy on all purchases. Items must be returned in their original condition with all accompanying documentation. Please contact our customer service team for return authorization and instructions.
            </p>
            <ul>
              <li>Items must be unworn and unused.</li>
              <li>All original packaging and tags must be included.</li>
              <li>Custom or personalized items are non-returnable.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Lifetime Warranty</h2>
            <p>
              All Sonasons jewelry comes with a lifetime warranty against manufacturing defects. This warranty does not cover normal wear and tear, damage caused by accidents, or unauthorized repairs. We're committed to the longevity and quality of our pieces.
            </p>
            <ul>
              <li>Warranty covers manufacturing defects only.</li>
              <li>Proof of purchase is required for warranty claims.</li>
              <li>Repairs will be made at our discretion.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Customer Support</h2>
            <p>
              Our dedicated customer service team is available to assist you with any queries or concerns. We strive to respond to all inquiries within 24 hours. You can reach us via email, phone, or through our website's contact form.
            </p>
            <ul>
              <li>Email: support@sonasonsjewelry.com</li>
              <li>Phone: 1-800-123-4567</li>
              <li>Live chat available on our website.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Privacy Policy</h2>
            <p>
              We value your privacy and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data. We do not share your information with third parties without your consent, except as required by law.
            </p>
            <ul>
              <li>We collect personal information only with your consent.</li>
              <li>Your data is stored securely and protected.</li>
              <li>You can request access to your personal information at any time.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Shipping Policy</h2>
            <p>
              We offer free shipping on orders over a certain amount. Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout, and tracking information will be provided once your order has shipped.
            </p>
            <ul>
              <li>Free shipping on orders over $100.</li>
              <li>Expedited shipping available for an additional fee.</li>
              <li>Shipping times may vary based on location.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Payment Methods</h2>
            <p>
              We accept various payment methods, including credit cards, PayPal, and other secure online payment options. Please ensure that your payment information is accurate during checkout. All transactions are encrypted for your security.
            </p>
            <ul>
              <li>Major credit cards accepted (Visa, MasterCard, etc.).</li>
              <li>PayPal and other digital payment options available.</li>
              <li>All payments are processed securely.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Product Care</h2>
            <p>
              To maintain the beauty of your jewelry, we recommend following our care instructions, including regular cleaning and proper storage. Avoid exposing your jewelry to harsh chemicals, and store it in a soft pouch or jewelry box to prevent scratching.
            </p>
            <ul>
              <li>Clean your jewelry regularly with a soft cloth.</li>
              <li>Store jewelry separately to avoid scratches.</li>
              <li>Avoid contact with perfumes and lotions.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Custom Orders</h2>
            <p>
              We offer custom jewelry options to suit your unique style. Custom orders are non-refundable and require a deposit at the time of order. Please allow additional time for production and delivery on custom pieces.
            </p>
            <ul>
              <li>Custom designs must be approved before production.</li>
              <li>A 50% deposit is required for custom orders.</li>
              <li>Custom orders take 4-6 weeks for completion.</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Feedback and Reviews</h2>
            <p>
              We appreciate your feedback and encourage you to leave reviews about your experience. Your insights help us improve our services and products. Positive feedback also helps other customers make informed decisions.
            </p>
            <ul>
              <li>Leave a review on our website or social media.</li>
              <li>Contact us directly with suggestions for improvement.</li>
              <li>Your feedback is invaluable to us!</li>
            </ul>

            <h2 className="malkan_sp-service-policy__subtitle">Intellectual Property</h2>
            <p>
              All content, designs, and images on our website are the property of Sonasons Luxury Jewelry. Unauthorized use of our intellectual property is strictly prohibited.
            </p>

            <h2 className="malkan_sp-service-policy__subtitle">Limitation of Liability</h2>
            <p>
              Sonasons Luxury Jewelry is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the maximum extent permitted by law.
            </p>

            <h2 className="malkan_sp-service-policy__subtitle">Governing Law</h2>
            <p>
              These terms and policies are governed by the laws of [Your State/Country]. Any disputes arising from these terms will be resolved in the appropriate courts of [Your State/Country].
            </p>
          </div>
        </div>
      </main>
    </div>







    //  <div className="malkan_contactMain">
    //   <main className="malkan_sp-service-policy">
    //     <div className="content_malkana">
    //       <div className="title">
    //         <h2>Terms & Policy</h2>
    //       </div>
    //       <div className="malkan_sp-service-policy__content">
    //         <p>
    //           At Shree Diamond, we are committed to providing exceptional service to our valued customers. Our service policy is designed to ensure your complete satisfaction with every purchase and interaction.
    //         </p>

    //         <h2 className="malkan_sp-service-policy__subtitle">Quality Assurance</h2>
    //         <p>
    //           Every piece of jewelry from Shree Diamond undergoes rigorous quality checks to meet our high standards of craftsmanship and luxury. We take pride in our materials, ensuring that each item is crafted with the utmost care and precision.
    //         </p>

    //         <h2 className="malkan_sp-service-policy__subtitle">Returns and Exchanges</h2>
    //         <p>
    //           We offer a 30-day return policy on all purchases. Items must be returned in their original condition with all accompanying documentation. Please contact our customer service team for return authorization and instructions.
    //         </p>
    //         <ul>
    //           <li>Items must be unworn and unused.</li>
    //           <li>All original packaging and tags must be included.</li>
    //           <li>Custom or personalized items are non-returnable.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Lifetime Warranty</h2>
    //         <p>
    //           All Shree Diamond jewelry comes with a lifetime warranty against manufacturing defects. This warranty does not cover normal wear and tear, damage caused by accidents, or unauthorized repairs. We're committed to the longevity and quality of our pieces.
    //         </p>
    //         <ul>
    //           <li>Warranty covers manufacturing defects only.</li>
    //           <li>Proof of purchase is required for warranty claims.</li>
    //           <li>Repairs will be made at our discretion.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Customer Support</h2>
    //         <p>
    //           Our dedicated customer service team is available to assist you with any queries or concerns. We strive to respond to all inquiries within 24 hours. You can reach us via email, phone, or through our website's contact form.
    //         </p>
    //         <ul>
    //           <li>Email: support@shreediamondjewels.com</li>
    //           <li>Phone: 1-800-123-4567</li>
    //           <li>Live chat available on our website.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Privacy Policy</h2>
    //         <p>
    //           We value your privacy and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data. We do not share your information with third parties without your consent, except as required by law.
    //         </p>
    //         <ul>
    //           <li>We collect personal information only with your consent.</li>
    //           <li>Your data is stored securely and protected.</li>
    //           <li>You can request access to your personal information at any time.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Shipping Policy</h2>
    //         <p>
    //           We offer free shipping on orders over a certain amount. Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout, and tracking information will be provided once your order has shipped.
    //         </p>
    //         <ul>
    //           <li>Free shipping on orders over $100.</li>
    //           <li>Expedited shipping available for an additional fee.</li>
    //           <li>Shipping times may vary based on location.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Payment Methods</h2>
    //         <p>
    //           We accept various payment methods, including credit cards, PayPal, and other secure online payment options. Please ensure that your payment information is accurate during checkout. All transactions are encrypted for your security.
    //         </p>
    //         <ul>
    //           <li>Major credit cards accepted (Visa, MasterCard, etc.).</li>
    //           <li>PayPal and other digital payment options available.</li>
    //           <li>All payments are processed securely.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Product Care</h2>
    //         <p>
    //           To maintain the beauty of your jewelry, we recommend following our care instructions, including regular cleaning and proper storage. Avoid exposing your jewelry to harsh chemicals, and store it in a soft pouch or jewelry box to prevent scratching.
    //         </p>
    //         <ul>
    //           <li>Clean your jewelry regularly with a soft cloth.</li>
    //           <li>Store jewelry separately to avoid scratches.</li>
    //           <li>Avoid contact with perfumes and lotions.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Custom Orders</h2>
    //         <p>
    //           We offer custom jewelry options to suit your unique style. Custom orders are non-refundable and require a deposit at the time of order. Please allow additional time for production and delivery on custom pieces.
    //         </p>
    //         <ul>
    //           <li>Custom designs must be approved before production.</li>
    //           <li>A 50% deposit is required for custom orders.</li>
    //           <li>Custom orders take 4-6 weeks for completion.</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Feedback and Reviews</h2>
    //         <p>
    //           We appreciate your feedback and encourage you to leave reviews about your experience. Your insights help us improve our services and products. Positive feedback also helps other customers make informed decisions.
    //         </p>
    //         <ul>
    //           <li>Leave a review on our website or social media.</li>
    //           <li>Contact us directly with suggestions for improvement.</li>
    //           <li>Your feedback is invaluable to us!</li>
    //         </ul>

    //         <h2 className="malkan_sp-service-policy__subtitle">Intellectual Property</h2>
    //         <p>
    //           All content, designs, and images on our website are the property of Shree Diamond. Unauthorized use of our intellectual property is strictly prohibited.
    //         </p>

    //         <h2 className="malkan_sp-service-policy__subtitle">Limitation of Liability</h2>
    //         <p>
    //           Shree Diamond is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the maximum extent permitted by law.
    //         </p>

    //         <h2 className="malkan_sp-service-policy__subtitle">Governing Law</h2>
    //         <p>
    //           These terms and policies are governed by the laws of [Your State/Country]. Any disputes arising from these terms will be resolved in the appropriate courts of [Your State/Country].
    //         </p>
    //       </div>
    //     </div>
    //   </main>
    // </div>


  );
};

export default TermsPolicy;

{/* <div className="malkan_contactMain">
  <main className="malkan_sp-service-policy">
    <div className="content_malkana">
      <div className="title">
        <h2>Terms & Policy</h2>
      </div>
      <div className="malkan_sp-service-policy__content">
        <p>
          At Sonasons Luxury Jewelry, we are committed to providing exceptional service to our valued customers. Our service policy is designed to ensure your complete satisfaction with every purchase and interaction.
        </p>
        
        <h2 className="malkan_sp-service-policy__subtitle">Quality Assurance</h2>
        <p>
          Every piece of jewelry from Sonasons undergoes rigorous quality checks to meet our high standards of craftsmanship and luxury. We take pride in our materials, ensuring that each item is crafted with the utmost care and precision.
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">Returns and Exchanges</h2>
        <p>
          We offer a 30-day return policy on all purchases. Items must be returned in their original condition with all accompanying documentation. Please contact our customer service team for return authorization and instructions.
        </p>
        <ul>
          <li>Items must be unworn and unused.</li>
          <li>All original packaging and tags must be included.</li>
          <li>Custom or personalized items are non-returnable.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Lifetime Warranty</h2>
        <p>
          All Sonasons jewelry comes with a lifetime warranty against manufacturing defects. This warranty does not cover normal wear and tear, damage caused by accidents, or unauthorized repairs. We're committed to the longevity and quality of our pieces.
        </p>
        <ul>
          <li>Warranty covers manufacturing defects only.</li>
          <li>Proof of purchase is required for warranty claims.</li>
          <li>Repairs will be made at our discretion.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Customer Support</h2>
        <p>
          Our dedicated customer service team is available to assist you with any queries or concerns. We strive to respond to all inquiries within 24 hours. You can reach us via email, phone, or through our website's contact form.
        </p>
        <ul>
          <li>Email: support@sonasonsjewelry.com</li>
          <li>Phone: 1-800-123-4567</li>
          <li>Live chat available on our website.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Privacy Policy</h2>
        <p>
          We value your privacy and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data. We do not share your information with third parties without your consent, except as required by law.
        </p>
        <ul>
          <li>We collect personal information only with your consent.</li>
          <li>Your data is stored securely and protected.</li>
          <li>You can request access to your personal information at any time.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Shipping Policy</h2>
        <p>
          We offer free shipping on orders over a certain amount. Standard shipping typically takes 3-5 business days. Expedited shipping options are available at checkout, and tracking information will be provided once your order has shipped.
        </p>
        <ul>
          <li>Free shipping on orders over $100.</li>
          <li>Expedited shipping available for an additional fee.</li>
          <li>Shipping times may vary based on location.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Payment Methods</h2>
        <p>
          We accept various payment methods, including credit cards, PayPal, and other secure online payment options. Please ensure that your payment information is accurate during checkout. All transactions are encrypted for your security.
        </p>
        <ul>
          <li>Major credit cards accepted (Visa, MasterCard, etc.).</li>
          <li>PayPal and other digital payment options available.</li>
          <li>All payments are processed securely.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Product Care</h2>
        <p>
          To maintain the beauty of your jewelry, we recommend following our care instructions, including regular cleaning and proper storage. Avoid exposing your jewelry to harsh chemicals, and store it in a soft pouch or jewelry box to prevent scratching.
        </p>
        <ul>
          <li>Clean your jewelry regularly with a soft cloth.</li>
          <li>Store jewelry separately to avoid scratches.</li>
          <li>Avoid contact with perfumes and lotions.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Custom Orders</h2>
        <p>
          We offer custom jewelry options to suit your unique style. Custom orders are non-refundable and require a deposit at the time of order. Please allow additional time for production and delivery on custom pieces.
        </p>
        <ul>
          <li>Custom designs must be approved before production.</li>
          <li>A 50% deposit is required for custom orders.</li>
          <li>Custom orders take 4-6 weeks for completion.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Feedback and Reviews</h2>
        <p>
          We appreciate your feedback and encourage you to leave reviews about your experience. Your insights help us improve our services and products. Positive feedback also helps other customers make informed decisions.
        </p>
        <ul>
          <li>Leave a review on our website or social media.</li>
          <li>Contact us directly with suggestions for improvement.</li>
          <li>Your feedback is invaluable to us!</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">Intellectual Property</h2>
        <p>
          All content, designs, and images on our website are the property of Sonasons Luxury Jewelry. Unauthorized use of our intellectual property is strictly prohibited.
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">Limitation of Liability</h2>
        <p>
          Sonasons Luxury Jewelry is not liable for any indirect, incidental, or consequential damages arising from the use of our products or services. Our liability is limited to the maximum extent permitted by law.
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">Governing Law</h2>
        <p>
          These terms and policies are governed by the laws of [Your State/Country]. Any disputes arising from these terms will be resolved in the appropriate courts of [Your State/Country].
        </p>
      </div>
    </div>
  </main>
</div> */}