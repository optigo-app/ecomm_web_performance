import React, { useEffect, useState } from "react";
import "./AboutUs.modul.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import { FaPlay } from "react-icons/fa6";

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

  const aboutData = [
    {
      title: "Our DNA",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
    {
      title: "PXPL Values",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
  ]

  const valuesData = [
    {
      title: "Authenticity.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
    {
      title: "Simplicity.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
    {
      title: "Drive.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
    {
      title: "Adventure.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
    {
      title: "Mindfulness.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
    {
      title: "Appreciation.",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac sollicitudin velit.",
    },
  ];

  const banner = `${storImagePath()}/images/static/about1.jpeg`;
  // const banner = `${storImagePath()}/images/static/about2.jpg`;

  return (
    <ShreeDiamonds banner={banner} />
  );
}


const ShreeDiamonds = ({ banner }) => {
  return (
    <div className="malkan_contactMain_about">
      <main className="malkan_sp-service-policy">
        <div className="content_malkana">
          <div className="title">
            <h2>About US</h2>
          </div>
          <div className="malkan_sp-about-us">
            <section className="malkan_sp-hero">
              <img
                src={banner}
                alt="People working on laptops"
                className="malkan_sp-hero__image"
              />
              {/* <div className="malkan_sp-hero__overlay">
                <div className="text-center">
                  <h1 className="malkan_sp-hero__title">
                    It's not our work life, it's our life's work.
                  </h1>
                  <button
                    className="malkan_sp-hero__button"
                    aria-label="Play video"
                  >
                    <FaPlay className="malkan_sp-hero__icon" />
                  </button>
                </div>
              </div> */}
            </section>

            <section className="malkan_sp-dna">
              <h2 className="malkan_sp-dna__title">
                WELCOME TO SHREE DIAMOND</h2>
              <p className="malkan_sp-dna__description" style={{ textAlign: 'justify' }}>
                There are a lot of agencies that do what we do. They share the
                same what and how, but our partners work with us for our why and
                our who. We're minds and makers with business sense and creative
                chops, set out to connect people with what matters most — the
                experience. And we spend each day doing so by sharpening the
                tools of the digital trade.

                Shree Diamond is your one-stop for premium diamond jewellery. We offer a wide range of diamond jewellery, crafted with the best quality diamonds. Our collection includes beautiful rings, earrings, pendants, and other diamond-studded pieces. Whether you are looking for a special treat for yourself or a unique gift for someone special, we have something for every occasion.
                We are passionate about providing our customers with the best diamond jewellery experience. We use the latest technology to provide a safe and secure online shopping experience. All of our diamonds are authenticated and certified by the top gemological labs in the industry.
                At Shree Diamond, we make sure that our customers get the best value for their money. We are committed to providing the highest quality diamond jewellery at the most competitive prices. We offer free shipping and flexible payment plans for our customers.
                Browse our online store to discover beautiful diamond jewellery that will make a statement. Let us help you find the perfect piece of diamond jewellery that will bring a spark.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

const Sonsons = ({ banner, aboutData, valuesData }) => {
  return (
    <div className="malkan_contactMain_about">
      <main className="malkan_sp-service-policy">
        <div className="content_malkana">
          <div className="title">
            <h2>{"About Us"}</h2>
          </div>

          <div className="malkan_sp-about-us">
            <section className="malkan_sp-hero">
              <img
                src={banner}
                alt="People working on laptops"
                className="malkan_sp-hero__image"
              />
            </section>

            <section className="malkan_sp-dna">
              <h2 className="malkan_sp-dna__title">{aboutData?.[0]?.title}</h2>
              <p className="malkan_sp-dna__description">
                {aboutData[0].description}
              </p>
            </section>

            <section className="malkan_sp-values">
              <h2 className="malkan_sp-values__title">{aboutData?.[1]?.title}</h2>
              <p className="malkan_sp-values__description">
                {aboutData[1].description}
              </p>
              <div className="malkan_sp-values__list">
                {valuesData.map((value, index) => (
                  <div key={index} className="malkan_sp-value">
                    <h3 className="malkan_sp-value__title">{value.title}</h3>
                    <p className="malkan_sp-value__description">{value.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

const Kamalika = ({ banner }) => {
  return (
    <div className="malkan_contactMain_about">
      <main className="malkan_sp-service-policy">
        <div className="content_malkana">
          <div className="title">
            <h2>About US</h2>
          </div>
          <div className="malkan_sp-about-us">
            <section className="malkan_sp-hero">
              <img
                src={banner}
                alt="People working on laptops"
                className="malkan_sp-hero__image"
              />
            </section>

            <section className="malkan_sp-dna">
              <p className="malkan_sp-dna__description" style={{ textAlign: 'justify' }}>
                Kamalika Jewellers, beacon of elegance and innovation in the realm of jewellery, was founded in 2008 by Mr. Bharat Bhushan Aggarwal , an visionary and industrialist. From its humble beginning  to open first office in Surat in 2008, the brand has evolved into at triumvirate of excellence with three offices in Surat , Jaipur , Ludhiana (fountain chowk). We provide customized jewellery to fit clients taste, in everchanging designing world we create modern designs which are relevant and timeless. Destined to be cherished by generations to come. Every piece is truly breathing design, manufactured by fascinating craftsmanship and is high on quality and purity. Our prime focus is  imaginative integration of customer choice, keeping rich Indian traditions and cultural heritage intact.Offering 100% buy back guarantee with hallmarked of 22kt , 18kt and 14kt gold purities with competitive price matching international standard and we are committed to customer satisfaction.
              </p>
              <p style={{ fontSize: "18px", fontWeight: "bold" }}>Bharat Bhushan Aggarwal</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}