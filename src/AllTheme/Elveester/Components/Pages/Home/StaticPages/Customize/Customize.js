import React, { useEffect } from 'react'
import './Customize.modul.scss'
import { storImagePath } from '../../../../../../../utils/Glob_Functions/GlobalFunction'

const Customize = () => {
    const custArr = [
        {
            image: `${storImagePath()}/images/HomePage/Customize/CustomizeSubBanner1.jpg`,
            title: 'Create New Design',
            para: "If you're the creative type and have a design of your own or have seen a method that has inspired you, we will assist you to place your ideas into precious metals and gemstones. Our designers can run through logistics, feasibility, durability, and affordability with you. This is often a really rewarding process that leads to an ingenious piece of fine jewelry of your own design."
        },
        {
            image: `${storImagePath()}/images/HomePage/Customize/CustomizeSubBanner2.jpg`,
            title: 'Modify Existing Design',
            para: "Custom designs are mostly derived from existing jewelry, preferred with a different shape, size, or color stone. Frequently, our customers desire a piece of jewelry that they like, a touch thinner, longer, taller, or favor a special texture or pattern. We often face a challenge in finding ways to make similar jewelry at a price point that meets your budget. No problem, we will make it for you the way that you want it! You may have even found the right design except for its finishes. Simply switching the stone type or employing a different value could also be only enough to satisfy your personal taste."
        },
    ]

    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        })
    },[])
    return (
        <div className="elv_customize_maindiv">
            <div className="elv_customize_div">
                <img className='elv_customize_image_1' src={`${storImagePath()}/images/HomePage/Customize/CustomizeMainBanner.jpg`} alt="" />
                <div className='elv_customize_details_main'>
                    <h3 className='elv_customise_head_title'>BUILD YOUR OWN UNIQUE DESIGN</h3>
                    <div className="">
                        <h5 className='elv_customise_head_title_1'>TYPES OF DESIGNS</h5>
                        <p className='elv_customize_title_para'>Our designers will work with you and help you to confidently select the elements in jewelry that you will like. It is our responsibility to make sure that we discover your needs before we execute a project for you. We are so confident in the custom jewelry design process that we create all of our customized jewelry on approval.</p>
                    </div>
                    <div className='elv_customize_details_div'>
                        {custArr?.map((items) => {
                            return (
                                <>
                                    <div className='elv_customize_det' key={items}>
                                        <div >
                                            <img className='elv_customize_det_image' src={items?.image} alt="customize images" />
                                        </div>
                                        <div className='elv_customize_det_desc'>
                                            <span className='elv_customize_det_span'>{items?.title}</span>
                                            <p className='elv_customize_det_para'>{items?.para}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customize