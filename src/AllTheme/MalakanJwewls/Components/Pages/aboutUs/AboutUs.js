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

  // const banner = `${storImagePath()}/images/static/about1.jpeg`;
  const banner = `${storImagePath()}/images/static/about2.jpg`;

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
                Our DNA</h2>
              {/* WELCOME TO SHREE DIAMOND</h2> */}
              <p className="malkan_sp-dna__description">
                There are a lot of agencies that do what we do. They share the
                same what and how, but our partners work with us for our why and
                our who. We're minds and makers with business sense and creative
                chops, set out to connect people with what matters most — the
                experience. And we spend each day doing so by sharpening the
                tools of the digital trade.

                {/* Shree Diamond is your one-stop for premium diamond jewellery. We offer a wide range of diamond jewellery, crafted with the best quality diamonds. Our collection includes beautiful rings, earrings, pendants, and other diamond-studded pieces. Whether you are looking for a special treat for yourself or a unique gift for someone special, we have something for every occasion.
                We are passionate about providing our customers with the best diamond jewellery experience. We use the latest technology to provide a safe and secure online shopping experience. All of our diamonds are authenticated and certified by the top gemological labs in the industry.
                At Shree Diamond, we make sure that our customers get the best value for their money. We are committed to providing the highest quality diamond jewellery at the most competitive prices. We offer free shipping and flexible payment plans for our customers.
                Browse our online store to discover beautiful diamond jewellery that will make a statement. Let us help you find the perfect piece of diamond jewellery that will bring a spark */}


              </p>
            </section>

            <section className="malkan_sp-values">
              <h2 className="malkan_sp-values__title">PXPL Values</h2>
              <p className="malkan_sp-values__description">
                This is the fabric of our culture and the framework for all
                decisions made within these walls. Heads up, they tend to be
                contagious.
              </p>
              <div className="malkan_sp-values__list">
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
                  <div key={index} className="malkan_sp-value">
                    <h3 className="malkan_sp-value__title">{value.title}</h3>
                    <p className="malkan_sp-value__description">
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
