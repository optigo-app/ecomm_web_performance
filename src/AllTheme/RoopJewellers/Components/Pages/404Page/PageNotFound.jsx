import React from 'react';
import './Styles.css';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () =>{
    navigate('/')
  }

  return (
    <div className='main404PageDiv'>
      <div id="error-page">
        <div className="content">
          <h2 className="header" data-text="404">
            404
          </h2>
          <h4 data-text="Opps! Page not found">
            Opps! Page not found
          </h4>
          <p>
            Sorry, the page you're looking for doesn't exist.
          </p>
          <div className="btns" onClick={handleRedirect}>
            <p>Return Home</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
