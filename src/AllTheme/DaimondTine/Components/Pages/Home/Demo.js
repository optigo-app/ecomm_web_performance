import React from 'react';
import './demo.css';
import {storImagePath} from '../../../../../utils/Glob_Functions/GlobalFunction'

const Demo = () => {
  return (
    <div>
        <header class="diamondtine-header">
        <div class="diamondtine-container diamondtine-header-content">
            <img loading='eager' src="/placeholder.svg?height=50&width=150" alt="Diamondtine Logo" class="diamondtine-logo"/>
            <div class="diamondtine-nav-icons">
                <img loading='eager' src="/placeholder.svg?height=24&width=24" alt="Search" class="diamondtine-nav-icon"/>
                <img loading='eager' src="/placeholder.svg?height=24&width=24" alt="User" class="diamondtine-nav-icon"/>
                <img loading='eager' src="/placeholder.svg?height=24&width=24" alt="Cart" class="diamondtine-nav-icon"/>
            </div>
        </div>
    </header>

    <section class="diamondtine-hero">
        <div class="diamondtine-container">
            <h1>Manifest It</h1>
            <p>featuring Masoom Minawala</p>
            <a href="#" class="diamondtine-cta-button">Explore Collection</a>
        </div>
    </section>

    <div class="diamondtine-container">
        <div class="diamondtine-category-icons">
            <div class="diamondtine-category-icon">★</div>
            <div class="diamondtine-category-icon">♥</div>
            <div class="diamondtine-category-icon">◆</div>
            <div class="diamondtine-category-icon">●</div>
            <div class="diamondtine-category-icon">✧</div>
            <div class="diamondtine-category-icon">♦</div>
        </div>

        <div class="diamondtine-product-grid">
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/bestsellar.webp`} alt="Evil Eye Earrings" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Evil Eye Earrings</h3>
                <p class="diamondtine-product-price">₹ 24,999</p>
            </div>
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/bestsellar.webp`} alt="Leaf Earrings" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Leaf Earrings</h3>
                <p class="diamondtine-product-price">₹ 29,999</p>
            </div>
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/bestsellar.webp`} alt="Diamond Ring" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Diamond Ring</h3>
                <p class="diamondtine-product-price">₹ 34,999</p>
            </div>
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/bestsellar.webp`} alt="Gold Bracelet" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Gold Bracelet</h3>
                <p class="diamondtine-product-price">₹ 39,999</p>
            </div>
        </div>

        <div class="diamondtine-banner">
            <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/promoSetBanner2Img1.png`} alt="For love of sun & sea" />
        </div>

        <div class="diamondtine-product-grid">
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/trending.webp`} alt="Diamond Earrings" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Diamond Earrings</h3>
                <p class="diamondtine-product-price">₹ 44,999</p>
            </div>
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/trending.webp`} alt="Gold Necklace" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Gold Necklace</h3>
                <p class="diamondtine-product-price">₹ 49,999</p>
            </div>
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/PromoBanner_1_old.png`} alt="Evil Eye Bracelet" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Evil Eye Bracelet</h3>
                <p class="diamondtine-product-price">₹ 19,999</p>
            </div>
            <div class="diamondtine-product-card">
                <img loading='eager' src={`${storImagePath()}/images/HomePage/Banner/promoSetBanner2Img2Hover.png`} alt="Diamond Pendant" class="diamondtine-product-image"/>
                <h3 class="diamondtine-product-title">Diamond Pendant</h3>
                <p class="diamondtine-product-price">₹ 54,999</p>
            </div>
        </div>
    </div>

    <section class="diamondtine-instagram-feed">
        <div class="diamondtine-container">
            <h2>Follow Us On Instagram</h2>
            <div class="diamondtine-instagram-grid">
                <div class="diamondtine-instagram-post">
                    <img loading='eager' src={`${storImagePath()}/images/HomePage/Instagram/BottombBanner4.jpg`} alt="Instagram Post 1"/>
                </div>
                <div class="diamondtine-instagram-post">
                    <img loading='eager' src={`${storImagePath()}/images/HomePage/Instagram/BottombBanner5.jpg`} alt="Instagram Post 2"/>
                </div>
                <div class="diamondtine-instagram-post">
                    <img loading='eager' src={`${storImagePath()}/images/HomePage/Instagram/BottombBanner1.jpg`} alt="Instagram Post 3"/>
                </div>
                <div class="diamondtine-instagram-post">
                    <img loading='eager' src={`${storImagePath()}/images/HomePage/Instagram/BottombBanner2.jpg`} alt="Instagram Post 4"/>
                </div>
                <div class="diamondtine-instagram-post">
                    <img loading='eager' src={`${storImagePath()}/images/HomePage/Instagram/BottombBanner3.jpg`} alt="Instagram Post 5"/>
                </div>
            </div>
        </div>
    </section>

    <footer class="diamondtine-footer">
        <div class="diamondtine-container">
            <div class="diamondtine-footer-content">
                <div class="diamondtine-footer-section">
                    <h3>About Diamondtine</h3>
                    <ul>
                        <li><a href="#">Our Story</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                    </ul>
                </div>
                <div class="diamondtine-footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Best Sellers</a></li>
                        <li><a href="#">Sale</a></li>
                    </ul>
                </div>
                <div class="diamondtine-footer-section">
                    <h3>Customer Service</h3>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Shipping & Returns</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                <div class="diamondtine-footer-section">
                    <h3>My Account</h3>
                    <ul>
                        <li><a href="#">Sign In</a></li>
                        <li><a href="#">Order Status</a></li>
                        <li><a href="#">Wishlist</a></li>
                    </ul>
                </div>
            </div>
            <p>&copy; 2024 Diamondtine. All rights reserved.</p>
        </div>
    </footer>
    </div>
  )
}

export default Demo