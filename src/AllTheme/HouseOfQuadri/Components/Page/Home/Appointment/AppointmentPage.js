import React, { useState } from 'react';
import './AppointmentPage.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';
import AppointmentForm from './AppointmentForm';

const AppointmentPage = () => {
    const [selectedItem, setSelectedItem] = useState({});
    const items = [
        { id: 1, title: 'Engagement Ring', image: '/Appointment/appointment-jewel-1.png' },
        { id: 2, title: 'Wedding Ring', image: '/Appointment/appointment-jewel-2.png' },
        { id: 3, title: 'Diamonds', image: '/Appointment/appointment-jewel-3.png' },
        { id: 4, title: 'Fine Jewelry', image: '/Appointment/appointment-jewel-4.png' },
        { id: 5, title: 'High End Jewelry', image: '/Appointment/appointment-jewel-5.png' },
        { id: 6, title: 'Letter Diamonds', image: '/Appointment/appointment-jewel-6.png' }
    ];

    const hanldeBook = (item) => {
        setSelectedItem(item);
    }

    return (
        <div className="hoq_appointment-page">
            <div
                className="hoq_bg-imageCart"
            >
                <div className="hoq_overlay" />
                <div className="hoq_text-container">
                    <div className="hoq_textContainerData">
                        <h1
                            className="hoq_designCounttext"
                        >
                            BOOK AN APPOINTMENT<br />
                        </h1>
                    </div>
                </div>
            </div>
            <p className="hoq_intro">
                Welcome to Sonasons your premier destination for exquisite labgrown diamonds.
                Schedule an appointment today to experience the brilliance and beauty of our lab-grown diamonds and let Sonasons help you find the perfect piece to cherish forever.
                Experience the brilliance of lab-grown diamonds with Forevery.
                Book an appointment now to view our exquisite collection and discover the sustainable and ethical beauty of labgrown diamonds.
            </p>
            <div className="hoq_itemsMainDiv">
                {Object.keys(selectedItem).length === 0 && selectedItem.constructor === Object &&
                    <div className="hoq_itemsSubDiv">
                        <h3 className='title_hoq_App'>The kind of jewelry you are interested in?</h3>
                        <div className="hoq_items-grid">
                            {items.map(item => (
                                <div className="hoq_item-card" key={item.id}>
                                    <div className="hoq_imageDiv">
                                        <img src={`${storImagePath()}${item?.image}`} alt={item?.title} />
                                    </div>
                                    <div className="hoq_item-content">
                                        <h2>{item?.title}</h2>
                                        <button className='hoq_btn_a'  onClick={() => hanldeBook(item)}>BOOK NOW</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {Object.keys(selectedItem).length !== 0 && selectedItem.constructor === Object &&
                    <AppointmentForm selectedItem={selectedItem}  setSelectedItem={setSelectedItem}/>
                }
            </div>
        </div>
    );
};

export default AppointmentPage;
