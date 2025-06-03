import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '@mui/material'
import './LoginComponent.scss';

const LoginComponent = () => {

    const navigate = useNavigate();

    return (
        <Card className='srmm_loginCompo_div' style={{ boxShadow: "none" }}>
            <div>
                <div className='srmm_text_1'>Let's get personal</div>
                <div className='srmm_text_2'>Sign in for a tailored shopping experience</div>
                <div className='srmm_loginCompo_buttons_div'>
                    <Button className='srmm_button_1' onClick={() => navigate("/signup")}>Register</Button>
                    <Button className='srmm_button_2' onClick={() => navigate("/signin")}>Sign in</Button>
                </div>
            </div>
        </Card>
    )
}

export default LoginComponent
