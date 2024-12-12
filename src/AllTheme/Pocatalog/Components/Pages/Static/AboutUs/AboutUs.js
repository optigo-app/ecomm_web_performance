import React from 'react';
import './AboutUs.scss'
import { FaBook, FaPencilRuler, FaMicrochip } from 'react-icons/fa'
import { storImagePath } from './../../../../../../utils/Glob_Functions/GlobalFunction';

const AboutUs = () => {
  const images ={
    about1 : storImagePath()+`/images/about.jpg` ,
    about2 : storImagePath()+`/images/about1.jpg`
  }
  return (
    <div className="procatalog-container">
      <img
        src={images.about1}
        alt="Team Photo"
        width={1200}
        height={600}
        className="procatalog-hero"
        loading='lazy'
      />

      <h1 className="procatalog-title">ABOUT</h1>

      <blockquote className="procatalog-quote">
        "It's not wise to violate rules until you know how to observe them."
      </blockquote>

      <div className="procatalog-content">
        <p className="procatalog-paragraph">
          Jam3 is one of the world's top digital production and design agencies. We specialize in creating
          highly advanced, experiential works in both the advertising and entertainment industries.
        </p>
        <p className="procatalog-paragraph">
          We're a culture of dreamers and doers who prove that the two aren't mutually exclusive. We're
          happiest when we're innovating, and fanatically dedicated to our craft.
        </p>
      </div>

      <div className="procatalog-content">
        <p className="procatalog-paragraph">
          We're known for challenging the way digital stories are told. Our work often incorporates
          everything from live action, animation and sound design to coded particle systems and complex 3D
          engines. If it is possible, Jam3 can do it.
        </p>
        <p className="procatalog-paragraph">
          At Jam3, everything is informed by our three core principles: story, craft and technology.
        </p>
      </div>

      <img
                src={images.about2}
        alt="Team Members"
        width={1200}
        height={400}
        className="procatalog-team-image"
        loading='lazy'
      />

      <div className="procatalog-features">
        <div className="procatalog-feature">
          <FaBook size={40} />
          <h3>STORYTELLING</h3>
          <p>
            We focus on delivering timelessness: experiences that are immediately compelling, and constantly engaging. By embracing the interactivity of an online platform while taking into account the ubiquity of web browsers, we create experiences tailored to online sensibilities.
          </p>
        </div>
        <div className="procatalog-feature">
          <FaPencilRuler size={40} />
          <h3>DESIGN + CRAFT</h3>
          <p>
            Browsing the web is fundamentally an act of consumption. When users visit a particular webpage, they're looking to experience something new. At Jam3, we respect the audience by respecting the craft.
          </p>
        </div>
        <div className="procatalog-feature">
          <FaMicrochip size={40} />
          <h3>TECHNOLOGY</h3>
          <p>
            We have a reputation for creating experiences that are pushing the boundaries of what's possible on the internet. We owe that to our amazing, multi-talented team. This isn't a "jack of all trades" shop by any means - we all have our specialties. Everyone who walks through our door has both an appreciation for technology and a knack for it.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutUs