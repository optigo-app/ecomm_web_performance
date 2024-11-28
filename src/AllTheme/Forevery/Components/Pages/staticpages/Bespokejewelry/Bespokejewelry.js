import React, { useEffect, useState } from "react";
import "./Bespokejewelry.scss";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import OurServices from "../../Home/Common/OurServices/OurServices";
import GetInTouch from "../../Home/Common/GetInTouch/GetInTouch";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { foreveryProcess } from "../../../data/dummydata";
import InquiryModal from "./InquiryForm/InquiryModal";

const Bespokejewelry = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    website: "",
    additionalInfo: "",
    file: null,
  });

  useEffect(()=>{
    document.body.style.overflow = open ? "hidden"  :"auto";
  },[open])

  const onOpen = () => {
    setOpen(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      file: event.target.files[0],
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted", formData);
    setOpen(false);
    resetForm();
  };
  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      website: "",
      additionalInfo: "",
      file: null,
    });
  };
  return (
    <div className="for_Bespokejewelry">
      {open && (
        <InquiryModal
          open={open}
          setOpen={setOpen}
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleSubmit={handleSubmit}
        />
      )}
      <Banner onOpen={onOpen} />
      <ColumnGrid onOpen={onOpen}/>
      <OurServices />
      <GetInTouch />
      <NewsletterSignup />
    </div>
  );
};

export default Bespokejewelry;

const Banner = ({ onOpen }) => {
  const img = `${storImagePath()}/Forevery/static/pen.png`;
  return (
    <section className="bespoke-banner " style={{ background: `url(${img})` }}>
      <div className="overlay"></div>
      <div className="banner_content ">
        <h1 className="title">bespoke jewelry</h1>
        <div className="Parisienne">Turn your imagination into reality</div>
        <p className="para">
          With Forevery, you can tailor make your dream ring. We, at Forevery,
          make sure that all your ideas come to life with our special service to
          customize your ring. You just need to share your ideas and we’ll
          design and manufacture your ring and get it ready for collection in no
          time.
        </p>
        <button className="inquire_btn" onClick={onOpen}>
          inquire now
        </button>
      </div>
    </section>
  );
};
const ColumnGrid = ({onOpen}) => {
  return (
    <>
      <div className="ColumnGrid">
        {foreveryProcess?.map(
          ({ Subtitle, description, step, title, img }, i) => {
            return (
              <div className="column_card">
                <div className="image_col">
                  <img src={img} alt="" />
                </div>
                <div className="details_col">
                  <h1 className="title_col">{title}</h1>
                  <span className="subtitle_col">{Subtitle}</span>
                  <p className="para_col">{description}</p>
                </div>
              </div>
            );
          }
        )}
        <button className="inquire_btn" onClick={onOpen}>inquire now</button>
      </div>
    </>
  );
};
