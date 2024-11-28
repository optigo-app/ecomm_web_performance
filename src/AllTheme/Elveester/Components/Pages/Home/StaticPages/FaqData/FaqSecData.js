import "./FaqSecData.scss";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import {
    websiteFaqs,
    productFaqs,
    customerServiceFaq,
    designCustoFaq,
    qualityAssuranceFaq,
    paymentFaq,
    shippingFaq,
    contactFaq,
    anyOtherQues,
} from "../../../Constants/Faqlist";
import { IoChevronDown } from "react-icons/io5";
import { IoChevronUp } from "react-icons/io5";
import { useState } from "react";

const FaqSecData = () => {
    return (
        <div className="elv_main_FaqSection">
            <h2 className="elv_faq_title">FAQ</h2>
            <FAQComponent
                data={websiteFaqs}
                title={
                    "Website FAQs:"
                }
            />
            <FAQComponent
                data={productFaqs}
                title={
                    "Product FAQs:"
                }
            />
            <FAQComponent
                data={customerServiceFaq}
                title={
                    "Customer Service FAQs:"
                }
            />
            <FAQComponent
                data={designCustoFaq}
                title={
                    "Design & Customization FAQs:"
                }
            />
            <FAQComponent
                data={qualityAssuranceFaq}
                title={
                    "Quality Assurance FAQs:"
                }
            />
            <FAQComponent
                data={paymentFaq}
                title={
                    "Payment FAQs:"
                }
            />
            <FAQComponent
                data={shippingFaq}
                title={
                    "Shipping & Delivery FAQs:"
                }
            />
            <FAQComponent
                data={contactFaq}
                title={
                    "Contact FAQs:"
                }
            />
            <FAQComponent
                data={anyOtherQues}
                title={
                    "More questions:"
                }
            />
            {/* <FAQComponent
                // data={ordersPaymentsFAQ}
                data={returnsExchangeFAQ}
                title={
                    "orem . Aliquam dicta beatae praesentiumx odit?" ||
                    "Orders & Payments"
                }
            />
            <FAQComponent
                // data={careRepairFAQ}
                data={returnsExchangeFAQ}
                title={
                    "orem . Aliquam dicta beatae praesentiumx odit?" || "Care & Repair"
                }
            />
            <FAQComponent
                data={returnsExchangeFAQ}
                title={
                    "orem . Aliquam dicta beatae praesentiumx odit?" ||
                    "Returns & Exchange"
                }
            />
            <FAQComponent
                data={returnsExchangeFAQ}
                title={
                    "orem . Aliquam dicta beatae praesentiumx odit?" ||
                    "Returns & Exchange"
                }
            /> */}
        </div>
    );
};

export default FaqSecData;

const FAQComponent = ({ data = [], title }) => {
    const [expandedAccordion, setExpandedAccordion] = useState(null);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpandedAccordion(isExpanded ? panel : null);
    };
    return (
        <section>
            <div className="head">
                <h1>{title}</h1>
            </div>
            {data.map((faqItem, index) => (
                <div className="custom-accordian">
                    <Accordion
                        key={index}
                        expanded={expandedAccordion === `panel-${index}`}
                        onChange={handleChange(`panel-${index}`)}
                    >
                        <AccordionSummary
                            aria-controls={`panel-${index}-content`}
                            id={`panel-${index}-header`}
                        >
                            <button className="accordian_btn">
                                {expandedAccordion === `panel-${index}` ? (
                                    <IoChevronUp size={14} />
                                ) : (
                                    <IoChevronDown size={14} />
                                )}
                            </button>
                            <h1 className="question">
                                {faqItem.question}
                            </h1>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p className="answer">
                                {faqItem.answer && faqItem.answer.length === 1 ? (
                                    <span dangerouslySetInnerHTML={{ __html: faqItem.answer[0] }} />
                                ) : (
                                    faqItem.answer.map((item, index) => (
                                        <div key={index} dangerouslySetInnerHTML={{ __html: item }} />
                                    ))
                                )}
                            </p>
                        </AccordionDetails>
                    </Accordion>
                </div>
            ))}
        </section>
    );
};
