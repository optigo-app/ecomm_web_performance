import React from 'react'
import './FAQ.scss'
import Footer from '../../Home/Footer/Footer'
import useHomeBannerImages from '../../../../../../utils/Glob_Functions/ThemesBanner/ThemesBanner'

export default function FAQ() {
    const banner = useHomeBannerImages();
    return (
        <div style={{
            backgroundColor: '#efe5ff',
        }}>
            <div className='mainFaqDiv'>
                <div style={{ paddingBlock: '60px' }}>
                    <p style={{ fontSize: '40px', color: '#3f3151', textAlign: 'center' }}>Frequently Asked Questions</p>
                </div>

                <div className='smiling-FaqMain'>
                    <div className='smiling-FaqSubMain'>
                        <p className='smiling-FaqMainTitle' style={{ paddingTop: '110px', color: '#3f3151' }}>FAQ about Diamond jewelry, including Return and Refund Policies:</p>
                        <p className='smiling-FaqMainSubTitle'>What are lab-grown diamonds, and how do they differ from mined diamonds?</p>
                        <p className='smiling-FaqMainDesc'>Lab-grown diamonds are diamonds created through advanced technological processes in laboratories. They possess the
                            same chemical composition, crystal structure, and physical properties as mined diamonds but are produced ethically and
                            sustainably in controlled environments.
                            {/* <br />
                            <br />
                            Here at Sonasons we proudly offer only laboratory-grown, socially and environmentally conscious diamonds in our fine jewelry.
                            <br />
                            <br />

                            This makes our diamonds brighter, and stronger and more responsible. Our diamonds are dedicated to sustainable smiles. */}
                        </p>
                        {/* <br /> */}

                        <p className='smiling-FaqMainSubTitle'>Are lab-grown diamonds real diamonds? </p>
                        <p className='smiling-FaqMainDesc'>Yes, lab-grown diamonds are real diamonds with identical characteristics to mined diamonds. They are chemically and
                            optically indistinguishable from natural diamonds. </p>
                        {/* <p className='smiling-FaqMainDesc'>To get more detailed information please visit Our Diamonds page.</p> */}

                        {/* <p className='smiling-FaqMainSubTitle'>Is my diamond Laser Inscribed?</p> */}
                        {/* <p className='smiling-FaqMainDesc'>Yes, all Sonasons diamonds are laser-inscribed with our logo. Also, if you are purchasing a loose diamond, that's one carat up, the stones will be inscribed with an IGI certification number.</p> */}

                        {/* <p className='smiling-FaqMainSubTitle'>I’d like to purchase loose diamonds in large quantity, how can I do so?</p> */}
                        {/* <p className='smiling-FaqMainDesc'>If you are interested in working with us, please contact order@sonasons.com and we will assist your requests accordingly.</p> */}

                        {/* <p className='smiling-FaqMainSubTitle'>Can I choose to donate with each purchase?</p> */}
                        {/* <p className='smiling-FaqMainDesc'>Yes, we have set up a channel for the charitable distribution of funds so that 10% of the proceeds from your purchase is contributed to Sonasons Foundation, Inc. (the “Foundation”). The Foundation will be responsible for dispersing the funds to the specific charities that you choose when making a purchase from the website. While 10% of your purchase is ultimately contributed to the charitable organizations, tax deductions are not available to each individual customer since the customer’s donations are not directly contributed.</p> */}

                        {/* <p className='smiling-FaqMainSubTitle'>What are the charity sectors I can donate to?</p> */}
                        {/* <p className='smiling-FaqMainDesc'>You can choose for the Foundation to disperse the donation funds from your purchase to the following 4 charity sectors: Medical Support, Environmental Support,  Social Support, and Animal Protection. Check out more via our Impact Page.</p> */}

                        {/* <p className='smiling-FaqMainSubTitle'>Can I choose the % of my donation?</p> */}
                        {/* <p className='smiling-FaqMainDesc'>Yes, all customers may choose between our 4 designated charity sectors, mentioned above, and decide on which portion of the funds (collectively equal to 10% of the customer’s purchase), will be directed to a certain charity sector(s) by the Foundation. For clarity purposes, the customer is in control of where the funds will be dispersed, and the Foundation will disperse the funds accordingly.</p> */}

                        {/* <p className='smiling-FaqMainTitle'>Shipping and Returns</p> */}

                        <p className='smiling-FaqMainSubTitle'>What is the return policy for diamond jewelry? </p>
                        <p className='smiling-FaqMainDesc'>Our return policy allows for free returns within a specified period, usually 30 days, from the date of item delivery. Items
                            must be returned in their original condition, with tags intact and unworn. Specific conditions apply, so please refer to our
                            Return Policy section for more details.</p>

                        <p className='smiling-FaqMainSubTitle'>How do I initiate a return for diamond jewelry?</p>
                        <p className='smiling-FaqMainDesc'>To initiate a return, please contact our customer support team at [customer support email] with your order details and
                            reason for return. We will provide you with further instructions and, if applicable, a prepaid return label for your
                            convenience. </p>

                        <p className='smiling-FaqMainSubTitle'>What items are eligible for return and refund? </p>
                        <p className='smiling-FaqMainDesc'>Generally, items eligible for return and refund include those in their original condition, with tags intact and unworn.
                            However, certain exclusions may apply, such as special orders or customized items. Please refer to our Return Policy for a
                            comprehensive list of eligible items.</p>

                        <p className='smiling-FaqMainSubTitle'>What is the refund process for returned diamond jewelry? </p>
                        <p className='smiling-FaqMainDesc'>Once we receive and inspect the returned item(s) to ensure they meet our return policy criteria, we will process the
                            refund within a specified timeframe, typically within a week. The refund will be credited back to your original payment
                            method. Please note that refund processing times may vary depending on your financial institution. </p>

                        <p className='smiling-FaqMainSubTitle'>Are there any items excluded from the return and refund policy? </p>
                        {/* < p style={{
                            color: '#7d7f85',
                            fontWeight: 700
                        }}>jewelry Return Policy</p> */}
                        <p className='smiling-FaqMainDesc'>Yes, certain items may be excluded from our return and refund policy, including but not limited to: </p>

                        {/* <p style={{
                            color: '#7d7f85',
                            fontWeight: 700
                        }}>Diamond Return Policy</p> */}
                        {/* <p className='smiling-FaqMainDesc'>We offer free returns within 30 days of item delivery. If you wish to return, the diamond must be in its original condition and shipped with the grading reports. If the diamond report is not returned, you will be charged for $150 USD as a replacement cost. Please return the diamond in its original packaging as shipped. Once received, we will need to inspect the diamond (it will take a week). Sonasons reserves the right to reject the diamonds if it is not returned in its original condition. You will be notified once the return process is approved or rejected. The rejected items will be sent back to your original shipping address.
                            <br />
                            <br />
                            In order to process a return of your purchased items simply send us an email to order@sonasons.com.</p>

                        <p style={{
                            color: '#7d7f85',
                            fontWeight: 700
                        }}>The following exclusions that will not be accepted as a manufacturing defect and applied to the return and refund policy include:</p> */}
                        <ul>
                            <li className='smiling-FaqMainDesc'>
                                <p lassName='smiling-FaqMainDesc'><span lassName='smiling-FaqMainDesc'>Special orders or customized jewelry </span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p lassName='smiling-FaqMainDesc'><span lassName='smiling-FaqMainDesc' >Items that show signs of wear and tear or damage not due to manufacturing defects</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p lassName='smiling-FaqMainDesc'><span lassName='smiling-FaqMainDesc' >jewelry that has been altered or resized by a third party </span></p>
                            </li>
                            {/* <li className='smiling-FaqMainDesc'>
                                <p lassName='smiling-FaqMainDesc'><span lassName='smiling-FaqMainDesc' >Missing stones or lost stones due to daily wear or any kinds of damage</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p lassName='smiling-FaqMainDesc'><span lassName='smiling-FaqMainDesc'>Any special orders are not returnable or refundable.<br /><br /></span></p>
                            </li> */}
                        </ul>

                        <p className='smiling-FaqMainSubTitle'>Can I return a diamond jewelry item without a receipt? </p>

                        <p className='smiling-FaqMainDesc'>In most cases, a proof of purchase, such as an order confirmation or receipt, is required to process a return and refund. If
                            you have misplaced your receipt, please contact our customer support team for assistance.
                            {/* <br /> */}
                            {/* <br /> */}
                            {/* We will be more than happy to assist you. Simply send us an email to order@sonasons.com and we will walk you through all the details. */}
                        </p>

                        <p className='smiling-FaqMainSubTitle'>What if I receive a defective or damaged diamond jewelry item? </p>
                        <p className='smiling-FaqMainDesc'>If you receive a defective or damaged item, please contact our customer support team immediately with photographic
                            evidence of the issue. We will work to resolve the issue promptly, whether through a replacement, repair, or refund, as
                            per our warranty and return policies. </p>

                        <p className='smiling-FaqMainSubTitle'>How long does it take to receive a refund for returned diamond jewelry? </p>
                        <p className='smiling-FaqMainDesc'>Once your returned item(s) have been received and inspected, we will process the refund within a specified timeframe,
                            typically within a week. Please note that it may take additional time for the refunded amount to reflect in your account,
                            depending on your financial institution's processing times.  </p>

                        {/* <p className='smiling-FaqMainSubTitle'>What are the supported Payment Methods?</p>
                        <p className='smiling-FaqMainDesc'>You can complete your purchase through the payment ways below:</p>
                        <ul>
                            <li className='smiling-FaqMainDesc'>
                                <p><span  >Mastercard</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p><span  >Visa</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p><span  >PayPal</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p><span  >American Express</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p><span  >Apple Pay</span></p>
                            </li>
                        </ul> */}

                        {/* <p className='smiling-FaqMainTitle'>Lifetime Warranty</p>
                        <p className='smiling-FaqMainDesc'>Be rest assured with your Sonasons jewelry! We will provide you with Lifetime Warranty guarantee with any jewelry purchased from Sonasons. If you believe your item has any manufacturing defect, you can ship it to us with your proof of purchase for us to inspect. If we determine the jewelry damage is valid, we will repair the item.</p>

                        <p className='smiling-FaqMainDesc'>The type of repairs included are:</p>
                        <ul>
                            <li className='smiling-FaqMainDesc'>
                                <p className='smiling-FaqMainDesc'><span >Complimentary polishing of jewelry</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p className='smiling-FaqMainDesc'><span >Complimentary resizing one size up or down (Eternity bands are not resizable).</span></p>
                            </li>
                            <li className='smiling-FaqMainDesc'>
                                <p ><span >If your diamond falls out you can return it to us and we do our best to reset it. But if the diamond is lost, we are unable to replace it with a new one. You would need to purchase a diamond for replacing it.</span></p>
                            </li>
                        </ul>
                        <p className='smiling-FaqMainDesc'>Our repair policy excludes wear and tear, loss of diamonds, product loss or item being stolen and any repairs or work not done by Sonasons will void this warranty. For a repair request, we will first need to receive a proof of purchase shipped together with the jewelry. If the repair request is aligned with our policy, we will proceed with the request. If it is not, we will notify you if the repair service is available and what it will cost. The repaired items will be delivered back to your given shipping address in one to two weeks’ time. We offer complimentary shipping back to the customers for all warrantied repairs.</p>

                        <p className='smiling-FaqMainSubTitle'>Special Order Request</p>
                        <p className='smiling-FaqMainSubTitle'>I’d like to engrave my name on my jewelry, can I do so?</p>
                        <p className='smiling-FaqMainDesc'>Yes! But we can only engrave your initials on your jewelry.  If you have purchased our Sonasons jewelry and wish to engrave your initials on it, we are happy to help you do so. Email us at order@sonasons.com and with proof of purchase for us to confirm and proceed with your request.</p>

                        <p className='smiling-FaqMainSubTitle'>In what Karat gold is done Sonasons jewelry?</p>
                        <p className='smiling-FaqMainDesc'>10K gold. If you wish to place any of our favorite order in a different metal purity (14K or 18K), email us at order@sonasons.com and we will look into your request.
                            <br />
                            <br />
                            All special orders are not refundable or returnable. They will take around 2 weeks’ time to deliver from the date of purchase.</p>

                        <p className='smiling-FaqMainTitle'>Account Support</p>

                        <p className='smiling-FaqMainSubTitle'>How do I create an account?</p>
                        <p className='smiling-FaqMainDesc'>To create an account simply click the Sign In button and Register Now to fill in your details. Please create an account password which is unique and kept secure. You must notify Sonasons immediately of any unauthorized use of your account.
                            <br />
                            <br />
                            With a Sonasons account you will be able to enjoy the following benefits:</p>

                        <p className='smiling-FaqMainSubTitle'>I need help to login to  My Account:</p>
                        <p className='smiling-FaqMainDesc'>If you are experiencing any issues to login into your account, please don’t hesitate to contact our Customer Support team at order@sonasons.com and we will assist you with any questions.</p>

                        <p className='smiling-FaqMainSubTitle'>How do I restore my account password?</p>
                        <p className='smiling-FaqMainDesc'>To reset your password, follow the 'FORGOT  YOUR PASSWORD' instructions on the SIGN IN page. Please note, for security reasons we are unable to send your old password via email.</p> */}

                        <p style={{
                             color: '#3f3151',
                        }}>Please feel free to contact our customer support team at <span style={{fontWeight:'700',color: '#3f3151',}}>info@loveindiamonds.com</span> if you have any further questions or
                            require assistance with returns and refunds.</p>
                    </div>
                    <Footer data={banner?.affiliation} />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
                <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: '#3f3151', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
            </div>
        </div>

    )
}
