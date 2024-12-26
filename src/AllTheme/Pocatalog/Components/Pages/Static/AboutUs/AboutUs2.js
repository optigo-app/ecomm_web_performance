import React, { useEffect, useState } from 'react';
import './AboutUs2.scss'
import { getDomainName, storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import { useLocation } from 'react-router-dom';

const AboutUs2 = () => {
  const [htmlContent, sethtmlContent] = useState(null);

  useEffect(() => {
   const FetchHtml = async()=>{
    try {
      const filename = await getDomainName();
      const res = await   fetch(`${storImagePath()}/html/${filename}/aboutUs.html`)
      const html = await res.text();
      sethtmlContent(html);
    } catch (error) {
      return error
    }
   }
   FetchHtml();
  }, [htmlContent])
  
  
  return (
    <div className='procatalog_wra_About'>
        <Banner/>
    <div className="procatalog_about-us">
      {/* <main className="main-content">
        <section className="brand-story">
          <div className='story-section'>
            <p>Welcome to Alma Carino Fine Jewellery, the signature brand of Beyond Demands Retails LLP. We are a premium jewellery company dedicated to crafting exquisite designs that blend timeless elegance with contemporary sophistication.
            </p>
            <p>At Alma Carino, we believe jewellery is more than just an accessory—it is a statement of individuality and a celebration of life’s most cherished moments. Our collections showcase a harmonious balance of artistry, innovation, and quality, using only the finest materials and expert craftsmanship.
            </p>
            <p>As a part of Beyond Demands Retails LLP, we are committed to delivering exceptional value and outstanding customer experiences. Whether you are seeking a timeless piece for yourself or a bespoke gift for a loved one, Alma Carino Fine Jewellery offers designs that resonate with elegance and style.
            </p>
            <p>
            Thank you for choosing us as your trusted jeweller. We look forward to being a part of your journey in celebrating beauty, milestones, and memories.
            </p>
          </div>
        
        </section>
      </main> */}
      <div dangerouslySetInnerHTML={{
        __html  : htmlContent
      }}/>
    </div>
    </div>
  )
}

export default AboutUs2


const Banner = ({ title = "About Us" }) => {
  return (
    <>
      <div
        className="procatalog-banner-ab"
      >
        <h1>{title}</h1>
      </div>
    </>
  );
};



  {/* <h2>Brand Story</h2>

          <div className="story-section">
            <h3>Initial Foray</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem pariatur, alias, rem natus culpa aspernatur tempora
              explicabo, in eveniet esse consequuntur voluptate maiores?
              Dignissimos, fugit voluptates, repellat iste non tempora quisquam
              blanditiis, harum asperiores quidem autem odio veritatis voluptas.
              Totam, aspernatur, nihil et ullam dolore dicta suscipit
              repudiandae ipsa dolorum deserunt odit veritatis sit consectetur
              nesciunt autem nostrum! Nostrum, commodi dolore sequi unde
              corporis illo ab velit harum, aspernatur officiis nisi a, nobis
              accusamus quae? Repudiandae mollitia cumque nobis voluptates
              numquam doloribus ab fugit amet voluptas corporis quos, reiciendis
              id.
            </p>
          </div>

          <div className="story-section">
            <h3>Timeless Appeal</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem pariatur, alias, rem natus culpa aspernatur tempora
              explicabo, in eveniet esse consequuntur voluptate maiores?
              Dignissimos, fugit voluptates, repellat iste non tempora quisquam
              blanditiis, harum asperiores quidem autem odio veritatis voluptas.
              Totam, aspernatur, nihil et ullam dolore dicta suscipit
              repudiandae ipsa dolorum deserunt odit veritatis sit consectetur
              nesciunt autem nostrum! Nostrum, commodi dolore sequi unde
              corporis .
            </p>
          </div>

          <div className="story-section">
            <h3>Epitomizing Excellence</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem pariatur, alias, rem natus culpa aspernatur tempora
              explicabo, in eveniet esse consequuntur voluptate maiores?
              Dignissimos, fugit voluptates, repellat iste non tempora quisquam
              blanditiis, harum asperiores quidem autem odio veritatis voluptas.
              Totam, aspernatur, nihil et ullam dolore dicta suscipit
              repudiandae ipsa dolorum deserunt odit veritatis sit consectetur
              nesciunt autem nostrum! Nostrum, commodi dolore sequi unde
              corporis . Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem pariatur, alias, rem natus culpa aspernatur tempora
              explicabo, in eveniet esse consequuntur voluptate maiores?
              Dignissimos,.
            </p>
          </div>

          <div className="story-section">
            <h3>Success Secrets</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem pariatur, alias, rem natus culpa aspernatur tempora
              explicabo, in eveniet esse consequuntur voluptate maiores?
              Dignissimos, fugit voluptates, repellat iste non tempora quisquam
              blanditiis, harum asperiores quidem autem odio veritatis voluptas.
              Totam, aspernatur, nihil et ullam dolore dicta suscipit
              repudiandae ipsa dolorum deserunt odit veritatis sit consectetur
              nesciunt autem nostrum! Nostrum, commodi dolore sequi unde
              corporis .
            </p>
          </div> */}