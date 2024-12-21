import React from "react";
import "./AboutUs.scss";
import { storImagePath } from "../../../../../utils/Glob_Functions/GlobalFunction";


const ShinjiniAbout = {
  introduction: {
    text: "Welcome to Shinjini Jewels, where timeless elegance meets exquisite craftsmanship. At Shinjini Jewels, we believe that jewelry is not just an accessory, but an expression of individuality, emotion, and the moments that make life truly special. Our collections are designed to capture the essence of beauty, sophistication, and luxury, crafted to be cherished for generations."
  },
  sections: [
    {
      title: "Our Story",
      content: [
        {
          subtitle: "The Beginning:",
          text: "Founded with a passion for creating high-quality jewelry, Shinjini Jewels began as a dream to offer unique, handcrafted pieces that stand out for their quality and design. Each piece in our collection is a work of art, meticulously crafted with the finest materials and an eye for detail. Our journey started with a commitment to deliver not only beautiful jewelry but also an exceptional customer experience."
        },
        {
          subtitle: "Our Reputation:",
          text: "With years of experience in the jewelry industry, we’ve built a reputation for offering exceptional craftsmanship, innovative designs, and impeccable service. Our team is dedicated to providing you with jewelry that tells a story and enhances your most important occasions, from engagements to anniversaries and beyond."
        }
      ]
    },
    {
      title: "Our Vision",
      content: [
        {
          subtitle: "Our Goal:",
          text: "At Shinjini Jewels, our vision is simple – to offer luxury jewelry that makes every customer feel special and confident. We aim to create pieces that elevate every outfit and stand as a testament to both style and personal expression. Whether you're celebrating a milestone or indulging in a little self-love, our jewelry is designed to be the perfect companion for every moment."
        }
      ]
    },
    {
      title: "Our Craftsmanship",
      content: [
        {
          subtitle: "Meticulous Crafting:",
          text: "We take pride in our meticulous craftsmanship. Each piece of jewelry is carefully designed by our talented artisans, who use their expertise to create designs that are as unique as the people who wear them. From the selection of the finest diamonds, gemstones, and metals to the intricate details of every setting, we focus on creating exceptional jewelry that stands the test of time."
        }
      ]
    },
    {
      title: "Sustainability and Ethics",
      content: [
        {
          subtitle: "Our Commitment:",
          text: "At Shinjini Jewels, we believe in sustainable practices and ethical sourcing. We are committed to ensuring that the materials used in our jewelry are responsibly sourced, and we strive to minimize our environmental impact. We work closely with trusted suppliers to ensure that every gemstone and metal used in our pieces meets the highest ethical and environmental standards."
        }
      ]
    },
    {
      title: "Why Choose Us?",
      content: [
        {
          subtitle: "What Sets Us Apart:",
          text: "Exceptional Quality: Our jewelry is made using the finest materials and is crafted to perfection. Timeless Designs: We offer designs that are classic, elegant, and made to be treasured for years to come. Customer Care: Our dedicated customer support team is always here to assist you with your purchase or any inquiries you may have. Ethical & Sustainable: We prioritize ethical sourcing and sustainability in all our creations."
        }
      ]
    },
    {
      title: "Join the Shinjini Jewels Family",
      content: [
        {
          subtitle: "Explore Our Collections:",
          text: "Whether you're looking for a statement piece or a subtle addition to your jewelry collection, Shinjini Jewels has something for everyone. Explore our exquisite collections, and let us help you find the perfect piece to make your moments shine."
        }
      ]
    }
  ],
  conclusion: {
    text: "Thank you for choosing Shinjini Jewels. We look forward to being a part of your special journey."
  }
};

