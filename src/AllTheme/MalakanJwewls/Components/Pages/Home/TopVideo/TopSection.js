import React, { useEffect, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { motion } from "framer-motion";
import "./TopSection.modul.scss";

const TopSection = ({data}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const style = {
    backgroundImage: `url(${data?.image?.[0]})`,
  };

  const fadeFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        opacity: { duration: 1, ease: "easeOut" },
        x: { duration: 1, ease: "easeOut" },
      },
    },
  };

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  };

  useEffect(() => {
    const img = new Image();
    img.src = storImagePath() + "/images/HomePage/TopSection/top.png";
    img.onload = handleImageLoad;
  }, []);

  return (
    <div className="mala_topVideoMain" style={style}>

      {/* Privaa don't need this */}
      <motion.div
        className="details_text"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeFromLeft}
      >
        <h1>Shine</h1>
        <h1>With</h1>
        <h1>Elegance</h1>
      </motion.div>
    </div>
  );
};

export default TopSection;
