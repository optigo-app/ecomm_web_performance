import React, { useEffect, useState } from 'react';
import './AppointmentForm.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';

const AppointmentForm = ({ selectedItem, setSelectedItem }) => {
    const [loginDetail, setLoginDetail] = useState(null);
    const [minDateTime, setMinDateTime] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        dateTime: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const islogin = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        setLoginDetail(islogin);
    }, []);

    useEffect(() => {
        const today = new Date();
        const threeDaysFromNow = new Date();
        threeDaysFromNow.setDate(today.getDate() + 3);
        const formatDate = (date) => {
            return date.toISOString().slice(0, 16);
        };
        setMinDateTime(formatDate(threeDaysFromNow));
    }, []);


    useEffect(() => {
        if (loginDetail) {
            setFormData({
                firstName: loginDetail.firstname ?? '',
                lastName: loginDetail.lastname ?? '',
                email: loginDetail.userid ?? '',
                phone: loginDetail.mobileno ?? '',
                message: '',
                dateTime: '',
            });
        }
    }, [loginDetail]);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value,
        }));
        if (value) {
            setErrors(prevErrors => ({
                ...prevErrors,
                [id]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.dateTime) newErrors.dateTime = 'Date & Time is required';
        return newErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            setIsSubmitting(true);
            console.log(formData, "Share details");
            alert('Coming Soon');
            setIsSubmitting(false);
            setFormData({
                firstName: loginDetail.firstname ?? '',
                lastName: loginDetail.lastname ?? '',
                email: loginDetail.userid ?? '',
                phone: loginDetail.mobileno ?? '',
                message: '',
                dateTime: '',
            });
            setSelectedItem({});
        } else {
            setErrors(formErrors);
        }
    };

    const handleEdit = () => {
        setSelectedItem({});
    }

    useEffect(() => {
        window.scrollTo({
            top: 250,
            behavior: "smooth"
        })
    }, [])

    return (
        <div className="form-container">
            <h2>Share details</h2>
            <div className="for_product-detail">
                <img src={`${storImagePath()}${selectedItem?.image}`} alt={selectedItem?.title} />
                <div className="for_product-info">
                    <a>{selectedItem?.title}</a>
                    <button className="for_edit-btn" onClick={handleEdit}>Edit</button>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='for_leftside'>
                    <div className="for_input-group">
                        <div className="for_input-field">
                            <label htmlFor="firstName">First Name*</label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <div className="for_error-message">{errors.firstName}</div>}
                        </div>
                        <div className="for_input-field">
                            <label htmlFor="lastName">Last Name*</label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <div className="for_error-message">{errors.lastName}</div>}
                        </div>
                    </div>
                    <div className="for_input-group">
                        <div className="for_input-field">
                            <label htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="for_error-message">{errors.email}</div>}
                        </div>
                        <div className="for_input-field">
                            <label htmlFor="phone">Phone*</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <div className="for_error-message">{errors.phone}</div>}
                        </div>
                    </div>
                    <div className="for_input-group">
                        <div className="for_input-field">
                            <label htmlFor="message">Message (Optional)</label>
                            <textarea
                                id="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className='for_rightside'>
                    <div className="for_input-group">
                        <div className="for_input-field">
                            <label htmlFor="dateTime">Select a Date & Time*</label>
                            <input
                                type="datetime-local"
                                id="dateTime"
                                value={formData.dateTime}
                                min={minDateTime}
                                onChange={handleChange}
                            />
                            {errors.dateTime && <div className="for_error-message">{errors.dateTime}</div>}
                        </div>
                    </div>
                    <div className="for_button-group">
                        <button type="submit" className="for_primary-btn" disabled={isSubmitting}>Book Appointment</button>
                        <button type="button" className="for_secondary-btn">Request A Callback</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
