import React from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./AppointmentBanner.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";

const AppointmentBanner = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-600px" });
  const Navigate = useNavigate();
  const Banner = storImagePath() + `/Appointment/appointment.jpg`;

  const textVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const handleMoveToAppointment = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    Navigate("/appointment");
  };

  return (
    <div className="smr_AppointmentBanner" ref={sectionRef}>
      <div className="center_mode_banner">
        <div className="image_banner_smr">
          <motion.img
            src={Banner}
            alt=""
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
          />
          <motion.div
            className="content_detail_smr"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <motion.div
              className="text-content"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              <motion.h1 variants={textVariants}>Book an Appointment</motion.h1>
              <motion.p variants={textVariants}>
                At Diamond, we believe in offering personalized experiences to
                each of our clients. Our team is dedicated to providing
                exceptional service and ensuring that your visit is nothing
                short of outstanding. Let us make your appointment memorable
                with our expert guidance and attention to detail. Schedule your
                visit today and let us help you shine.
              </motion.p>
              <motion.button
                onClick={handleMoveToAppointment}
                variants={buttonVariants}
              >
                Visit Us <BsArrowRight className="moving-arrow" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBanner;
