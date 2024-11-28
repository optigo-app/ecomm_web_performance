import React, { useEffect, useState } from "react";
import "./AboutUs.modul.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";
import Footer from "../Home/Footer/Footer";

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

  return (
    <div className="forevery_main">
      <div
        className="head"
        style={{
          background: `url(${storImagePath()}/Forevery/static/banner-bg.png)`,
        }}
      >
        <h1> about us</h1>
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
