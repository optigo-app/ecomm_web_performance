import React, { useEffect, useState } from 'react';
import './Career.scss'
import { IoMdArrowDropdown } from "react-icons/io";
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';

const Career = () => {
    const [showfrom, setfromshow] = useState(false);
    const careerDetails = [
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
        { title: 'Lorem Ipsum', desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem." },
    ];

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        // <div className="elv_career_main_div">
        //     <div className="elv_career_div">
        //         <div className='elv_career_image_div'>
        //             <img className='elv_career_image_1' src={`${storImagePath()}/images/HomePage/Careers/mainTopBanner.jpg`} alt="career.jpg" />
        //             <div>
        //                 <img className='elv_career_image_2' src="https://www.elvee.in/static/media/Logo1.4e98fceb0f4280d06296.png" alt="" />
        //             </div>
        //         </div>
        //         <div className='elv_career_descriptions_div'>
        //             <h3 className='elv_career_head_title'>Careers at Elvee Jewels</h3>
        //             <div className='elv_career_desc'>
        //                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor congue magna, id mollis mi sollicitudin in. Fusce facilisis, felis vel viverra placerat, felis neque lacinia urna, a tempor risus nulla in lorem.</p>

        //                 {careerDetails?.map((item, index) => (
        //                     <div key={index} className='mt-5'>
        //                         <span className='elv_career_title_main'>{item?.title}</span>
        //                         <p className='elv_career_para_main'>
        //                             {item?.desc}
        //                         </p>
        //                     </div>
        //                 ))}
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className="elev_career_page">
            <div className="elvee_banner_i">
                <img src={`${storImagePath()}/images/HomePage/Careers/Career.jpg`} alt="" />
            </div>
            <div className="elev_career_content">
                <h1>CAREER</h1>
                <p>A LARGE VARIETY OF POSITIONS AND SPECIALITIES</p>
                <section className="about-section">
                    <p>
                        We recruit for our boutiques and offices located in the India & International.
                        ELVEE offers professional development opportunities for both experienced employees and beginners,
                        working together in an environment of excellence.
                    </p>
                </section>
            </div>
            <div className="elvee_join_team_section">
                <img
                    src="https://i.ibb.co/7Cw2sc2/Joint-Team.jpg"
                    alt="Team meeting"
                    className="team-meeting-photo"
                />
                <div className="join-team-content">
                    <h2>JOIN OUR TEAM</h2>
                    <p className='elv_join_team_desc'>
                        Becoming The Elvee team member means becoming part of a universe of passion where women and men use their entrepreneurial spirit and creativity,
                        looking for the pursuit of the requirement of tradition. <br />
                        As a human-sized luxury Maison, we hire talented people with strategic business minds and vision who still remain close to the ground and
                        result-oriented. <br /> We consider our employees as a key resource and strongly believe in the importance of individual performance to achieve
                        collective performance. <br />  We provide our diversified talents with professional development, contributing to the growth of the Maison.
                    </p>
                </div>
            </div>
            <div className="bar_elvee_sec">
                <p>
                    View all of our job offers, internship and apprenticeships on the Elvee website in the "Talents" section.
                </p>
                <button
                    onClick={() => setfromshow(!showfrom)}
                    className="elvee_cta_button"
                >
                    Discover our Job view{" "}
                    <IoMdArrowDropdown color="darkblue" style={showfrom && {
                        rotate: "180deg"
                    }} size={26} />
                </button>
            </div>
            <hr
                style={{
                    width: "95%",
                    margin: "0 auto",
                    marginBottom: "15px",
                }}
            />
            <div className="form_det_grid">
                {showfrom && (
                    <form>
                        <input
                            type="text"
                            placeholder="First Name :"
                            className="elvee_input"
                        />
                        <input
                            type="text"
                            placeholder="Last Name :"
                            className="elvee_input"
                        />
                        <input
                            type="email"
                            placeholder="Email I'D :"
                            className="elvee_input"
                        />
                        <input type="tel" placeholder="Phone :" className="elvee_input" />
                        <input
                            type="text"
                            placeholder="Location :"
                            className="elvee_input"
                        />
                        <div className="input_box_elvee">
                            <input type="text" placeholder="Upload Resume : *" disabled />
                            <label htmlFor="resume" className="elev_resume">
                                Choose a File
                                <input type="file" name="resume" id="resume" hidden />
                            </label>
                        </div>
                        <select className="elvee_input">
                            <option value="IN" defaultValue={"IN"} disabled selected>
                                Select designation
                            </option>
                            <option value="IN">Account</option>
                            <option value="IN">Merchandise</option>
                            <option value="IN">Sales</option>
                            <option value="IN">Designer</option>
                            <option value="IN">Digital Marketing</option>
                            <option value="IN">IT</option>
                        </select>
                        <select className="elvee_input">
                            <option value="IN" defaultValue={"IN"} disabled selected>
                                APPLY FOR COUNTRY
                            </option>
                            <option value="IN">INDIA</option>
                            {/* <option value="IN">USA</option>
                            <option value="IN">UAE</option> */}
                        </select>
                        {/* <textarea placeholder="Message :" className={`elvee_input elvee_textarea`}></textarea> */}
                        <button type="submit" className="elvee_button">
                            Send
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Career;