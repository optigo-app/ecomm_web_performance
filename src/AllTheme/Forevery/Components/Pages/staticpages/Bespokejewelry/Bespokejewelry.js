import React, { useEffect, useState } from "react";
import "./Bespokejewelry.scss";
import NewsletterSignup from "../../ReusableComponent/SubscribeNewsLater/NewsletterSignup";
import OurServices from "../../Home/Common/OurServices/OurServices";
import GetInTouch from "../../Home/Common/GetInTouch/GetInTouch";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { foreveryProcess } from "../../../data/dummydata";
import InquiryModal from "./InquiryForm/InquiryModal";
import { BespokeAPI } from "../../../../../../utils/API/Bespoke/BespokeAPI";
import { toast } from "react-toastify";

const Bespokejewelry = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    FullName: "",
    EmailId: "",
    mobileno: "",
    WebSite: "",
    Be_In_Message: "",
  });

  const [file, setFile] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open])

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

  const validate = (file) => {
    const newErrors = {};

    if (!formData.FullName) newErrors.FullName = 'Full Name is required';
    if (!formData.EmailId) newErrors.EmailId = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.EmailId)) newErrors.EmailId = 'Invalid email address';
    if (!formData.mobileno) newErrors.mobileno = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.mobileno)) newErrors.mobileno = 'Phone must be exactly 10 digits';
    // if (!formData.website) newErrors.website = 'Website URL is required';
    if (!formData.Be_In_Message) newErrors.Be_In_Message = 'Additional information is required';

    if (file) {
      if (file.size > 10000000) {
        newErrors.file = 'File size exceeds 10MB';
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        newErrors.file = 'Only JPG, PNG, and PDF files are allowed';
      }
    }

    return newErrors;
  };


  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0])
  //   // setFormData((prevData) => ({
  //   //   ...prevData,
  //   //   file: event.target.files[0],
  //   // }));
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (file) {
      if (file.size > 10000000) {
        setError((prev) => ({ ...prev, file: 'File size exceeds 10MB' }));
      } else if (!allowedTypes.includes(file.type)) {
        setError((prev) => ({ ...prev, file: 'Only JPG, PNG, and PDF files are allowed' }));
      } else {
        setFile(file);
        setError((prev) => ({ ...prev, file: '' }));
      }
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      await BespokeAPI(formData, file).then((res) => {
        if (res?.stat_msg === 'success') {
          toast.success("Bespoke form submitted Successfully");
          setLoading(false);
        } else {
          toast.error("Something went wrong");
        }
      })
      setOpen(false);
      resetForm();
    }
    else {
      setError(formErrors);
    }
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
      <>
        {open && (
          <InquiryModal
            open={open}
            setOpen={setOpen}
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
          />
        )}
        <Banner onOpen={onOpen} />
        <ColumnGrid onOpen={onOpen} />
        <OurServices />
        <GetInTouch />
        <NewsletterSignup />
      </>
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
const ColumnGrid = ({ onOpen }) => {
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
