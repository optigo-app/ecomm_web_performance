import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { Link } from "react-router-dom";
import './OurStory.scss';
import { useMediaQuery } from "@mui/material";
export default function OurStory() {
  const [htmlContent, setHtmlContent] = useState("");
  const MediaQuery768 = useMediaQuery('(max-width: 1000px)')

  useEffect(() => {
    fetch(`${storImagePath()}/static-html-page/Story.html`)
      .then((response) => response.text())
      .then((html) => {
        setHtmlContent(html);
      })
      .catch((error) => {
        console.error("Error fetching the HTML file:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0
    })
  }, [])
  return (
    <div className="hoq_ourStory">
      <div>
        <div
          style={{
            padding: "0 15px",
            width: MediaQuery768 ? "95%" : "70%",
            margin: "0 auto"
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      <div className="back-to-home">
        <Link to={"/"}>Back to Home</Link>
      </div>
    </div>
  );
}
