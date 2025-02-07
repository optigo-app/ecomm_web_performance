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

            {/* <div
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
            </div> */}
              <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'column',
                        height: '95svh',
                        justifyContent: 'center',
                        backgroundColor: '#f5f5f5',
                        padding: '20px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center'
                    }}>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: 600,
                            margin: '0',
                            color: '#555'
                        }}>
                            You are not logged in
                        </p>
                        <p style={{
                            fontSize: '18px',
                            marginTop: '10px',
                            color: '#777'
                        }}>
                             Please log in to access your cart and proceed with checkout.
                        </p>
                        <button
                            style={{
                                height: '40px',
                                width: '180px',
                                backgroundColor: '#D6B08B',
                                border: 'none',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 500,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                            onClick={() => navigation('/signin')}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#b5946c'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#D6B08B'}
                        >
                            Log in
                        </button>
                    </div>
                {/* // }} onClick={() => navigation('/LoginOption')}>Login</button> */}
        </div>
    )
}
