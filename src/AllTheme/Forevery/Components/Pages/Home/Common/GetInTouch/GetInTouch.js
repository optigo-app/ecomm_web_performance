import "./GetInTouch.scss";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import btnstyle from "../../../../scss/Button.module.scss";
import { useNavigate } from "react-router-dom";
const historyImage = `${storImagePath()}/Forevery/82.webp`;

const GetInTouch = ({data}) => {
  const navigate = useNavigate();

  return (
    <div className="for_GetInTouch">
      <main className="main_warapper">
        <div
          className="image_overlay_getin"
          // style={{ background: `url(${historyImage})` }}
          style={{ background: `url(${data?.image?.[1]})` }}
        ></div>
        <div className="image_backward_details">
          <div className="store-content ">
            <p className="for_get_title">
              Experience The Dazzling World Of Lab-Grown Diamonds Today!!
            </p>
            <p className="get_desc">
              Need help finding the perfect jewelry piece? Our jewelry
              specialists are here to assist you with all your queries. With
              their keen eye for detail and expert knowledge, they'll guide you
              toward the perfect addition to your collection. Get in touch with
              us today, and let us help you find the perfect piece!
            </p>
            <div className="store-btns">
              <button
                className={`${btnstyle?.btn_15} forevery-btn-get ${btnstyle?.btn_for_new}`}
                onClick={() => {
                  navigate("/appointment");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Request a Callback
              </button>
              <button className="or">Or</button>
              <button
                className={`${btnstyle?.btn_15} forevery-btn-get ${btnstyle?.btn_for_new}`}
                onClick={() => {
                  navigate("/appointment");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Book a Virtual Appointment
              </button>
            </div>
          </div>
        </div>
      </main>
      <MobileView img={data?.image?.[1]} />
    </div>
  );
};

export default GetInTouch;

const MobileView = ({img}) => {
  return (
    <>
      <div className="mobile-view-page">
        <div className="image">
          {/* <img src={historyImage} alt="" /> */}
          <img src={img} alt="" />
        </div>
        <div className="store-content ">
          <p className="for_get_title">
            Experience The Dazzling World Of Lab-Grown Diamonds Today!!
          </p>
          <p className="get_desc">
            Need help finding the perfect jewelry piece? Our jewelry specialists
            are here to assist you with all your queries. With their keen eye
            for detail and expert knowledge, they'll guide you toward the
            perfect addition to your collection. Get in touch with us today, and
            let us help you find the perfect piece!
          </p>
          <div className="store-btns">
            <button
              className={`${btnstyle?.btn_15} forevery-btn-get ${btnstyle?.btn_for_new}`}
            >
              Request a Callback
            </button>
            <button className="or">Or</button>
            <button
              className={`${btnstyle?.btn_15} forevery-btn-get ${btnstyle?.btn_for_new}`}
            >
              Book a Virtual Appointment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
