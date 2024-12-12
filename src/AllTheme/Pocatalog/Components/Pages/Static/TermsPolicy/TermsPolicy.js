import './TermsPolicy.scss'

const TermsPolicy = () => {
  return (
    <div className="privacy-policy-container">
    <h1 className="privacy-policy-title">Privacy Policy</h1>
    <p className="privacy-policy-date">Last updated: {new Date().toLocaleDateString()}</p>

    <div className="privacy-policy-content">
      <section>
        <h2 className="section-title">1. Introduction</h2>
        <p>Welcome to Your Company's Privacy Policy. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
      </section>

      <section>
        <h2 className="section-title">2. Information We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="info-list">
          <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
          <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
          <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
          <li><strong>Usage Data</strong> includes information about how you use our website, products and services.</li>
        </ul>
      </section>

      <section>
        <h2 className="section-title">3. How We Use Your Information</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="info-list">
          <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
          <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
          <li>Where we need to comply with a legal obligation.</li>
        </ul>
      </section>

      <section>
        <h2 className="section-title">4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
      </section>

      <section>
        <h2 className="section-title">5. Your Legal Rights</h2>
        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
        <ul className="info-list">
          <li>Request access to your personal data.</li>
          <li>Request correction of your personal data.</li>
          <li>Request erasure of your personal data.</li>
          <li>Object to processing of your personal data.</li>
          <li>Request restriction of processing your personal data.</li>
          <li>Request transfer of your personal data.</li>
          <li>Right to withdraw consent.</li>
        </ul>
      </section>

      <section>
        <h2 className="section-title">6. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.</p>
      </section>

      <section>
        <h2 className="section-title">7. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us:</p>
        <ul className="info-list">
          <li>By email: privacy@yourcompany.com</li>
          <li>By visiting this page on our website: www.yourcompany.com/contact</li>
          <li>By phone number: +1 (555) 123-4567</li>
          <li>By mail: 123 Privacy Street, Anytown, ST 12345, Country</li>
        </ul>
      </section>
    </div>
  </div>
  )
}

export default TermsPolicy