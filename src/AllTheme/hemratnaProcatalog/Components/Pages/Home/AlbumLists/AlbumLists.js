import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './AlbumLists.modul.scss';

const AlbumLists = () => {
    const navigate = useNavigate();
    const [isSignin, setIsSignIn] = useState(false);
  const loginCredsdata = JSON.parse(sessionStorage.getItem('loginCreds'))

  useEffect(() => {
    if (loginCredsdata && loginCredsdata.length > 0) {
      setIsSignIn(true)
    }
  }, []);

    return (
        <>
            <div className='hem_AlbumListsMain_div'>
                <div className='hem_AlbumLists_div'>
                    <div className='hem_AlbumLists_sec1'>
                        <div className='hem_AlbumLists_albums'>
                            <div className='hem_AlbumLists_ablums_category'>
                                    <div className='hem_AlbumLists_cat2'>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/XFp50kWVSJMDAyNzIzOQ==/Red_Medium/0027239_29062024115719240.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               bangles
                                            </span>
                                        </div>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/vK1898qbJJMDAxOTg2NQ==/Red_Medium/0019865_22042024172330185.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               Bracelet
                                            </span>
                                        </div>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/zWYYhn0IeOMDAyNjMwOA==/Red_Medium/0026308_15062024184931938.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               Earing
                                            </span>
                                        </div>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/z2WLvh7Q7kMDAyNDE3Nw==/Red_Medium/0024177_26012024113337286.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               Kada
                                            </span>
                                        </div>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/AlbumImages/QWxidW1fNjM5/Ms set Color Stone_25062024111446973.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               Ms Set
                                            </span>
                                        </div>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/zwZtXay67gMDAyNTQ3MA==/Red_Medium/0025470_30042024111155618.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               P. set
                                            </span>
                                        </div>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/ZwvxeSmoD5MDAyNzA4Nw==/Red_Medium/0027087_19062024185143722.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               Ring
                                            </span>
                                        </div>
                                        <div className='hem_AlbumLists_subCat_div'>
                                            <div className='hem_AlbumLists_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_AlbumLists_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img onClick={() => navigate('/pro-album')} className={`hem_AlbumLists_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/ZksuqACHb6MDAyNzAzNw==/Red_Medium/0027037_19062024121656041.jpg' />
                                            </div>

                                            <span className='hem_AlbumLists_subCat_names'>
                                               Set
                                            </span>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AlbumLists