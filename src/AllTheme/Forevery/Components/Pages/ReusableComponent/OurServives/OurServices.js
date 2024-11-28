import React from 'react';
import './OurServices.scss';
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction';


const Services = ({ title, services }) => {
  return (
    <div className='for_serviceMainDiv'>
      <h2>{title}</h2>
      <div className="for_services-container">
        <div className="for_services-list">
          {services?.map((service, index) => (
            <div className="for_service-item" key={index}>
              <img src={`${storImagePath()}${service?.image}`} alt={service?.title} />
              <h3>{service?.title}</h3>
              <p>{service?.description}</p>
              <a href={service?.link}>{service?.btnText}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
