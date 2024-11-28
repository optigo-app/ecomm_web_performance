import React, { useEffect } from 'react'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction';
import './History.modul.scss';

const History = () => {
    const historyData = [
        { year: '2017', description: 'Elvee was established', active: false },
        { year: '2019', description: 'Promise Brand Was established', active: true },
        { year: '2021', description: 'The foundation of our new factory at ichchapore was laid and expanded to a fully functional production unit of about 75000 Sq.ft.', active: false },
        { year: '2022', description: 'Started operation in USA and started corporate exposure.', active: true },
        { year: '2023', description: 'Started four more brands.', active: false },
        { year: '2024', description: 'Started operation at new factory, Ichachapore.', active: true }
    ];

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    }, [])
    return (
        <div className="elv_history_maindiv">
            <div className="elv_history_div">
                <img className='elv_history_mainImg' src={`${storImagePath()}/images/HomePage/History/HistoryMainBanner.jpg`} alt="aboutus.png" />
                <div className='elv_history_details_div'>
                    <h3 className='elv_history_head_title'>our history</h3>
                    <div className='elv_history_details'>
                        <p className='elv_history_paragraph'>Welcome to our History page, where we invite you to embark on an exciting journey through the annals of time. From ancient civilizations to modern-day marvels, we've curated a captivating collection of historical events, stories, and personalities that have shaped the world we live in today. Join us as we unravel the threads of history, gaining insights into the past and discovering how it influences our present and future.</p>
                    </div>
                    <div className="elv_history_journey_div" style={{ marginTop: '6rem', marginBottom: '2rem' }}>
                        <div className="elv_history_journey_1">
                            {historyData.map((item, index) => (
                                <div className={`elv_history_journey_design ${index > 0 ? 'mt-5' : ''}`} key={index}>
                                    <div className='elv_history_jour_1'>
                                        <div className={item.active ? 'elv_history_desc_1_active' : 'elv_history_desc_1'}>
                                            <span className='elv_his_journey_text_1'>{item.year}</span>
                                            <span className='elv_his_journey_text_2'>{item.description}</span>
                                        </div>
                                    </div>
                                    <div className='elv_history_jour_2'>
                                        <div className={item.active ? 'elv_history_desc_2' : 'elv_history_desc_2_active'}>
                                            {!item.active && (
                                                <>
                                                    <span className='elv_his_journey_text_1'>{item.year}</span>
                                                    <span className='elv_his_journey_text_2'>{item.description}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="elv_history_journey_2">
                            <div>
                                <img className='elv_history_jor_img' src={`${storImagePath()}/images/HomePage/History/HistorySubBanner1.jpg`} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History