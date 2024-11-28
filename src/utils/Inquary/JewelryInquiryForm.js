import React, { useState } from 'react';
import './JewelryInquiryForm.scss';

const JewelryInquiryForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        message: '',
        category: '',
        images: [],
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.images.length > 4) {
            setErrors(prevErrors => ({
                ...prevErrors,
                images: 'You can only upload up to 4 images.'
            }));
            return;
        }
        setErrors(prevErrors => ({ ...prevErrors, images: '' }));
        setFormData({ ...formData, images: [...formData.images, ...files] });
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length + formData.images.length > 4) {
            setErrors(prevErrors => ({
                ...prevErrors,
                images: 'You can only upload up to 4 images.'
            }));
            return;
        }
        setErrors(prevErrors => ({ ...prevErrors, images: '' }));
        setFormData({ ...formData, images: [...formData.images, ...files] });
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleImageRemove = (index) => {
        setFormData({
            ...formData,
            images: formData.images.filter((_, i) => i !== index),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, phoneNo, message, category } = formData;
        const newErrors = {};
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Validation checks
        if (!firstName) newErrors.firstName = 'First name is required.';
        if (!lastName) newErrors.lastName = 'Last name is required.';
        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email is invalid.';  
        }
        if (!phoneNo) newErrors.phoneNo = 'Phone number is required.';
        if (!category) newErrors.category = 'Category is required.';
        if (!message) newErrors.message = 'Message is required.';
        // Uncomment and modify this if you have images as part of the form
        // if (formData.images && formData.images.length === 0) newErrors.images = 'At least one image is required.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Form Data:', formData);
        // Add submission logic here (e.g., API call)
    };


    return (
        <form className="jewelry-inquiry-Mainform" onSubmit={handleSubmit}>
            <div className='jewelry-inquiry-form'>
                <h2>Jewelry Inquiry Form</h2>
                <div className="inquiry-section">
                    <div className='inquiry-InputSection0'>

                        <div className="input-wrapper">
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select Category</option>
                                <option value="rings">Rings</option>
                                <option value="necklaces">Necklaces</option>
                                <option value="bracelets">Bracelets</option>
                            </select>
                            {errors.category && <p className="Inqerror">{errors.category}</p>}
                        </div>
                    </div>
                    <div className='inquiry-InputSection1'>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <p className="Inqerror">{errors.firstName}</p>}
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <p className="Inqerror">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className='inquiry-InputSection2'>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="Inqerror">{errors.email}</p>}
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="phoneNo"
                                placeholder="Phone No"
                                value={formData.phoneNo}
                                onChange={handleChange}
                            />
                            {errors.phoneNo && <p className="Inqerror">{errors.phoneNo}</p>}
                        </div>
                    </div>

                    <div className="upload-section">
                        <div
                            className="image-upload"
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            <p>Drag & Drop or Click to Upload Images (up to 4)</p>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageUpload}
                            />
                            {formData.images.length > 0 &&
                                <div className='inquiryPrevImageView'>
                                    {formData.images.map((image, index) => (
                                        <div className="preview-images" key={index}>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`Preview ${index + 1}`}
                                            />
                                            <div className='inquiryBtnImageDiv'>
                                                <button
                                                    className="close-icon"
                                                    onClick={() => handleImageRemove(index)}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            }
                            {errors.images && <p className="Inqerror">{errors.images}</p>}
                        </div>
                    </div>

                    <div className="input-wrapper">
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={4}
                        />
                        {errors.message && <p className="Inqerror">{errors.message}</p>}
                    </div>

                </div>

                <div className='inquirySubmitDiv'>
                    <button type="submit">Submit</button>
                </div>
            </div>
        </form>

    );
};

export default JewelryInquiryForm;
