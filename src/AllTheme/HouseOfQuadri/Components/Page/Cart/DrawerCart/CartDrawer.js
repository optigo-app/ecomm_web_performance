import { IoClose } from "react-icons/io5";
import "./CartDrawer.modul.scss";
import { Drawer, IconButton, Typography } from "@mui/material";
import QuantityCom from "../../../common/QuantityCom";
import { Link } from "react-router-dom";
import noimage from '../../../Assets/noImageFound.jpg'
const CartDrawer = ({ width, close }) => {
  const PolyFill = Array.from({ length: 8 });
  return (
    <Drawer
      anchor="right"
      open={width}
      onClose={close}
      className="hoq_main_CartDrawer"
      sx={{
        zIndex: "454545",
      }}
    >
      {PolyFill?.length == 0 ? (
        <>
          <div className="head">
            <Typography variant="h4" component="span">
              Cart
            </Typography>
            <IconButton onClick={close}>
              <IoClose size={24} />
            </IconButton>
          </div>
          <h1 className="empty_cart_head">Your cart is currently empty.</h1>
        </>
      ) : (
        <>
          <div className="head">
            <Typography variant="h4" component="span">
              Cart
            </Typography>
            <IconButton onClick={close}>
              <IoClose size={24} />
            </IconButton>
          </div>
          <div className="cartItem_list">
            {PolyFill.map((val, i) => (
              <CartCard key={i} close={close} />
            ))}
          </div>
          <div className="subtotal">
            <span>SUBTOTAL</span>
            <span>INR 277,000</span>
          </div>
          <div className="tax_head">
            <small>
              Shipping, taxes, and discount codes calculated at checkout.
            </small>
          </div>
          <div className="checkout_btn">
            <button>Check Out</button>
          </div>
        </>
      )}
    </Drawer>
  );
};
export default CartDrawer;

const CartCard = ({ close }) => {
  return (
    <div className="cart_card">
      <div className="cart_p_image">
        <Link to={"/products/5-stone-band"}>
          <img
            src={noimage}
            alt=""
            onClick={close}
          />
        </Link>
      </div>
      <div className="cart_p_details">
        <Link to={"/products/5-Stone-Band"}>
          <div className="title" onClick={close}>
            <h3>5 Stone Band</h3>
          </div>
        </Link>
        <div className=" ring_size    color">
          <span>
            Ring Size: <small>{"15"}</small>
          </span>
          <span>
            Color: <small>{"White"}</small>
          </span>
        </div>
        <div className="price_quantity ">
          <QuantityCom />
          <h4 className="price">INR 120,000</h4>
        </div>
      </div>
    </div>
  );
};
