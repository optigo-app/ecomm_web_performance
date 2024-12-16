import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./ServicePolicy.scss";

const ServicePolicy = () => {
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
    // <div className="malkan_contactMain">
    //   <main className="malkan_sp-service-policy">
    //     <div className="content_malkana">
    //       <div className="title">
    //         <h2>Service Policy</h2>
    //       </div>
    //       <div className="malkan_sp-service-policy__content">
    //         <p>
    //           At Sonasons Luxury Jewelry, we are committed to providing
    //           exceptional service to our valued customers. Our service policy is
    //           designed to ensure your complete satisfaction with every purchase
    //           and interaction.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Quality Assurance
    //         </h2>
    //         <p>
    //           Every piece of jewelry from Sonasons undergoes rigorous quality
    //           checks to meet our high standards of craftsmanship and luxury.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Returns and Exchanges
    //         </h2>
    //         <p>
    //           We offer a 30-day return policy on all purchases. Items must be
    //           returned in their original condition with all accompanying
    //           documentation.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Lifetime Warranty
    //         </h2>
    //         <p>
    //           All Sonasons jewelry comes with a lifetime warranty against
    //           manufacturing defects. We're committed to the longevity and
    //           quality of our pieces.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Customer Support
    //         </h2>
    //         <p>
    //           Our dedicated customer service team is available to assist you
    //           with any queries or concerns. We strive to respond to all
    //           inquiries within 24 hours.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Privacy Policy
    //         </h2>
    //         <p>
    //           We value your privacy and are committed to protecting your
    //           personal information. Our privacy policy outlines how we collect,
    //           use, and safeguard your data.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Shipping Policy
    //         </h2>
    //         <p>
    //           We offer free shipping on orders over a certain amount. Standard
    //           shipping typically takes 3-5 business days. Expedited shipping
    //           options are available at checkout.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Payment Methods
    //         </h2>
    //         <p>
    //           We accept various payment methods, including credit cards, PayPal,
    //           and other secure online payment options. Please ensure that your
    //           payment information is accurate during checkout.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">Product Care</h2>
    //         <p>
    //           To maintain the beauty of your jewelry, we recommend following our
    //           care instructions, including regular cleaning and proper storage.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Custom Orders
    //         </h2>
    //         <p>
    //           We offer custom jewelry options to suit your unique style. Custom
    //           orders are non-refundable and require a deposit at the time of
    //           order.
    //         </p>
    //         <h2 className="malkan_sp-service-policy__subtitle">
    //           Feedback and Reviews
    //         </h2>
    //         <p>
    //           We appreciate your feedback and encourage you to leave reviews
    //           about your experience. Your insights help us improve our services
    //           and products.
    //         </p>
    //       </div>
    //     </div>
    //   </main>
    // </div>
    <div className="malkan_contactMain">
  <main className="malkan_sp-service-policy">
    <div className="content_malkana">
      <div className="title">
        <h2>Service Policy</h2>
      </div>
      <div className="malkan_sp-service-policy__content">
        <p>
          Welcome to Shree Diamond. This policy outlines the terms and conditions governing the services we provide, ensuring a seamless and transparent experience for all our customers. By using our services, you agree to comply with the terms specified in this policy.
        </p>
        <h2 className="malkan_sp-service-policy__subtitle">
          Services Offered
        </h2>
        <p>
          Shree Diamond Jewelry offers the following professional services:
        </p>
        <ul>
          <li><strong>Jewelry Sales:</strong> Retail and wholesale of high-quality diamond jewelry, including rings, necklaces, earrings, and bracelets.</li>
          <li><strong>Customization:</strong> Personalized jewelry design and manufacturing tailored to your preferences.</li>
          <li><strong>Jewelry Repair and Maintenance:</strong> Services including resizing, polishing, stone replacement, and general repairs.</li>
          <li><strong>Diamond Grading and Certification:</strong> Expert grading and certification to validate the authenticity and quality of diamonds.</li>
          <li><strong>Valuation Services:</strong> Professional appraisal of diamond jewelry for insurance or resale purposes.</li>
          <li><strong>After-Sales Services:</strong> Post-purchase support, such as cleaning and periodic maintenance.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">
          Service Terms
        </h2>
        <p>
          <strong>Order Confirmation:</strong> Orders, including custom jewelry, are confirmed upon receipt of the advance payment.
        </p>
        <p>
          <strong>Delivery Timelines:</strong> Standard products are shipped within 7–10 business days. Custom jewelry timelines will be communicated at the time of order placement.
        </p>
        <p>
          <strong>Customer Approvals:</strong> For custom orders, design approval is mandatory before production begins. Once approved, further modifications may incur additional charges.
        </p>
        <p>
          <strong>Service Guarantee:</strong> We ensure high-quality workmanship in all our services. Issues or defects must be reported within the specified warranty period for resolution.
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">
          Pricing and Payment
        </h2>
        <p>
          <strong>Transparent Pricing:</strong> All prices are quoted in rupees including applicable taxes unless stated otherwise.
        </p>
        <p>
          <strong>Advance Payments:</strong> Custom orders require a 50% non-refundable advance payment. The balance must be paid in full before delivery.
        </p>
        <p>
          <strong>Payment Options:</strong> Payments can be made via credit/debit cards, UPI, net banking, or other approved payment methods.
        </p>
        <p>
          <strong>Refunds:</strong> Refunds, if applicable, will be processed within 7–10 business days of approval. Custom orders are non-refundable.
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">
          Returns, Exchanges, and Cancellations
        </h2>
        <p>
          <strong>Returns:</strong> Standard products can be returned within 14 days in unused, original condition with proof of purchase. Custom or personalized jewelry is not eligible for returns unless defective.
        </p>
        <p>
          <strong>Exchanges:</strong> Exchanges are subject to inspection and approval by our team.
        </p>
        <p>
          <strong>Cancellations:</strong> Standard product orders can be canceled within 24 hours of placement. Custom orders cannot be canceled once production has started.
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">
          Customer Responsibilities
        </h2>
        <p>
          Customers are responsible for:
        </p>
        <ul>
          <li>Providing accurate details for orders and certifications.</li>
          <li>Handling jewelry with care to prevent accidental damage.</li>
          <li>Retaining purchase invoices for service claims.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">
          Liability and Disclaimers
        </h2>
        <p>
          Shree Diamond Jewelry is not liable for:
        </p>
        <ul>
          <li>Damage caused by improper use, wear, or external repairs.</li>
          <li>Loss or theft of jewelry after purchase.</li>
          <li>Services involving third parties, such as certification or valuation, which are subject to the terms and timelines of the respective provider.</li>
        </ul>

        <h2 className="malkan_sp-service-policy__subtitle">
          Data Privacy
        </h2>
        <p>
          Shree Diamond Jewelry respects your privacy. Personal information collected is used solely for order processing and service improvement. We do not share your data with third parties without your consent. For details, please refer to our Privacy Policy.
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">
          Dispute Resolution
        </h2>
        <p>
          In the event of a dispute, we encourage resolution through mutual discussion. If unresolved, disputes will be governed by the laws of [applicable jurisdiction].
        </p>

        <h2 className="malkan_sp-service-policy__subtitle">
          Amendments
        </h2>
        <p>
          Shree Diamond Jewelry reserves the right to modify this policy at any time. Customers will be informed of any significant changes via email or our website.
        </p>
      </div>
    </div>
  </main>
</div>

  );
};

export default ServicePolicy;
