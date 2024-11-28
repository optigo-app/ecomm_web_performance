import React from 'react'
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'
import noData from '../../Assets/noData.png'
import './WithoutLoginCart.modul.scss'

export default function WithoutLoginCart() {

    const navigation = useNavigate();

    return (
        <div>
            <p className="SmiCartListTitle">
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px' }} onClick={() => navigation('/')} />My Cart
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "170px 0px",
                }}
            >
                <img src={noData} style={{ height: '180px', width: '190px' }} />
                <p style={{ fontWeight: 600, fontSize: '20px' }}>Missing Cart Items?</p>
                <button style={{
                    height: '35px',
                    width: '150px',
                    backgroundColor: 'rgb(214 176 139)',
                    color: 'white',
                    border: 'none',
                    outline: 'none',
                    fontSize: '18px',
                    fontWeight: 500,
                    borderRadius: '5px',
                    marginTop: '5px'
                }} onClick={() => navigation('/signin')}>Login</button>
                {/* // }} onClick={() => navigation('/LoginOption')}>Login</button> */}
            </div>
        </div>
    )
}