const SonasonsAbout = {
  introduction: {
    text: "Welcome to Sonasons Jewels, where timeless elegance meets exquisite craftsmanship. At Sonasons Jewels, we believe that jewelry is not just an accessory, but an expression of individuality, emotion, and the moments that make life truly special. Our collections are designed to capture the essence of beauty, sophistication, and luxury, crafted to be cherished for generations."
  },
  sections: [
    {
      title: "Our Story",
      content: [
        {
          subtitle: "The Beginning:",
          text: "Founded with a passion for creating high-quality jewelry, Sonasons Jewels began as a dream to offer unique, handcrafted pieces that stand out for their quality and design. Each piece in our collection is a work of art, meticulously crafted with the finest materials and an eye for detail. Our journey started with a commitment to deliver not only beautiful jewelry but also an exceptional customer experience."
        },
        {
          subtitle: "Our Reputation:",
          text: "With years of experience in the jewelry industry, we’ve built a reputation for offering exceptional craftsmanship, innovative designs, and impeccable service. Our team is dedicated to providing you with jewelry that tells a story and enhances your most important occasions, from engagements to anniversaries and beyond."
        }
      ]
    },
    {
      title: "Our Vision",
      content: [
        {
          subtitle: "Our Goal:",
          text: "At Sonasons Jewels, our vision is simple – to offer luxury jewelry that makes every customer feel special and confident. We aim to create pieces that elevate every outfit and stand as a testament to both style and personal expression. Whether you're celebrating a milestone or indulging in a little self-love, our jewelry is designed to be the perfect companion for every moment."
        }
      ]
    },
    {
      title: "Our Craftsmanship",
      content: [
        {
          subtitle: "Meticulous Crafting:",
          text: "We take pride in our meticulous craftsmanship. Each piece of jewelry is carefully designed by our talented artisans, who use their expertise to create designs that are as unique as the people who wear them. From the selection of the finest diamonds, gemstones, and metals to the intricate details of every setting, we focus on creating exceptional jewelry that stands the test of time."
        }
      ]
    },
    {
      title: "Sustainability and Ethics",
      content: [
        {
          subtitle: "Our Commitment:",
          text: "At Sonasons Jewels, we believe in sustainable practices and ethical sourcing. We are committed to ensuring that the materials used in our jewelry are responsibly sourced, and we strive to minimize our environmental impact. We work closely with trusted suppliers to ensure that every gemstone and metal used in our pieces meets the highest ethical and environmental standards."
        }
      ]
    },
    {
      title: "Why Choose Us?",
      content: [
        {
          subtitle: "What Sets Us Apart:",
          text: "Exceptional Quality: Our jewelry is made using the finest materials and is crafted to perfection. Timeless Designs: We offer designs that are classic, elegant, and made to be treasured for years to come. Customer Care: Our dedicated customer support team is always here to assist you with your purchase or any inquiries you may have. Ethical & Sustainable: We prioritize ethical sourcing and sustainability in all our creations."
        }
      ]
    },
    {
      title: "Join the Sonasons Jewels Family",
      content: [
        {
          subtitle: "Explore Our Collections:",
          text: "Whether you're looking for a statement piece or a subtle addition to your jewelry collection, Sonasons Jewels has something for everyone. Explore our exquisite collections, and let us help you find the perfect piece to make your moments shine."
        }
      ]
    }
  ],
  conclusion: {
    text: "Thank you for choosing Sonasons Jewels. We look forward to being a part of your special journey."
  }
};

export default function AXboutUs() {
  const Shinjini = 2;
  const aboutData = Shinjini === 1 ? ShinjiniAbout : SonasonsAbout
  return (
    // sonasons changes
    /*
    <div className="rp_about-us">
      <main className="main-content">
        <h1>About Roop Jewellers's</h1>
        <section className="brand-story">
          <h2>Brand Story</h2>

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
          </div>
        </section>
      </main>
    </div>
    */

    <div className="shinjini-terms">
      <Banner />
      <main className="shinjini-main">
        <h1 className="shinjini-title">About us</h1>

        <div className="shinjini-content">
          <p className="shinjini-introduction">{aboutData.introduction.text}</p>

          {aboutData.sections.map((section, index) => (
            <section key={index} className="shinjini-section">
              <h2 className="shinjini-section-title">{section.title}</h2>
              {section.content.map((item, itemIndex) => (
                <div key={itemIndex} className="shinjini-section-content">
                  <h3 className="shinjini-subtitle">{item.subtitle}</h3>
                  <p className="shinjini-text">{item.text}</p>
                </div>
              ))}
            </section>
          ))}

          <p className="shinjini-conclusion">{aboutData.conclusion.text}</p>
        </div>
      </main>
    </div>
  );
}


const Banner = ({ title = "About us" }) => {
  const Image = `url(${storImagePath() + "/images/HomePage/Aboutus/Banner.jpg"
    })`;
  return (
    <>
      <div
        className="shinjini-banner"
        style={{
          backgroundImage: Image,
        }}
      >
        <h1>{title}</h1>
      </div>
    </>
  );
};