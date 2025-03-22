import React, { useEffect, useState } from 'react';
import { fetchAPIUrlFromStoreInit } from '../../../../../../utils/Glob_Functions/GlobalFunction'; // Import the fetch function
import './TopSection.modul.scss';

const TopSection = () => {
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    const getStoreData = async () => {
      const fetchedData = await fetchAPIUrlFromStoreInit();
      if (fetchedData && fetchedData.rd && fetchedData.rd[0]) {
        setLocalData(fetchedData.rd[0]);
      } else {
        const getStortInit = JSON.parse(sessionStorage.getItem('storeInit'));
        setLocalData(getStortInit);
      }
    };
    getStoreData();
  }, []);

  return (
    <div>
      {/* Render the image from the fetched data */}
      <img src={`${localData?.ProCatLogbanner}`} className="proCatTopBannerImg" alt="Top Banner" />
    </div>
  );
};

export default TopSection;
