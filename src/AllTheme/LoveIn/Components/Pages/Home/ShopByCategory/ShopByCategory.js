import React from 'react'
import './ShopByCategory.modul.scss'
import { storImagePath } from '../../../../../../utils/Glob_Functions/GlobalFunction'

const ShopByCategory = () => {
    return (
        <div>
            <div style={{ marginTop: '40px' }} className='ShopBYCateMAin'>
                <p className='shopbycategoryTitle'>View By Category</p>
                <div className='shopbycategoryDesc'>
                    <p className='shopbycategoryDescC' style={{
                        color: 'rgb(95,73,122)',
                        fontSize: '16px',
                        width: '340px',
                        textAlign: 'center'

                    }}>Discover Love in Diamonds Fine Jewelry! Brilliant and elegant!</p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                }} className='smilingSopCateMain'>
                    <div className='shopByCategoryBox1Main'>
                        <div className='shopByCategoryBox'>
                            <img src="https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4925?mode=t" className='shopByCategoryBoxImg' />
                            {/* <img src={`${storImagePath()}/images/HomePage/shopByCategory/shopByCategory1.jpg`} className='shopByCategoryBoxImg' /> */}

                            <p style={{ fontWeight: 500, color: 'rgb(95,73,122)', textAlign: 'center', marginTop: '10px' }}>RINGS</p>
                        </div>
                        <div className='shopByCategoryBox'>
                            <img src="https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-1827?mode=t" className='shopByCategoryBoxImg' />
                            <p style={{ fontWeight: 500, color: 'rgb(95,73,122)', textAlign: 'center', marginTop: '10px' }}>EARRINGS</p>
                        </div>
                    </div>
                    <div className='shopByCategoryBox1Main'>
                        <div className='shopByCategoryBox'>
                            <img src="https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4912?mode=t" className='shopByCategoryBoxImg' />
                            <p style={{ fontWeight: 500, color: 'rgb(95,73,122)', textAlign: 'center', marginTop: '10px' }}>BRACELETS</p>
                        </div>
                        <div className='shopByCategoryBox'>
                            <img src="https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4869?mode=t" className='shopByCategoryBoxImg' />
                            <p style={{ fontWeight: 500, color: 'rgb(95,73,122)', textAlign: 'center', marginTop: '10px' }}>PENDANT</p>
                        </div>
                    </div>
                    <div className='shopByCategoryBox2Main'>
                        <div className='shopByCategoryBox'>
                            <img src="https://console.studio360.tech/explore/e/c/605e8448-ce99-4104-ab1c-77ec1efee4b8/1-4954?mode=t" className='shopByCategoryBoxImg' />
                            <p style={{ fontWeight: 500, color: 'rgb(95,73,122)', textAlign: 'center', marginTop: '10px' }}>NECKLACE</p>
                        </div >
                    </div>
                </div>
            </div>
            <div className='daimondEveryTitleDescsDiv' style={{
                fontSize: '13px',
                margin: '20px 10%',
                textAlign: 'center'
            }}>
                <p className='daimondEveryTitleDescs' style={{ fontSize: '16px', color: '#7d7595' }}>As it is said, “Diamonds have an image of purity and light, and they are given as a pledge of love and
                    worn as a symbol of commitment.” - Peter Singer.
                    Diamonds knit a story unsaid, well as you know, such stories become the history that everyone
                    reads. Love in Diamonds brings you a meticulously curated collection of Diamonds. Diamond jewelry
                    offers an extensive range of categories from which you can pick the finest. Its designs are altering
                    together with vogue because of modernity. Love in Diamonds offers the upmost customer satisfaction
                    and the best lab-grown Diamonds to demonstrate this.
                    That is how we like to introduce our story. Love in Diamonds’ distinctive method for producing Diamonds
                    is made precisely and methodically by us rather than being dug out deep within the earth. This saves the
                    environment and helps us get highly creative with our techniques. Our objective is to offer socially
                    progressive jewelry that accomplishes more than just offering lab-grown diamond jewelry. Love in
                    Diamonds wants to offer upscale diamond jewelry using sustainable practices. We tend to achieve this
                    by producing jewelry with lab-grown Diamonds that will last a lifetime.

                </p>
            </div>
        </div>
    )
}

export default ShopByCategory