import React, { useEffect, useState } from "react";
import "./ContactForm.scss";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";
const ContactForm = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    message: "",
  });

  const HandleContactForm = (e) => {
    const { name, value } = e?.target;
    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleformsubmit = (e) => {
    e.preventDefault();
    try {
    
      toast.success(`Submitted Successfully! `);
      setform({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(`SomeThing Went Wrong! `);
    }
  };
  useEffect(()=>{
    window.scrollTo({
      behavior  :"smooth",
      top : 0
    })
  },[])

  return (
    <div className="hoq_contactfrom">
      <div className="details">
        <h1>We’re here to Help</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          aperiam exercitationem hic modi quasi similique laboriosam odio! Omnis
          pariatur corporis. Lorem ipsum dolor sit amet.
        </p>
        <span>Email:demo@example.com</span>
        <p>Phone: +91 1234567890</p>
        <address>
          Address: 4th planet mars , Olympus Mons Building ,near volcano , mars
          , 00458712.
        </address>
      </div>
      <div className="contact_from">
        <h1>Contact us</h1>
        <div className="layout">
          <form onSubmit={handleformsubmit}>
            <div className="input">
              <div className="box_input">
                <label htmlFor="name">Name</label>
                <input
                  onChange={(e) => HandleContactForm(e)}
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form?.name}
                />
              </div>
              <div className="box_input">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => HandleContactForm(e)}
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form?.email}
                />
              </div>
            </div>
            <div className="textarea">
              <label htmlFor="msg">Message</label>
              <textarea
                onChange={(e) => HandleContactForm(e)}
                value={form?.message}
                id="msg"
                name="message"
              ></textarea>
            </div>
            <div className="btn_form">
              <button>Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
