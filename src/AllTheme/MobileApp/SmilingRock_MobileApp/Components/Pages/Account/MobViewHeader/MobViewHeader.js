import React, { useEffect, useState } from 'react'
import "./MobVieHeader.css"
import { useSetRecoilState } from 'recoil';
import { FaChevronRight } from "react-icons/fa";
import { LuBox } from "react-icons/lu";
import { MdFavoriteBorder } from "react-icons/md";
import { IoGiftOutline } from "react-icons/io5";
import { FaHeadset } from "react-icons/fa6";
import { smrMA_loginState } from '../../../Recoil/atom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';
const MobViewHeader = (props) => {

    const naviagation = useNavigate();
    const setIsLoginState = useSetRecoilState(smrMA_loginState)

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
    <div className='header_Account_SMRM'>
        <div className='container_movh'>

          {/* <div className='titleMain'>
                <div style={{ width: '100%' }}>
                    <p style={{ margin: '0px', fontSize: '25px', fontWeight: 600, paddingInline: '10px' }}>{fName + ' ' + lastNamr}</p>
                    <p style={{ margin: '0px', fontSize: '15px', paddingInline: '10px' }}>+91 {userMobile}</p>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px', paddingInline: '10px' }}>
                        <div className='boxMainTopSection' onClick={() => naviagation('/OrderHistory')}>
                            <LuBox style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Orders</p>
                        </div>
                        <div className='boxMainTopSection' style={{ marginRight: '0px' }} onClick={() => naviagation('/myWishList')}>
                            <MdFavoriteBorder style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Wishlist</p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px', paddingInline: '10px' }}>
                        <div className='boxMainTopSection'>
                            <IoGiftOutline style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Coupons</p>
                        </div>
                        <div className='boxMainTopSection' style={{ marginRight: '0px' }}>
                            <FaHeadset style={{ marginLeft: '15px' }} />
                            <p style={{ margin: '0px 0px 0px 10px', fontWeight: 600, fontSize: '15px' }}>Help Center</p>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='w-100 p-1 d-flex align-items-center h-100 justify-content-between' style={{minHeight:'60px'}}>
                <div onClick={() => naviagation(-1)}><ArrowBackIosIcon sx={{color:'#7d7f85', paddingLeft:'5px', width:'40px'}} /></div>
                <div className='proptitle'>{props?.title}</div>
                <div>&nbsp;&nbsp;&nbsp;</div>
            </div>

        </div>
    </div>
  )
}

export default MobViewHeader