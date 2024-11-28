import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./Service.scss";
const ServicePolicy = () => {
  const Banner = `${storImagePath()}/about/22.jpg`;

  // const [htmlContent, setHtmlContent] = useState('');

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  // useEffect(() => {
  //   fetch(`${storImagePath()}/html/servicePolice.html`)
  //     .then((response) => response.text())
  //     .then((html) => {
  //       setHtmlContent(html);
  //       console.log('htmlssssssss', html);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching the HTML file:', error);
  //     });
  // }, []);

  return (
    <div className="stam_service">
      <div
        className="stam_banner"
        style={{
          backgroundImage: `url(${Banner})`,
        }}
      >
        <h1>Service Policy Page</h1>
      </div>
      <div className="main_content_stamford">
        <main class="stamford_do_main">
          <h2>SERVICE & SECURITY</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
            adipisci voluptatum qui saepe? Corrupti, consectetur libero
            architecto illo quis pariatur nisi mollitia ipsam temporibus id
            minus voluptates vitae vel quae..
          </p>
          <p>Lorem ipsum dolor sit amet Lorem, ipsum. Lorem, ipsum dolor.</p>
          <p>
            Lorem ipsum dolor sit amet consectetur{" "}
            <a href="mailto:lorem@lorem.in">lorem@lorem.in</a> adipisicing elit.
            Perspiciatis, accusantium minus magnam animi voluptas neque Lorem
            ipsum dolor sit.
          </p>
        </main>
      </div>
    </div>
  );
};

export default ServicePolicy;

{
  /* <div className='daimondsEveryAbout'>
        <div style={{ marginInline: '6%', paddingBottom: '80px', minHeight: '400px' }}>
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        </div>
      </div> */
}
