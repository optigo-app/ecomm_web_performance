import React, { useState } from "react";
import "./Faq.scss";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Faq = ({ title, data }) => {
  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpandedAccordion(isExpanded ? panel : null);
  };
  return (
    <div className="for_faq">
      {title && (
        <div className="heading">
          <h1>{title}</h1>
        </div>
      )}
      <div className="faq_section">
        {data?.map((val, index) => {
          return (
            <Accordion
              key={index}
              expanded={expandedAccordion === `panel-${index}`}
              onChange={handleChange(`panel-${index}`)}
            >
              <AccordionSummary
                expandIcon={
                  expandedAccordion === `panel-${index}` ? (
                    <RemoveCircleOutlineIcon size={16} />
                  ) : (
                    <AddCircleOutlineIcon size={16} />
                  )
                }
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <span>{val?.question}</span>
              </AccordionSummary>
              <AccordionDetails>{val?.answer}</AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;