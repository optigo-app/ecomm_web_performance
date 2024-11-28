import React, { useEffect, useState } from 'react'
import "./MobVieHeader.css"
import { useSetRecoilState } from 'recoil';
import { FaChevronRight } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { IoArrowBack, IoGiftOutline } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa6";
import { PC_ApploginState } from '../../../Recoil/atom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
const MobViewHeader = (props) => {

    const naviagation = useNavigate();
    const setIsLoginState = useSetRecoilState(PC_ApploginState)

    // const [fName, setFname] = useState('');
    // const [lastNamr, setLasnane] = useState('');
    // const [userMobile, setUserMobile] = useState('');

    // useEffect(() => {
    //     const loginUserDetail = JSON.parse(sessionStorage.getItem('loginUserDetail'));
    //     setFname(loginUserDetail?.firstname);
    //     setLasnane(loginUserDetail?.lastname);
    //     setUserMobile(loginUserDetail?.defaddress_shippingmobile)
    // },[])

    return (
        <div className='header_Account_PCMJ'>
            <div className='container_movh'>
                <p className="SmiCartListTitle">
                    <IoArrowBack
                        style={{ height: "25px", width: "25px", marginRight: "10px" }}
                        onClick={() => naviagation(-1)}
                    />
                    {props?.title}
                </p>
            </div>
        </div>
    )
}

export default MobViewHeader