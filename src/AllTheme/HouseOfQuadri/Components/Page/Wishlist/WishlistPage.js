import React from "react";
import { RelatedProductList } from "../../Constants/TabImages";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import "./Wishlist.modul.scss";
import { IoLogIn } from "react-icons/io5";
import Wishlist from "./Wishlist/Wishlist";

const WishlistPage = () => {
  if(false){
    return (
      <div className="hoq_main_wishlists">
        <div className="heading">
          <h1> My Wishlist</h1>
        </div>
        <div className="social_tags">
          <button>
            <FaShareAlt size={22} /> Share
          </button>
          <span>
            <IoLogIn size={25} /> Please login to save your wishlist across
            devices.
            <button>LOGIN</button>
          </span>
        </div>
        <div className="tab_card">
          {RelatedProductList?.map((val, i) => {
            return (
              <div className="wish_card">
                <Link to={`/products/${val?.id}`}>
                  <div className="details">
                    <span>1 ct Solitaire Pendant</span>
                    <p>11 Jul 2024</p>
                  </div>
                </Link>
                <Link to={`/products/${val?.id}`}>
                  <div className="image">
                    <img src={val?.FrontImg} alt={val?.id} />
                  </div>
                </Link>
                <div className="price">
                  <small>INR 79,000</small>
                </div>
                <div className="btns">
                  <button>Add to Cart</button>
                  <button>
                    <MdDelete fontSize={24} />{" "}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }else{
    return <Wishlist />
  }
 
};

export default WishlistPage;
