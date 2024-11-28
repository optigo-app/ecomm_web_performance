import React from "react";
import "./ServicePolicy.scss";

export default function ServicePolicyX() {
  return (
    <div className="service-policy-rp">
      <main className="main-content">
        <h1>Service Policy – Sonasons</h1>
        {/* <h1>Service Policy – Roop Jewellers's</h1> */}

        <section className="policy-section">
          <h2>Data Collection</h2>
          <p>
            We collect information from you when you register on our site, place
            an order, subscribe to our newsletter, respond to a survey or fill
            out a form. When ordering or registering on our site, as
            appropriate, you may be asked to enter your: name, e-mail address,
            mailing address, phone number or credit card information. You may,
            however, visit our site anonymously.
          </p>
        </section>

        <section className="policy-section">
          <h2>Use Of Data</h2>
          <p>
            Any of the information we collect from you may be used in one of the
            following ways:
          </p>
          <ul>
            <li>
              To personalize your experience (your information helps us to
              better respond to your individual needs)
            </li>
            <li>
              To improve our website (we continually strive to improve our
              website offerings based on the information and feedback we receive
              from you)
            </li>
            <li>
              To improve customer service (your information helps us to more
              effectively respond to your customer service requests and support
              needs)
            </li>
            <li>To process transactions</li>
            <li>To send periodic emails</li>
          </ul>
        </section>

        <section className="policy-section">
          <h2>Disclosure of Personal Data</h2>
          <p>
            We do not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information. This does not include trusted
            third parties who assist us in operating our website, conducting our
            business, or servicing you, so long as those parties agree to keep
            this information confidential. We may also release your information
            when we believe release is appropriate to comply with the law,
            enforce our site policies, or protect ours or others rights,
            property, or safety.
          </p>
        </section>

        <section className="policy-section">
          <h2>Cookies And Other Tracking Technologies.</h2>
          <p>
            We use cookies, clear gifs, and log file information to: (a)
            remember information so that you will not have to re-enter it during
            your visit or the next time you visit the site; (b) provide custom,
            personalized content and information; (c) monitor the effectiveness
            of our service; (d) monitor aggregate metrics such as total number
            of visitors and traffic; (e) diagnose or fix technology problems
            reported by our users or engineers that are associated with certain
            IP addresses; and (f) help you efficiently access your information
            after you sign in.
          </p>
        </section>
      </main>
    </div>
  );
}
