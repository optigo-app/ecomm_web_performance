import React, { useEffect, useRef, useState } from 'react';
import { MdDateRange } from "react-icons/md";
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { ImClock2 } from "react-icons/im";
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import './Appointment.scss';

const Appointment = () => {
    const [selectedbox, setselectedbox] = useState(null);
    const [selectedDate, setSelectedDate] = useState();

    const inputRef = useRef(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.showPicker()
        }
    };

    useEffect(() => {
        window.scrollTo({
            behavior: "smooth",
            top: 0
        });
    }, []);


    const appointment = [
        { src: `${storImagePath()}/images/HomePage/Appointment/Collection.jpg`, alt: "Collection" },
        { src: `${storImagePath()}/images/HomePage/Appointment/Engagement_Ring.jpg`, alt: "Engagement-Ring" },
        { src: `${storImagePath()}/images/HomePage/Appointment/Fine_Jewellery.jpg`, alt: "Fine-Jewellery" },
        { src: `${storImagePath()}/images/HomePage/Appointment/Gold_Jewellery.jpg`, alt: "Gold-Jewellery" },
        { src: `${storImagePath()}/images/HomePage/Appointment/High_Jewellery.jpg`, alt: "High-Jewellery" },
        { src: `${storImagePath()}/images/HomePage/Appointment/Men's_Jewellery.jpg`, alt: "Men-s-Jewellery" },
        { src: `${storImagePath()}/images/HomePage/Appointment/Others.jpg`, alt: "Others" },
        { src: `${storImagePath()}/images/HomePage/Appointment/Wedding_Ring.jpg`, alt: "Wedding-Ring" },
    ];

    return (
        <div className="eleev_appointment_page">
            <div className="elvee_banner_app">
                <div className="content">
                    <p>
                        Visit our Jewelry stores to schedule a personalized consultation at one of our stores to discover the perfect ethically sourced fine jewelry piece for your milestone moments.
                    </p>
                </div>
                <div className="image">
                    <img src={`${storImagePath()}/images/HomePage/Appointment/Book_Appointment.jpg`} alt="aa" />
                </div>
            </div>
            <div className="grid_col_2_elvee">
                <div className="grid_content_banner">
                    <h1>Book an Appointment</h1>
                    <p>Our commitment is to provide you with the highest level of jewelry care services. Our experts will be delighted to offer you advice and services to personalize your jewels, restore them, or simply preserve their beauty and longevity.</p>
                </div>
                <div className="grid_layout_card">
                    <div className="service_bar">
                        {/* <span>Select a service</span> */}
                    </div>
                    {/* <div className="layout_elvee_grid">
                        {appointment.map((val, i) => (
                            <div
                                key={i}
                                onClick={() => setselectedbox(i)}
                                style={selectedbox === i ? { border: "2px solid rgb(0, 0, 34)" } : {}}
                                className="elvee_card_app"
                            >
                                <div className="image_card_elevee">
                                    <img src={val.src} alt={val.alt} />
                                </div>
                                <div className="det_elvee_card">{val.alt}</div>
                            </div>
                        ))}
                    </div> */}
                    <div className="from_elvee_appointmnet">
                        <div className="service_bar">
                            <span>Your Appointment</span>
                        </div>
                        <div className="time_grid_elvee">
                            {/* <label className='elv_lab_1'>
                                <input
                                    type="date"
                                    ref={dateRef}
                                    value={selectedDate}
                                    style={{ display: 'none' }} // Hide the input field
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        console.log('Selected date:', e.target.value); // Debugging line
                                    }}
                                />
                                <input
                                    type="text"
                                    value={selectedDate}
                                    placeholder="Date: dd/mm/yy"
                                    onClick={() => dateRef.current && dateRef.current.focus()} // Focus instead of click
                                    readOnly // Make it read-only to prevent typing
                                />
                                <MdDateRange
                                    className='elv_date_icon'
                                    onClick={() => dateRef.current && dateRef.current.focus()} // Focus instead of click
                                    size={26}
                                />
                            </label> */}
                            <label className='elv_lab_2'>
                                <input type="datetime-local" ref={inputRef} placeholder="Time: hh:mm" />
                                <ImClock2 className='elv_date_icon' size={26} onClick={() => {
                                    inputRef.current.showPicker();
                                }} />
                            </label>
                            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DateTimePicker']} sx={{ width: '48%' }}>
                                    <DateTimePicker
                                        className="elv_date_time_picker"
                                        label="Select date and time"
                                        value={selectedDate}
                                        onChange={(newValue) => setSelectedDate(newValue)}
                                    />
                                </DemoContainer>
                            </LocalizationProvider> */}
                        </div>
                        <div className="service_bar">
                            <span>Your Details</span>
                        </div>
                        <form className="form_grid_elvee">
                            <input type="text" placeholder="Title:" className="elvee_input_from" />
                            <input type="text" placeholder="First Name:" className="elvee_input_from" />
                            <input type="text" placeholder="Last Name:" className="elvee_input_from" />
                            <input type="tel" placeholder="Phone:" className="elvee_input_from" />
                            <input type="email" placeholder="Email ID:" className="elvee_input_from" />
                            <input type="text" placeholder="Location:" className="elvee_input_from" />
                            <div className="btn_el_vee">
                                <button type="submit">Book Appointment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;
