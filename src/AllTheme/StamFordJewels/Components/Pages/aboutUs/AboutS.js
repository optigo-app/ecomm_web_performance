// Abouts us 1

/*import React from "react";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";

const data = [
  {
    title: "Lorem ipsum dolor sit amet",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    img: `${storImagePath()}/about/2.png`,
  },
  {
    title: "Lorem ipsum dolor sit amet",
    desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    img: `${storImagePath()}/about/4.png`,
  },
  {
    title: "Lorem ipsum dolor sit amet",
    desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    img: `${storImagePath()}/about/4.png`,
  },
];
const AboutBanner =    `${storImagePath()}/about/1.png`;
const AboutLastBanner =    `${storImagePath()}/about/22.jpg`;

const AboutS = () => {
  return (
    <div className="stam_about_l">
      <div className="bgimage_banner_stam">
        <img src={AboutBanner} alt="" />
      </div>
      <div className="desc_stam_ford_p">
        <p>
          Lorem, ipsum dolor sit amet dolorum iure id veniam asperiores
          dignissimos quas. Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Praesentium, debitis? Lorem ipsum dolor amet consectetur.{" "}
        </p>
      </div>
      <div className="grid_layout_stam_about">
        {data?.map(({ desc, img, title, left }, idx) => {
          return <div className="stam_grid_card">
            <div className="left_stam_banner">
                <img src={img} alt="" />
            </div>
            <div className="right_det_stam">
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
          </div>;
        })}
      </div>
      <div className="card_list_stamford">
        {Array.from({length:4}).map((val,i)=>{
            return  <div class="stam_card">
          <div className="details_Stame">
          <h2>Lorem ipsum dolor.</h2>
              <ul>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                </ul> 
          </div>
        </div>
        })}
      </div>
      <div className="bgimage_banner_stam_last" >
        <img src={AboutLastBanner} alt="" style={{
            objectFit:"cover"
        }}/>
      </div>
    </div>
  );
};

export default AboutS;
*/





// About us 2

/*
import React, { useEffect, useState } from "react";
import "./AboutUs.modul.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";

export default function AboutUs() {

  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/html/About.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error("Error fetching the HTML file:", error);
      });
  }, []);

  const banner = `${storImagePath()}/images/HomePage/Aboutus/about1.jpg`;

  return (
    <div className="stam_contactMain_about">
      <main className="stam_sp-service-policy">
        <div className="content_stam">
          <div className="title">
            <h2>About US</h2>
          </div>
          <div className="stam_sp-about-us">
            <section className="stam_sp-hero">
              <img
                src={banner}
                alt="People working on laptops"
                className="stam_sp-hero__image"
              />
            </section>

            <section className="stam_sp-dna">
              <h2 className="stam_sp-dna__title">
                OUR DNA</h2>
              <p className="stam_sp-dna__description">
                There are a lot of agencies that do what we do. They share the
                same what and how, but our partners work with us for our why and
                our who. We're minds and makers with business sense and creative
                chops, set out to connect people with what matters most — the
                experience. And we spend each day doing so by sharpening the
                tools of the digital trade.
              </p>
            </section>

            <section className="stam_sp-values">
              <h2 className="stam_sp-values__title">PXPL Values</h2>
              <p className="stam_sp-values__description">
                This is the fabric of our culture and the framework for all
                decisions made within these walls. Heads up, they tend to be
                contagious.
              </p>
              <div className="stam_sp-values__list">
                {[
                  {
                    title: "Authenticity.",
                    description: "To be genuine, be vulnerable.",
                  },
                  {
                    title: "Simplicity.",
                    description: "Distill to the meaningful and balanced.",
                  },
                  { title: "Drive.", description: "Do what you love." },
                  {
                    title: "Adventure.",
                    description: "Take risks and embrace where they take you.",
                  },
                  {
                    title: "Mindfulness.",
                    description:
                      "Exercise a nuanced, articulate understanding.",
                  },
                  { title: "Appreciation.", description: "Dwell on the good." },
                ].map((value, index) => (
                  <div key={index} className="stam_sp-value">
                    <h3 className="stam_sp-value__title">{value.title}</h3>
                    <p className="stam_sp-value__description">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
*/




// Abouts us 3

import React, { useEffect, useState } from 'react'
import './AboutUs.modul.scss'
import { storImagePath } from '../../../../../utils/Glob_Functions/GlobalFunction';
import Footer from '../Home/Footer/Footer';

export default function AboutS() {

  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    fetch(`${storImagePath()}/html/StamfordAbout.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error('Error fetching the HTML file:', error);
      });
  }, []);

  return (
    <div className='satm_about_mainDiv'>
      <div className='daimondsEveryAbout'>
        <div className='smr_daimondsEveryAbout_sub' style={{ paddingBottom: '80px', minHeight: '400px' }}>
          <div className='stam_aboutus_div'>
            <div className='stam_aboutus_image_div'>
              <img src={`${storImagePath()}/images/HomePage/Aboutus/ab2.webp`} alt="" />
            </div>
            <div className='stam_aboutus_desc_div'>
              <div className='stam_aboutus_desc'>
                <h1 className='stam_desc_header'>Abouts us</h1>
                <span>Sample Headline</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio magni doloribus amet! Esse tenetur, quos architecto corrupti quis similique ipsa rem, vero optio laudantium quae quidem in perspiciatis maiores vel possimus velit voluptas hic et. Laboriosam velit libero quidem minus accusantium, at quia nulla exercitationem, odio totam iure ipsam ducimus.</p>
              </div>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div>
    </div>
  )
}