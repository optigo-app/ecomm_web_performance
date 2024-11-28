import React, { useEffect, useState } from 'react'
import './ProAlbum.modul.scss';
import TopBanner from '../TopBanner/TopBanner';

const ProAlbum = () => {
    const [isWidthLesserThan800, setIsWidthLesserThan800] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isSignin, setIsSignIn] = useState(false);
    const loginCredsdata = JSON.parse(sessionStorage.getItem('loginCreds'))
  
    useEffect(() => {
      if (loginCredsdata && loginCredsdata.length > 0) {
        setIsSignIn(true)
      }
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 800) {
                setIsWidthLesserThan800(true)
            } else {
                setIsWidthLesserThan800(false)
                setIsOpen(false);
            }
        }
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize)
    }, [isWidthLesserThan800])
    return (
        <>
             <TopBanner />           
            <div className='hem_ProAlbumMain_div'>
                <div className='hem_ProAlbum_div'>
                    <div className='hem_ProAlbum_sec1'>
                        <div className='hem_ProAlbum_albums'>
                            <div>
                                <img className='hem_ProAlbum_album_img' src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/XFp50kWVSJMDAyNzIzOQ==/Red_Medium/0027239_29062024115719240.jpg' />
                            </div>
                            <div className='hem_ProAlbum_ablums_category'>
                                <div className='hem_ProAlbum_cat1'>
                                    <div className='hem_ProAlbum_category_name'>
                                        <span>Bangles</span>
                                    </div>
                                    <span className='hem_ProAlbum_catgoey_items'>31 items in 3 brands</span>
                                </div>
                                {!isWidthLesserThan800 && (
                                    <div className='hem_ProAlbum_cat2'>
                                        <div className='hem_ProAlbum_subCat_div'>
                                            <div className='hem_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img className={`hem_ProAlbum_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/XFp50kWVSJMDAyNzIzOQ==/Red_Medium/0027239_29062024115719240.jpg' />
                                            </div>

                                            <span className='hem_ProAlbum_subCat_names'>
                                                bangles+color stone
                                            </span>
                                            <span className='hem_ProAlbum_subCat_items'>
                                                14 items
                                            </span>
                                        </div>
                                        <div className='hem_ProAlbum_subCat_div'>
                                            <div className='hem_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img className={`hem_ProAlbum_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/AlbumImages/QWxidW1fNTg3/Bangles%20CZ_25042024152247185.jpg' />
                                            </div>
                                            <span className='hem_ProAlbum_subCat_names'>
                                                bangles+cz
                                            </span>
                                            <span className='hem_ProAlbum_subCat_items'>
                                                15 items
                                            </span>
                                        </div>
                                        <div className='hem_ProAlbum_subCat_div'>
                                            <div className='hem_lockIcon_div'>
                                                {isSignin === false && (
                                                    <svg class="hem_lockicon" viewBox="0 0 24 24">
                                                        <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                        </path>
                                                    </svg>
                                                )}
                                                <img className={`hem_ProAlbum_category_img ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/AlbumImages/QWxidW1fNTk5/Bangles%20MOP_25042024151905779.jpg' />
                                            </div>
                                            <span className='hem_ProAlbum_subCat_names'>
                                                bangles+mop
                                            </span>
                                            <span className='hem_ProAlbum_subCat_items'>
                                                2 items
                                            </span>
                                        </div>
                                    </div>
                                )}
                                {isWidthLesserThan800 && (
                                    <div className='hem_ProAlbum_cat2_sm'>
                                        <div >
                                            <button onClick={handleToggle} className='hem_ProAlbum_show_more'>Show More</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {isOpen && (
                        <div className='hem_ProAlbum_sec1_New'>
                            <div className='hem_ProAlbum_albums'>
                                <div className='hem_ProAlbum_cat2'>
                                    <div className='hem_ProAlbum_subCat_div'>
                                        <div className='hem_lockIcon_div'>
                                            {isSignin === false && (
                                                <svg class="hem_lockicon" viewBox="0 0 24 24">
                                                    <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                    </path>
                                                </svg>
                                            )}
                                            <img className={`hem_ProAlbum_category_img_New ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/Design_Image/XFp50kWVSJMDAyNzIzOQ==/Red_Medium/0027239_29062024115719240.jpg' />
                                        </div>
                                        <span className='hem_ProAlbum_subCat_names_New'>
                                            bangles+color stone
                                        </span>
                                        <span className='hem_ProAlbum_subCat_items_New'>
                                            14 items
                                        </span>
                                    </div>
                                    <div className='hem_ProAlbum_subCat_div'>
                                        <div className='hem_lockIcon_div'>
                                            {isSignin === false && (
                                                <svg class="hem_lockicon" viewBox="0 0 24 24">
                                                    <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                    </path>
                                                </svg>
                                            )}
                                            <img onClick={() => alert("CLiked")} className={`hem_ProAlbum_category_img_New ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/AlbumImages/QWxidW1fNTg3/Bangles%20CZ_25042024152247185.jpg' />
                                        </div>
                                        <span className='hem_ProAlbum_subCat_names_New'>
                                            bangles+cz
                                        </span>
                                        <span className='hem_ProAlbum_subCat_items_New'>
                                            15 items
                                        </span>
                                    </div>
                                    <div className='hem_ProAlbum_subCat_div'>
                                        <div className='hem_lockIcon_div'>
                                            {isSignin === false && (
                                                <svg class="hem_lockicon" viewBox="0 0 24 24">
                                                    <path d="M12.63,2C18.16,2 22.64,6.5 22.64,12C22.64,17.5 18.16,22 12.63,22C9.12,22 6.05,20.18 4.26,17.43L5.84,16.18C7.25,18.47 9.76,20 12.64,20A8,8 0 0,0 20.64,12A8,8 0 0,0 12.64,4C8.56,4 5.2,7.06 4.71,11H7.47L3.73,14.73L0,11H2.69C3.19,5.95 7.45,2 12.63,2M15.59,10.24C16.09,10.25 16.5,10.65 16.5,11.16V15.77C16.5,16.27 16.09,16.69 15.58,16.69H10.05C9.54,16.69 9.13,16.27 9.13,15.77V11.16C9.13,10.65 9.54,10.25 10.04,10.24V9.23C10.04,7.7 11.29,6.46 12.81,6.46C14.34,6.46 15.59,7.7 15.59,9.23V10.24M12.81,7.86C12.06,7.86 11.44,8.47 11.44,9.23V10.24H14.19V9.23C14.19,8.47 13.57,7.86 12.81,7.86Z">
                                                    </path>
                                                </svg>
                                            )}
                                            <img className={`hem_ProAlbum_category_img_New ${isSignin ? '' : 'disable_pointer_events'}`} src='https://cdnfs.optigoapps.com/content-global3/hemratnaj4TSFKRAE5XUD96V2L/AlbumImages/QWxidW1fNTk5/Bangles%20MOP_25042024151905779.jpg' />
                                        </div>
                                        <span className='hem_ProAlbum_subCat_names_New'>
                                            bangles+mop
                                        </span>
                                        <span className='hem_ProAlbum_subCat_items_New'>
                                            2 items
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default ProAlbum