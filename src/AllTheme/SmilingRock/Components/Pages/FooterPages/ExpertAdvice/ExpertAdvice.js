// import React, { useEffect, useState } from 'react'
// import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
// import Footer from '../../Home/Footer/Footer';

// const ExpertAdvice = () => {

//   const [htmlContent, setHtmlContent] = useState('');

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   useEffect(() => {
//     fetch(`${storImagePath()}/html/ExpertAdvice.html`)
//       .then((response) => response.text())
//       .then((html) => {
//         setHtmlContent(html);
//         console.log('htmlssssssss', html);
//       })
//       .catch((error) => {
//         console.error('Error fetching the HTML file:', error);
//       });
//   }, []);

//   return (
//     <div className='contactMain'>
//       <div className='daimondsEveryAbout'>
//         <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
//           <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
//         </div>
//         <Footer />
//       </div>
//       <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' }}>
//         <p style={{ margin: '0px', fontWeight: 500, width: '100px', color: 'white', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
//       </div>
//     </div>
//   )
// }

// export default ExpertAdvice

import { useEffect } from 'react';
import Footer from '../../Home/Footer/Footer';
import './ExpertAdvice.modul.scss'

function ExpertAdvice() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="smr_Expert_FooterTopMain" >
      <div className="smr_Expert_FooterTopMain_sub" >
        <p className="text_center" style={{ textAlign: "center", paddingBlock: "60px", color: 'black' }}>
          <strong>
            <span className="TitleMainFoterExpert" style={{ fontFamily: "Calibri", fontSize: "40px", fontFamily: " FreightDispProBook-Regular, Times New Roman , serif" }}>EXPERT ADVICE</span>
          </strong>
        </p>
        <div>
          <div className='smiling-ServicePolicyMain'>
            <div className="container2">
              <p style={{ marginLeft: "166.85pt", textAlign: "justify" }}>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
                </strong>
              </p>
              <ul style={{ listStyleType: "undefined", paddingLeft: "0px" }}>
                <li className="text_center">
                  <span style={{ fontFamily: "Calibri", fontSize: "14pt" }}>1.&nbsp;</span>
                  <strong>
                    <span style={{ fontFamily: "Calibri", fontSize: "14pt" }}>
                      How to choose the perfect engagement ring
                    </span>
                  </strong>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  Giving the gift of a diamond says, ‘i will always love you’. And it has
                  done for centuries
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  &nbsp;
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span
                    style={{
                      fontFamily: "Wingdings",
                      fontSize: "13pt",
                      background: "none"
                    }}
                  >
                    Ø&nbsp;
                  </span>
                  <em>
                    <span
                      style={{
                        fontFamily: "Calibri",
                        fontSize: "13pt",
                        background: "none"
                      }}
                    >
                      Did you know?
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  The first known use of a diamond engagement ring took place in 1477, when
                  archduke maxmillian of austria gave mary of burgundy a gold ring featuring
                  an m spelled out in diamonds.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    &nbsp;
                  </span>
                </u>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      What is the best type of engagement ring to buy?
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  The main choices for&nbsp;
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>engagement ring</span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  &nbsp;metals are platinum, white gold, yellow gold, and rose gold.
                  Platinum and white gold are the most popular choices, but rose gold is
                  continuing to rise in popularity. Platinum and white gold look very
                  similar, but platinum is more durable and costs about 50% more.
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      What is the best month to buy jewellery?
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(34, 34, 34)",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  A recent article published on cnbc boasts that&nbsp;
                </span>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(34, 34, 34)",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  july
                </span>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(34, 34, 34)",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  &nbsp;is the best time to buy jewelry! With no major&nbsp;
                </span>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(34, 34, 34)",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  holidays
                </span>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(34, 34, 34)",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  &nbsp;in sight, jewelers are set to offer promotions and discounts during
                  this&nbsp;
                </span>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(34, 34, 34)",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  summer
                </span>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(34, 34, 34)",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  &nbsp;month
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <strong>
                    <u>
                      <span style={{ fontFamily: "Calibri", fontSize: "14pt" }}>
                        Few tips for buying an engagement ring
                      </span>
                    </u>
                  </strong>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    &nbsp;
                  </span>
                </u>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      Don’t get caught up in a trend.
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  An engagement ring should be a timeless, classic symbol of your love that
                  will last forever, so the goal should be to find the stone that is the
                  perfect match for your future fiancé. Look at their current jewelry to see
                  what would best suit his or her style. Are they a gold or a platinum
                  person?
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      A stone doesn’t have to be perfect on paper.
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  Diamond experts often site the “four cs” (aka color, cut, clarity, and
                  carat), but certificate grading should be just one of the many factors in
                  your decision-making. You don’t need a d flawless stone to create a
                  beautiful ring. It’s better to judge a stone by the feeling it gives you
                  rather than the grading it received. The grade can serve as a starting
                  point, but should not be the sole determining factor.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      Size matters only if you (or your future fiancé) think it
                    </span>
                  </em>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "12pt" }}>&nbsp;</span>
                  </em>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      matters.
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  Go big or go home shouldn’t be the mantra, unless you think it’s the most
                  important thing to your future spouse. In that case, weigh your options.
                  Perhaps placing more of an emphasis on size and less on color and clarity
                  is worth considering.
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      The setting shouldn’t be an afterthought.
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  After you’ve fallen in love with a stone, the next step is figuring out
                  what to put around it. You can be bold and do something different and
                  unique, but it is important that the ring reflect the style of the person
                  who will be wearing it." find an expert whom you trust, give them an idea
                  of what you want, and let them guide you in the right direction.
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      Don't be afraid to think outside the box and choose an entirely unique
                      ring.
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  Millennials want everything they buy to feel special, and for a ring's
                  vibe to match up with their own. It's becoming more common for women to
                  eschew diamonds and traditional settings entirely and opt for something
                  personal, unique and unexpected. People are yearning for something
                  different. People always want something that feels 'fashion' and relevant,
                  but also timeless—not basic, boring, or predictable.
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginLeft: 26 }}>
                <li>
                  <span style={{ fontFamily: "Wingdings", fontSize: "13pt" }}>Ø&nbsp;</span>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: "13pt" }}>
                      It's not about the price tag.
                    </span>
                  </em>
                </li>
              </ul>
              <p style={{ textAlign: "justify" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  During the depression, in a campaign that would’ve made don draper proud,
                  de beers' advertising geniuses started running an ad pushing men to spend
                  one month’s salary on a ring if they wanted to be "
                </span>
                <a href="http://www.bbc.com/news/magazine-27371208">
                  <u>
                    <span
                      style={{
                        fontFamily: "Calibri",
                        color: "rgb(0, 0, 255)",
                        textDecoration: "underline",
                        fontSize: 16,
                        background: "none"
                      }}
                    >
                      responsible.
                    </span>
                  </u>
                </a>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  " by the 1980s, it jumped up to two months. These days, the rule of thumb
                  that’s often referenced is that one should fork over at least three
                  months’ salary when purchasing this piece of forever jewelry. This is all
                  just clever marketing. The truth is there's no exact science when it comes
                  to how much to spend on an engagement ring, and some women&nbsp;
                </span>
                <em>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      fontStyle: "italic",
                      fontSize: 16,
                      background: "none"
                    }}
                  >
                    prefer
                  </span>
                </em>
                <span
                  style={{
                    fontFamily: "Calibri",
                    fontSize: 16,
                    background: "none"
                  }}
                >
                  &nbsp;smaller, less expensive diamonds.&nbsp;
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", paddingLeft: "0px", textAlign: "center", marginTop: '70px' }}>
                <li>
                  <span style={{ fontFamily: "Calibri", fontSize: "14pt" }}>2.&nbsp;</span>
                  <strong>
                    <span style={{ fontFamily: "Calibri", fontSize: "14pt" }}>
                      BASIC JEWELLERY CARE
                    </span>
                  </strong>
                </li>
              </ul>
              <p style={{ textAlign: "center" }}>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 19 }}>&nbsp;</span>
                </strong>
              </p>
              <p style={{ textAlign: "justify" }}>
                <strong>
                  <em>
                    <span
                      style={{ fontFamily: "Calibri", fontWeight: "bold", fontSize: 19 }}
                    >
                      Wearing jewellery
                    </span>
                  </em>
                </strong>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Jewellery is worn by many of people every day, you can preserve your
                  treasures by using some simple advanced planning and thought. Here are
                  some basic guidelines to consider when wearing jewellery:
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>I.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Remove jewellery during tasks/household activity
                  </span>
                </u>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  When performing manual tasks, remove your jewellery to prevent physical
                  damage or exposure to chemicals or cleaning fluids. Some tasks that should
                  be avoided when wearing jewellery include kitchen work, gardening,
                  cleaning the house and other common tasks.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>II.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Put on jewellery after applying makeup
                  </span>
                </u>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Cosmetics, hairspray, perfumes and lotion can contain chemicals that can
                  often damage jewellery. Putting jewellery on after applying these
                  materials will limit exposure to jewellery and any potential damage.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>III.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Don't wear jewellery in swimming pools and spas
                  </span>
                </u>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Chlorinated water can react with the metals found in jewellery causing
                  colour changes and even structural damage. As a result it's a good idea to
                  remove jewellery before entering the pool or spa.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>IV.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Don't mix contact sports and jewellery&nbsp;
                  </span>
                </u>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Hard blows during sports can damage jewellery not to mention the people
                  involved. All jewellery should be removed before play begins.
                </span>
              </p>

              <p style={{ textAlign: "justify", marginTop: "70px" }}>
                <strong>
                  <em>
                    <span
                      style={{ fontFamily: "Calibri", fontWeight: "bold", fontSize: 19 }}
                    >
                      Cleaning jewellery
                    </span>
                  </em>
                </strong>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  For those that wear jewellery regularly, keeping their jewellery clean,
                  shine and looking good requires regular effort. Here are some general
                  guidelines that may help.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>I.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Remove your jewellery before bathing
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Remove all jewellery before showering or cleaning. Soap can cause a film
                  to form, making it appear dull and dirty. By preventing the formation of
                  this film you immediately reduce the occasions of servicing.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>II.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Use jewellery polishing cloths for best results
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Polish silver or gold jewellery with a jewellery polishing cloth for best
                  results. You can use the professional cloths which is the best. Use of
                  tissue or paper towels can cause scratches because of fiber in these
                  products.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>III.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Clean your jewellery with care
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Cleaning your jewellery regularly can keep it looking good, but be
                  careful. You can either purchase commercial cleaners from a jeweller or
                  make a cleaning a solution yourself. Rubbing alcohol can work wonders, but
                  bleach can literally destroy jewellery so avoid it at all costs.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>IV.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Use warm water to clean jewellery
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Using warm water is the best, when cleaning your own jewellery. How water
                  can cause reaction with the cleaning fluids resulting in discolouration
                  and sterling silver is especially susceptible to this problem. Should this
                  occur, this problem can be remedied by buffing and the application of a
                  tarnish remover.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>V.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Avoid cleaning damaged jewellery
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Never clean any jewellery that is damaged, cracked or broken, since the
                  additional handling is likely to worsen the problem. If you find that a
                  piece of jewellery is damaged, it should be set aside for repair as soon
                  as possible.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>VI.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Inspect your jewellery regularly
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Just like anything else, an ounce of prevention is worth a pound of cure.
                  When having your jewellery professionally cleaned, it's a good idea to
                  have each item checked and inspected for any possible problems. Addressing
                  signs of damage, or loose gemstones will prevent any further damage or
                  loss and keep all of your pieces in excellent shape for years.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <strong>
                  <em>
                    <span
                      style={{ fontFamily: "Calibri", fontWeight: "bold", fontSize: 19 }}
                    >
                      Storing jewellery
                    </span>
                  </em>
                </strong>
              </p>
              <p style={{ textAlign: "justify" }}>
                <em>
                  <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
                </em>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  To improve the enjoyment of your jewellery, we've assembled these
                  suggestions that should keep your jewellery organized and orderly
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>I.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Keep your jewellry secure
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Store your jewellery in a container and prevent pieces from moving around.
                  While fabric-lined jewellery boxes are ideal, this can be as simple as
                  using a shoebox and pieces of fabric.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>II.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Prevent your jewellry from tarnishing
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Sometimes jewellery tarnishes and is not able to be worn, especially
                  silver and gold. To maintain the luster of your jewellery, place silver
                  anti-tarnish strips in your storage container to absorb the oxidants that
                  discolour and tarnish jewellery.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>III.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    Inventory your jewellery
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Unfortunately, jewellery can get lost or stolen. Taking a regular
                  inventory can be incredibly useful when making an insurance claim or
                  filing a police report. A photograph, a written physical description of
                  each piece and its cost is ideal. Furthermore, store that information
                  apart from your jewellery in the event it is taken too.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>IV.&nbsp;</span>
                <u>
                  <span
                    style={{
                      fontFamily: "Calibri",
                      textDecoration: "underline",
                      fontSize: 16
                    }}
                  >
                    When travelling with jewellery, use a case
                  </span>
                </u>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>:</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Travelling can be tough on jewellery, so it's wise to use a travel case to
                  protect your favourite pieces. Traditionally made of fabric or leather, a
                  jewellery travel case can carry jewellery of all types.
                </span>
              </p>

              <p style={{ textAlign: "justify", marginTop: '70px' }}>
                <strong>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: 19 }}>
                      Shipping jewellery
                    </span>
                  </em>
                </strong>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Shipping jewellery can cause a great deal of concern due to its high-value
                  nature. While there are a variety of carrier-specific guidelines, here are
                  some general rules of thumb that you can use to safely ship jewellery.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  I. Use two boxes: an inner box to hold the jewellery and an outer box for
                  shipping.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  II. Carefully pack the inner box to prevent the movement of the jewellery.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  II. Pack the shipping box with packing material to protect the inner box
                  during shipping.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  IV. Eliminate all information on the shipping box that refers to jewellery
                  or a jeweler&nbsp;
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>process.</span>
              </p>
              <ul style={{ listStyleType: "undefined", textAlign: 'center', marginTop: "70px", paddingLeft: "0px" }}>
                <li>
                  <span style={{ fontFamily: "Arial", fontSize: "14pt" }}>3.&nbsp;</span>
                  <strong>
                    <span style={{ fontFamily: "Arial", fontSize: "14pt" }}>
                      JEWELLERY CARE
                    </span>
                  </strong>
                </li>
              </ul>
              <p>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 19 }}>
                    Diamond jewellery care
                  </span>
                </strong>
                <span style={{ fontFamily: "Calibri", fontSize: 15 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Diamonds are tough but they aren’t indestructible. Below suggestion will
                  help you to clean and care for your diamond.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  A. Never wear your diamond while doing rough or hard work.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  B. Chlorine can damage and discolour your diamond jewellery. Keep your
                  diamond away from chlorine bleach or other household chemicals. You should
                  also remove your diamond jewellery before entering a chlorinated pool or
                  hot tub.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  C. Clean your diamonds regularly using jewellery cleaner, a mix of
                  ammonia and water, or a mild detergent. Dip the jewellery into the
                  solution and use a soft brush to wipe dust or dirt from under the setting.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  &nbsp;D. Avoid touching your clean diamonds with your fingers. Handle
                  clean jewellery by its edges.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
                </strong>
              </p>
              <p>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontWeight: "bold", fontSize: 19 }}>
                    Gold jewellery care
                  </span>
                </strong>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  Most of the jewellery is made of gold. Although it comes in various
                  purity, but the procedure to clean it remains the same.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  A. Gold jewellery should be removed before shower. This is because soap
                  can cause a film to form on gold jewellery, making it appear dull and
                  dirty.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  &nbsp;B. You will find many cleaners available in the market to clean your
                  gold jewellery at home. Soft cloth is a good option.
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  C. Avoid chlorine, as it is disastrous. At high temperatures, it can
                  permanently damage or discolour your gold jewellery. Do not wear gold
                  jewellery while using chlorine bleach or while in a pool or hot tub.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  D. You can remove tarnish by using soap and water mixed with a few drops
                  of ammonia. Carefully brush with a soft bristle brush. After the brushing,
                  simply rinse with lukewarm water and allow drying.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  E. Grease can be removed from gold jewellery by dipping the jewellery into
                  plain rubbing alcohol.
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 19 }}>&nbsp;</span>
              </p>
              <p>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontWeight: "bold", fontSize: 19 }}>
                    Colour stone jewellery care
                  </span>
                </strong>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  There are some general care and cleaning rules that apply to all coloured
                  gemstone jewellery.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  A. After wearing, wipe your precious gemstone jewellery thoroughly with a
                  clean soft, slightly wet/moist cloth. This will enhance the gemstone's
                  luster and ensure that your jewellery is clean before storage.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  B. Store gemstone pieces individually in soft pouches.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  C. Do not expose your precious gemstone pieces to salt water or harsh
                  chemicals, such as chlorine or detergents. These chemicals may slowly
                  erode the finish and polish of gemstones.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  D. Hair spray, perfume and perspiration may cause jewellery to become
                  dull.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  E. Wear jewellery after applying cosmetics.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>&nbsp;</span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  F. If you have an active lifestyle, take extra precautions with some types
                  of gemstone jewellery. Emeralds, for example, are brittle and should not
                  be worn when doing household tasks or any other activity where the stone
                  could be hit or damaged.
                </span>
              </p>
              <p style={{ textAlign: "justify" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  <br />
                </span>
                <span style={{ fontFamily: "Calibri", fontSize: 16 }}>
                  G. Be extra careful with ultrasonic cleaners. Some gemstones are fragile
                  and can be damaged by ultrasonic cleaners.
                </span>
              </p>
              <ul style={{ listStyleType: "undefined", marginTop: "70px", paddingLeft: "0px", textAlign: 'center' }}>
                <li>
                  <span style={{ fontFamily: "Calibri", fontSize: "14pt" }}>4.&nbsp;</span>
                  <span style={{ fontFamily: "Calibri", fontSize: "14pt" }}>
                    CONVERSION CHART
                  </span>
                </li>
              </ul>
              <p style={{ marginLeft: "18pt", textAlign: "justify", textAlign: "center" }}>
                <span
                  style={{
                    fontFamily: "Calibri",
                    color: "rgb(0, 0, 0)",
                    fontSize: 15,
                    background: "none"
                  }}
                >
                  See below for sizing information related to bracelets/bangles, rings and
                  necklaces. If you have any questions about determining your size.
                </span>
              </p>
              <ul classname='text_center' style={{ listStyleType: "undefined", paddingLeft: "0px", textAlign: "center" }}>
                <li>
                  <u>
                    <span
                      style={{
                        fontFamily: "Calibri",
                        textDecoration: "underline",
                        fontSize: "16pt"
                      }}
                    >
                      Gold purity conversion chart
                    </span>
                  </u>
                </li>
              </ul>
              <table
                style={{
                  borderCollapse: "collapse",
                  marginLeft: "-0.6pt",
                  border: "none",
                  display: 'flex',
                  justifyContent: "center",
                  width: "100%",

                }}
              >
                <tbody style={{ border: "1px solid black" }}>
                  <tr>
                    <td
                      style={{
                        padding: "6pt 6pt 6pt 6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(91, 91, 91)",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Number of karats
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt 6pt 6pt 6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(91, 91, 91)",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Parts of gold
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt 6pt 6pt 6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(91, 91, 91)",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            % of gold purity
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt 6pt 6pt 6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(91, 91, 91)",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Fineness
                          </span>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderWidth: "initial",
                        borderStyle: "none",
                        borderColor: "initial",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          8k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderWidth: "initial",
                        borderStyle: "none",
                        borderColor: "initial",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          8/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderWidth: "initial",
                        borderStyle: "none",
                        borderColor: "initial",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          33.3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderWidth: "initial",
                        borderStyle: "none",
                        borderColor: "initial",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          333
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          9k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          9/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          37.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          375
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          10k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          10/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          41.7
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          416/417
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          12k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          12/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          50.0
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          500
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          14k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          14/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          58.3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          583/585
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          15k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          15/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          62.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          625
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          18k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          18/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          75.0
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          750
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          20k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          20/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          83.3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          833
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          21k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          21/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          87.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          875
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          22k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          22/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          91.7
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "none",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          916/917
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "rgb(243, 243, 243)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          24k
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "rgb(243, 243, 243)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          24/24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "rgb(243, 243, 243)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          99.9
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "none",
                        background: "rgb(243, 243, 243)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "12pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(91, 91, 91)",
                            fontSize: 14
                          }}
                        >
                          999
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ textAlign: "center" }}>
                <strong>
                  <em>
                    <span style={{ fontFamily: "Calibri", fontSize: 37 }}>&nbsp;</span>
                  </em>
                </strong>
              </p>
              <p style={{ textAlign: "center" }}>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 21 }}>&nbsp;</span>
                </strong>
              </p>
              <ul style={{ listStyleType: "undefined", paddingLeft: "0px", textAlign: "center" }}>
                <li>
                  <u>
                    <span
                      style={{
                        fontFamily: "Calibri",
                        textDecoration: "underline",
                        fontSize: "16pt"
                      }}
                    >
                      International ring size conversion chart
                    </span>
                  </u>
                </li>
              </ul>
              <table
                cellSpacing={2}
                style={{
                  border: "none",
                  background: "rgb(232, 232, 225)",
                  width: '100%',
                  display: "flex",
                  justifyContent: 'center'
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(254, 243, 249)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(0, 0, 0)",
                              fontWeight: "bold",
                              fontSize: 16
                            }}
                          >
                            Inside diameter mm
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(254, 243, 249)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(0, 0, 0)",
                              fontWeight: "bold",
                              fontSize: 16
                            }}
                          >
                            Inside diameter inches
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(254, 243, 249)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(0, 0, 0)",
                              fontWeight: "bold",
                              fontSize: 16
                            }}
                          >
                            Usa canada mexico ring size
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(254, 243, 249)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(0, 0, 0)",
                              fontWeight: "bold",
                              fontSize: 16
                            }}
                          >
                            Uk ireland australia new zealand south africa ring size
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(254, 243, 249)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(0, 0, 0)",
                              fontWeight: "bold",
                              fontSize: 16
                            }}
                          >
                            Germany france ring size
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(254, 243, 249)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(0, 0, 0)",
                              fontWeight: "bold",
                              fontSize: 16
                            }}
                          >
                            Spain italy ring size
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(254, 243, 249)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              color: "rgb(0, 0, 0)",
                              fontWeight: "bold",
                              fontSize: 16
                            }}
                          >
                            Japan china india south america ring size
                          </span>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          15 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.59
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          4
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          H
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          46.8
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          6,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          7
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          15.3 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.60
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          4.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          I
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          48
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          8
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          8
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          15.6 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.62
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          J
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          49.3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          9,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          9
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          16.2 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.63
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          5.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          K
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          50.6
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          10,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          10
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          16.6 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.65
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          6
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          L
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          51.9
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          12
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          11
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          16.9 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.67
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          6.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          M
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          53.1
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          13,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          13
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          17.2 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.68
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          7
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          N
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          54.4
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          14,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          14
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          17.8 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.70
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          7.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          O
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          55.7
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          16
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          15
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          18.1 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.71
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          8
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          P
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          57
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          17
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          16
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          18.5 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.73
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          8.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          Q
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          58.3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          18,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          17
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          19.1 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.75
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          9
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          R
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          59.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          20
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          18
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          19.4 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.76
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          9.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          S
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          60.8
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          21
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          19
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          19.7 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.78
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          10
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          T
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          62.1
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          22,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          20
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          20.4 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.79
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          10.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          U
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          63.4
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          23,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          22
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          20.7 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.81
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          11
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          V
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          64.6
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          25
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          23
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          21.0 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.83
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          11.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          W
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          65.9
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          26
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          24
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          21.6 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.84
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          12
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          X
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          67.2
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          27,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          25
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          22.0 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.86
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          12.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          Y
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          68.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          29
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          26
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          22.3 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.87
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          13
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          Z
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          69.7
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          30
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          27
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          22.9 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.89
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          13.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          Z+2
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          71
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          32
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          -
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          23.2 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.91
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          14
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          Z+3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          72.3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          33
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          -
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          23.6 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.92
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          14.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          Z+4
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          73.6
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          34,5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "none"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          -
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          24.0 mm
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          0.94
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          15
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          Z+5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          74.8
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          35
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "3pt 3pt 3pt 3pt",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderBottom: "none",
                        background: "rgb(242, 242, 242)"
                      }}
                    >
                      <p style={{ marginBottom: "0pt", textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: "Arial",
                            color: "rgb(0, 0, 0)",
                            fontSize: 16
                          }}
                        >
                          -
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ textAlign: "center" }}>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 21 }}>&nbsp;</span>
                </strong>
              </p>
              <p style={{ textAlign: "center" }}>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 21 }}>&nbsp;</span>
                </strong>
              </p>
              <p style={{ textAlign: "center" }}>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 21 }}>&nbsp;</span>
                </strong>
              </p>
              <ul style={{ listStyleType: "undefined", paddingLeft: "0px", textAlign: "center" }}>
                <li>
                  <u>
                    <span
                      style={{
                        fontFamily: "Calibri",
                        textDecoration: "underline",
                        fontSize: "16pt"
                      }}
                    >
                      Bangle size chart
                    </span>
                  </u>
                </li>
              </ul>
              <table
                style={{
                  borderCollapse: "collapse",
                  width: '100%',
                  display: 'flex',
                  justifyContent: "center",
                  border: "none"
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "1pt outset windowtext",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Bangle size
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        width: "213.7pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "1pt outset windowtext",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Circumference
                          </span>
                        </strong>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            <br />
                          </span>
                        </strong>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            (total length &nbsp;of paper / thread)
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      colSpan={2}
                      style={{
                        width: "273.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "1pt outset windowtext",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Diameter
                          </span>
                        </strong>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            <br />
                          </span>
                        </strong>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            (total length &nbsp;of paper / thread)
                          </span>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          &nbsp;
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Inches
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Mm
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "1pt outset windowtext",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Inches
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "1pt outset windowtext",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: "Arial",
                              fontWeight: "bold",
                              fontSize: 14
                            }}
                          >
                            Mm
                          </span>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 - 2 (2 2/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>6.67</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>169.4</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>2.125</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>54.0</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 - 4 (2 4/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>7.06</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>179.6</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>2.250</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>57.2</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 - 6 (2 6/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>7.46</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>189.5</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>2.375</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>60.3</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 - 8 (2 8/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>7.85</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>199.4</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>2.500</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>63.5</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 - 10 (2 10/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>8.24</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>209.3</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>2.625</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>66.7</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 - 12 (2 12/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>8.64</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>219.5</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>2.750</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>69.9</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 - 14 (2 14/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>9.03</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>229.4</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>2.875</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>73.0</span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "100.85pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt outset windowtext",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>
                          2 -16 (2 16/16")
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "99.75pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>9.42</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "113.95pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>239.3</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "135.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>3.000</span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "138pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt outset windowtext",
                        borderTop: "none",
                        borderBottom: "1pt outset windowtext"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "Arial", fontSize: 14 }}>76.2</span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ul style={{ listStyleType: "undefined", marginTop: "70px", paddingLeft: '0px', textAlign: "center" }}>
                <li>
                  <u>
                    <span
                      style={{
                        fontFamily: "Calibri",
                        textDecoration: "underline",
                        fontSize: "16pt"
                      }}
                    >
                      Bracelet size chart
                    </span>
                  </u>
                </li>
              </ul>
              <table
                style={{
                  borderCollapse: "collapse",
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  border: "none"
                }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "1pt solid rgb(204, 204, 204)",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none",

                      }}
                    >
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Wrist size
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          <br />
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          (inches)
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "1pt solid rgb(204, 204, 204)",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Wrist size
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          <br />
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          (cm)
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "1pt solid rgb(204, 204, 204)",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Women's
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          <br />
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          bracelet size
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "1pt solid rgb(204, 204, 204)",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Men's
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          <br />
                        </span>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          bracelet size
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          5-5.5''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          12.7-14.0
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          X-small
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          5.5-6''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          14.0-15.2
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Small
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          6-6.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          15.2-16.5
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Medium
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          6.5-7''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          16.5-17.8''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Large
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Small
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          7-7.5''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          17.8-19
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          X-large
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Medium
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          7.5-8''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          19.0-20.3
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          2x-large
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          Large
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          8-8.5''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          20.3-21.6
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          3x-large
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          X-large
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          8.5-9''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          21.6-22.9
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          2x-large
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "134.3pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          9-9.5''
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "170.1pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          22.9-24.1
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "124.6pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          &nbsp;
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "116.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 18
                          }}
                        >
                          3x-large
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ul style={{ listStyleType: "undefined", paddingLeft: "0px", textAlign: 'center', marginTop: "70px" }}>
                <li>
                  <u>
                    <span
                      style={{
                        fontFamily: "Calibri",
                        textDecoration: "underline",
                        fontSize: "16pt"
                      }}
                    >
                      Necklace size chart
                    </span>
                  </u>
                </li>
              </ul>
              <table
                style={{
                  borderCollapse: "collapse",
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  border: "none"
                }}
              >
                <tbody>
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        width: "283.5pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "1pt solid rgb(204, 204, 204)",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          Necklace s
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "1pt solid rgb(204, 204, 204)",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          Sizing chart
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          Size
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          Size
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          (in)
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          (cm)
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          16
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          40.64
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          18
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          45.72
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          20
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          50.8
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          24
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          60.96
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          32
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          81.28
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          34
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          86.36
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          36
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          91.44
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "115.15pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "1pt solid rgb(204, 204, 204)",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          48
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "168.35pt",
                        padding: "0pt 0pt 0pt 0pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(204, 204, 204)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(204, 204, 204)",
                        background: "none"
                      }}
                    >
                      <p style={{ textAlign: "center" }}>
                        <span
                          style={{
                            fontFamily: '"Gt Wals"',
                            color: "rgb(0, 0, 0)",
                            fontSize: 14
                          }}
                        >
                          121.92
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>

              <p style={{ textAlign: "center", marginTop: "70px" }}>
                <strong>
                  <span style={{ fontFamily: "Calibri", fontSize: 19 }}>
                    Different diamond shape sizes:
                  </span>
                </strong>
              </p>
              <p>
                <span style={{ fontFamily: "Calibri", fontSize: 15 }}>&nbsp;</span>
              </p>
              <p style={{ marginTop: "15pt", background: "none", textAlign: "center" }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  ROUND&nbsp;
                </span>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.0025 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.005 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.15 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.0067 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.0075 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.01 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.01 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.015 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.02 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.025 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.03 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.04 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.06 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.08 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.11 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.14 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.17 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.28 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.36 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.44 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.0 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.56 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.66 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.84 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.93 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.30 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.67 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.11 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.43 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.1 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.35 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.61 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.87 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.16 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.41 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.57 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.91 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.49 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.85 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.84 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.26 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.36 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.52 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.51 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.53 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.49 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.89 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16.06 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: 'center', marginTop: "70px" }}>
                <span style={{ fontFamily: "Calibri", fontSize: 15 }}>&nbsp;</span>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;RADIANT
                </span>
              </p>
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5x3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.31 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.5x3.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.34 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6x3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.41 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6x4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5x4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7x5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.3x5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5x5.8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8x6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5x6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9x7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.5x7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10x7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.31 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.05 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.06 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11.5x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.45 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.54 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.79 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.47 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.33 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13.5x11.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.19 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15x11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11.48 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.14 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14.22 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: 'center', marginTop: "70px" }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;PRINCESS
                </span>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.015 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.03 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.06 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.08 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.10 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.13 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.18 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.26 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.29 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.31 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.39 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.44 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.64 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.90 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.11 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.39 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.01 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.74 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.24 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.67 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.10 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.12 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.09 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.36 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.62 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.76 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.99 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.44 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.44 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.52 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: "center", marginTop: '70px' }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;PEAR&nbsp;
                </span>
              </p>
              <div style={{ display: 'flex', justifyContent: "center" }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3x2 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.13 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4x2.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.18 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4x3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5x3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5x4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.35 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6x4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5x4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.60 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7x5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5x5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.85 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.7x5.7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8x6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5x6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10x6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.71 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.7x6.7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.80 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9x7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11x7.50 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.61 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.98 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.12 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.44 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.47 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.11 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.06 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.41 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.65 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.86 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.27 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            17x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.46 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15x11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.36 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            18x11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.14 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.99 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            18x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.35 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            18x13 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: 'center', marginTop: "70px" }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;OVAL
                </span>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.5x3.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5x3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.5x3.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.33 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5x4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.35 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6x4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6x5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.61 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5x4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.65 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7x5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.7x5.7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8x6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9x6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.41 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5x6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9x7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.5x8.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.88 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.85 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.05 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.81 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.05 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.76 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.32 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16x14 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11.88 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            18x13 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.86 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            20x15 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14.96 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: "center", marginTop: "70px" }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;MARQUISE &nbsp;
                </span>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}><table
                style={{
                  borderCollapse: "collapse",
                  width: "416.25pt",
                  marginLeft: "-0.6pt",
                  border: "none"
                }}
              >
                <tbody>
                  <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1.5pt solid rgb(221, 221, 221)",
                        verticalAlign: "bottom"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: '"Times New Roman"',
                              color: "rgb(28, 99, 146)",
                              fontWeight: "bold",
                              fontSize: 15
                            }}
                          >
                            MM Size
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1.5pt solid rgb(221, 221, 221)",
                        verticalAlign: "bottom"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: '"Times New Roman"',
                              color: "rgb(28, 99, 146)",
                              fontWeight: "bold",
                              fontSize: 15
                            }}
                          >
                            Carat Weight
                          </span>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderColor: "rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3x1.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.025 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.5x1.75 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.065 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.5x2 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.07 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          4x2 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.10 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.75x1.75 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.11 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          4.25x2.25 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.12 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          5x2.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.14 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          5.5x2.75 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.16 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          5.5x3 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.18 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          5x3 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.20 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          6.5x3 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.23 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          6x3 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.25 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          7x3 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.30 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          7.5x3.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.33 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          7x4 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.34 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          8x4 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.50 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          8.75x4.25 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.70 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          9x4.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.75 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1.5pt solid rgb(221, 221, 221)",
                        verticalAlign: "bottom"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: '"Times New Roman"',
                              color: "rgb(28, 99, 146)",
                              fontWeight: "bold",
                              fontSize: 15
                            }}
                          >
                            MM Size
                          </span>
                        </strong>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1.5pt solid rgb(221, 221, 221)",
                        verticalAlign: "bottom"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <strong>
                          <span
                            style={{
                              fontFamily: '"Times New Roman"',
                              color: "rgb(28, 99, 146)",
                              fontWeight: "bold",
                              fontSize: 15
                            }}
                          >
                            Carat Weight
                          </span>
                        </strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderWidth: "1pt",
                        borderStyle: "solid",
                        borderColor: "rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          9.5x4.7 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "1pt solid rgb(221, 221, 221)",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          0.85 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          10x5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          1.00 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          11x5.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          1.25 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          11.5x6 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          1.33 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          12x6 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          1.50 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          13x6.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          2.00 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          14x7 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          2.50 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          15x7 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.00 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          14x8 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.00 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          15x7.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.25 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          15x8 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.44 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          16x8 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          3.86 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          16.5x8.25 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          4.00 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          17x8.5 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          4.88 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          17.5x10 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          5.50 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          20x8 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          7.08 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          20x10 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        background: "rgb(249, 249, 249)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          7.94 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "1pt solid rgb(221, 221, 221)",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          20x11 mm.
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        padding: "6pt",
                        borderLeft: "none",
                        borderRight: "1pt solid rgb(221, 221, 221)",
                        borderTop: "none",
                        borderBottom: "1pt solid rgb(221, 221, 221)",
                        verticalAlign: "top"
                      }}
                    >
                      <p style={{ marginBottom: "15pt" }}>
                        <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                          9.50 ct.
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table></div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: 'center', marginTop: "70px" }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;HEART&nbsp;
                </span>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.18 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.28 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.34 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.75 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.38 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.61 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.83 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              &nbsp;
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              &nbsp;
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.41 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.66 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.88 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.38 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10.79 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13.27 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            18 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            15.33 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: 'center', marginTop: '70px' }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 15 }}
                >
                  &nbsp;&nbsp;
                </span>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  CUSHION&nbsp;
                </span>
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.2 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.40 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.25 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.12 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.09 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.62 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.44 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.52 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.66 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p style={{ marginTop: "15pt", background: "none", textAlign: 'center', marginTop: '70px' }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;EMERALD&nbsp;
                </span>
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3x2 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.10 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.5x2 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.12 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4x2 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.15 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4x3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.20 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5x3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.29 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.5x3.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.46 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6x4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5x4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.7x4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.88 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7x5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.3x5.3 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5x5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8x6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5x6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9x7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10x7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.5x7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.79 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.21 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.34 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.38 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.48 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13x11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.13 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11.26 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            16x12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            14.22 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: "15pt", background: "none", textAlign: "center", marginTop: "70px" }}>
                <span
                  style={{ fontFamily: "inherit", color: "rgb(85, 85, 85)", fontSize: 30 }}
                >
                  &nbsp;ASSCHER&nbsp;
                </span>
              </p>
              <div style={{ display: "flex", justifyContent: 'center', marginBottom: '100px' }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "416.25pt",
                    marginLeft: "-0.6pt",
                    border: "none"
                  }}
                >
                  <tbody>
                    <tr style={{ border: "1px solid rgb(221, 221, 221)" }}>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.39 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            0.75 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.25 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            6.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            1.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            2.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              MM Size
                            </span>
                          </strong>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1.5pt solid rgb(221, 221, 221)",
                          verticalAlign: "bottom"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <strong>
                            <span
                              style={{
                                fontFamily: '"Times New Roman"',
                                color: "rgb(28, 99, 146)",
                                fontWeight: "bold",
                                fontSize: 15
                              }}
                            >
                              Carat Weight
                            </span>
                          </strong>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderWidth: "1pt",
                          borderStyle: "solid",
                          borderColor: "rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "1pt solid rgb(221, 221, 221)",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.00 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            8.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            3.50 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            4.12 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.5 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.09 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            10 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            5.62 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            11 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            7.44 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          background: "rgb(249, 249, 249)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            9.52 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "1pt solid rgb(221, 221, 221)",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            13 mm.
                          </span>
                        </p>
                      </td>
                      <td
                        style={{
                          padding: "6pt",
                          borderLeft: "none",
                          borderRight: "1pt solid rgb(221, 221, 221)",
                          borderTop: "none",
                          borderBottom: "1pt solid rgb(221, 221, 221)",
                          verticalAlign: "top"
                        }}
                      >
                        <p style={{ marginBottom: "15pt" }}>
                          <span style={{ fontFamily: '"Times New Roman"', fontSize: 15 }}>
                            12.66 ct.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px',backgroundColor:"#C0BBB1" ,color:"white" }}>
          <p style={{ margin: '0px', fontWeight: 500, width: '100px', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>BACK TO TOP</p>
        </div>
      </div>
    </div>
  )
}

export default ExpertAdvice;