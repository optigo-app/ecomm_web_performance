import React, { useEffect } from "react";
import Footer from "../../Home/Footer/Footer";
import { MaioraTerms, TermsData } from "./Terms";
import "./TermsPolicy.scss";

function TermsPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="smr_Expert_FooterTopMain">
      <div className="smr_Expert_FooterTopMain_sub">
        <p
          className="text_center"
          style={{ textAlign: "center", paddingBlock: "60px", color: "black" }}
        >
          <strong>
            <span
              className="TitleMainFoterExpert"
              style={{
                fontFamily: "Calibri",
                fontSize: "40px",
                fontFamily:
                  " FreightDispProBook-Regular, Times New Roman , serif",
              }}
            >
              TERMS POLICY
            </span>
          </strong>
        </p>
        <div>
          <div className="smiling-ServicePolicyMain">
            <div className="container2">
              {/* By Default TermsDATA */}
              {/* fOR MAIORA MaioraTerms */}
              {TermsData?.map(({ bgColor, children, desc, title }, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="main_container_for">
                      <div className="title_fg_st">
                        <strong
                          style={
                            bgColor
                              ? {
                                  backgroundColor: "aqua",
                                  paddingInline: "2px",
                                  paddingBlock: "1px",
                                }
                              : {}
                          }
                        >
                          <span
                            style={{ fontFamily: "Calibri", fontSize: "19px" }}
                          >
                            {title}
                          </span>
                        </strong>
                      </div>
                      {desc && (
                        <div className="desc_fg_det">
                          <div
                            style={{
                              fontFamily: "Calibri",
                              fontSize: "16px",
                              background: "none",
                            }}
                            className="desc"
                            dangerouslySetInnerHTML={{ __html: desc }}
                          />
                        </div>
                      )}
                      {children && (
                        <div
                          className="list"
                          style={{
                            fontFamily: "Calibri",
                            fontSize: 16,
                            background: "none",
                          }}
                        >
                          {children.map((menu, indx) => {
                            return (
                              <React.Fragment key={indx}>
                                <div className="list_bx_fg_fg">
                                  <span
                                    style={{
                                      fontFamily: "Calibri",
                                      textDecoration: "underline",
                                      fontSize: 16,
                                      fontStyle: "italic",
                                    }}
                                  >
                                    {menu?.title}
                                  </span>
                                  <br />

                                  {menu.htmx ? (
                                    <p
                                      dangerouslySetInnerHTML={{
                                        __html: menu?.desc,
                                      }}
                                    ></p>
                                  ) : (
                                    <p>{menu?.desc}</p>
                                  )}
                                </div>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            <Footer />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', paddingBlock: '30px' ,backgroundColor:"#C0BBB1" ,color:"white" }}>
          <p
            style={{
              margin: "0px",
              fontWeight: 500,
              width: "100px",
              cursor: "pointer",
            }}
            onClick={() => window.scrollTo(0, 0)}
          >
            BACK TO TOP
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsPolicy;
