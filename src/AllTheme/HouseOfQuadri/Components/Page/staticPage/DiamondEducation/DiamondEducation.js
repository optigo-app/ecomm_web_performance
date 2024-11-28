import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { Link } from "react-router-dom";
export default function DiamondEducation() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/static-html-page/DiamondEducation.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error("Error fetching the HTML file:", error);
      });
  }, []);

  useEffect(()=>{
    window.scrollTo({
      behavior  :"smooth",
      top : 0
    })
  },[])
  return (
    <div className="hoq_privacyPolicy">
      <div>
        <div
          className="privacy-policy"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}
