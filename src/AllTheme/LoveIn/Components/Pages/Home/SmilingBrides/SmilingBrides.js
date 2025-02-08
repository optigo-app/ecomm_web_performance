import React, { useEffect, useState } from 'react'
import './SmilingBrides.scss'
import { useNavigate } from 'react-router-dom'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'


export default function SmilingBrides({ data }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/productpage')
    }

    // const [storeInit,setStoreInit] = useState();

    // useEffect(()=>{
    //     setTimeout(()=>{
    //         if(Object.keys(JSON.parse(localStorage.getItem("storeInit")))?.length){
    //             let storeinit = JSON.parse(localStorage.getItem("storeInit"))
    //             console.log("storeinit",storeinit?.UploadLogicalPath,storeinit?.ukey,storeinit?.ufcc)
    //             setStoreInit(storeinit)
    //         }
    //     },800)
    // },[])

    return (
        <div className='paddingTopMobileSet smilingBridesCstorMain' style={{ marginTop: '60px' }}>
            <div className='smilingBridesMain'>
                <div className='smilingBrides'>
                    <p style={{
                        color: 'rgb(95,73,122)',
                        fontSize: '25px',
                        textAlign: 'center',
                        textTransform: 'uppercase'
                    }} className='smilingBridesMainTitle'>SIGNATURE COLLECTION</p>
                    <p style={{ textAlign: 'center', color: '#7d7595', padding: '0px 10px 0px 10px' }}>Our goal is to preserve the luxury and joy of
                        fine jewelry without harming the
                        environment in any way. Basically, create a
                        sustainable diamond practice. To make the
                        ultimate diamond jewelry, creativity and
                        science must work simultaneously. The
                        process begins with the idea and ends with a
                        magnificent, dazzling design.</p>
                    {/* <button className='enagementBtn' onClick={handleNavigate} >SHOP NOW</button> */}
                </div>
                <div className='smlingBridesImages'>
                    {/* <img src={bridesImage} className='smilingMainImages' alt={''} /> */}
                    <img src={data?.image?.[1]} className='smilingMainImages' alt={''} />
                </div>
            </div>
        </div>
    )
}
