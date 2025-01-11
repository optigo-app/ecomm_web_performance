import React from 'react'
import PaymentComponent from '../../../../../../../utils/PaymentComponent/PaymentComponent'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const navigate = useNavigate();
    return (
        <div className='MobileAppPay'>
            <div className="SmiCartListTitle" style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                padding: '.8rem .2rem',
                backgroundColor: 'white',
                zIndex: 1000,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <IoArrowBack style={{
                    height: '25px', width: '25px', marginRight: '10px'
                }} onClick={() => navigate(-1)} />
                <span>Order Summary</span>
            </div>
            <div style={{ paddingTop: '60px' }}>
                <PaymentComponent bgcolor={"#d6b08b"} />
            </div>
        </div>
    )
}

export default Payment
