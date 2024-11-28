import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TermsConditions.scss";
import { Link } from "react-router-dom";
export default function TermsConditionPage() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch(`${storImagePath()}/html/terms.html`)
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
    <div className="hoq_terms">
      <div>
        <div
          className="terms"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}
