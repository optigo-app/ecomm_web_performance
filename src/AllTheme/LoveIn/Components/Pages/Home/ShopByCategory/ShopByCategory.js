import React from 'react'
import './ShopByCategory.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const ShopByCategory = () => {
    return (
        <div>
            <div>
                <p className='shopbycategoryTitle'>Shop By Category</p>
                {/* <p className='shopbycategoryTitle'>Find the perfect diamond for you</p>Shop By Category */}
                <div className='shopbycategoryDesc'>
                    <p style={{
                        width: '240px',
                        textAlign: 'center'
                    }} className='shopbycategoryDescp'>Discover KayraCreation Fine Jewelry! Brilliant and Better!</p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }} className='smilingSopCateMain'>
                    <div className='shopByCategoryBox1Main'>
                        <div className='shopByCategoryBox'>
                            <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory1.png`} className='shopByCategoryBoxImg' />
                            <p className='smr_shopByCateTitle' style={{ fontWeight: 500, textAlign: 'center' }}>EARRING</p>
                        </div>
                        <div className='shopByCategoryBox'>
                            <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory2.png`} className='shopByCategoryBoxImg' />
                            <p className='smr_shopByCateTitle' style={{ fontWeight: 500, textAlign: 'center' }}>NACKLACES</p>
                        </div >
                    </div>
                    <div className='shopByCategoryBox2Main'>
                        <div className='shopByCategoryBox'>
                            <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory3.png`} className='shopByCategoryBoxImg' />
                            <p className='smr_shopByCateTitle' style={{ fontWeight: 500, textAlign: 'center' }}>PENDANT</p>
                        </div>
                        <div className='shopByCategoryBox'>
                            <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory4.png`} className='shopByCategoryBoxImg' />
                            <p className='smr_shopByCateTitle' style={{ fontWeight: 500, textAlign: 'center' }}>RING</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopByCategory