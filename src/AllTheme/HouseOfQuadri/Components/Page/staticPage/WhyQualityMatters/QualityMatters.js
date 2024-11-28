import React, { useEffect, useState } from "react";
import "./QualityMatters.scss";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { Link } from "react-router-dom";

const QualityMatters = () => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/html/quality.html`)
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
    <div className="hoq_why_quality_manners">
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
};

export default QualityMatters;
