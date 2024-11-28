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

  const banner = `${storImagePath()}/images/static/about1.jpeg`;

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
              <h2 className="malkan_sp-dna__title">Our DNA</h2>
              <p className="malkan_sp-dna__description">
                There are a lot of agencies that do what we do. They share the
                same what and how, but our partners work with us for our why and
                our who. We're minds and makers with business sense and creative
                chops, set out to connect people with what matters most — the
                experience. And we spend each day doing so by sharpening the
                tools of the digital trade.
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
