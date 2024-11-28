import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import "./HistoryPage.scss";
import btnstyle from "../../../../scss/Button.module.scss";
import { useNavigate } from "react-router-dom";

const historyImage = `${storImagePath()}/Forevery/81.webp`;
const HistoryPage = () => {
  const navigate = useNavigate()
  return (
    <div className="for_HistoryPage">
      <div
        className="history_img"
        style={{
          backgroundImage: `url(${historyImage})`,
        }}
      >
        <div className="details">
          <div className="history-content   text-end w-20">
            <div className="for_de_title">history &amp; heritage</div>
            <span>Uncovering the Legacy of “Forevery”</span>
            <p class="desc">
              Forevery is a brand that believes in the power of luxury and the
              importance of living a happy life. Our aim is to bring the beauty
              and glamour of diamonds to everyone, regardless of their social
              status or financial standing. With premium lab-grown diamond
              jewelry, we aim to create a world where “Everyone” has the chance
              to experience the joy and elegance of wearing a diamond.
            </p>
            <button
              className={`${btnstyle?.btn_15} forevery-btn ${btnstyle?.btn_for_new}`}
              href="about-us"
              onClick={()=>navigate('/about-us')}
              style={{cursor:"pointer"}}
            >
              Discover More About Us
            </button>
          </div>
        </div>
      </div>
      <MobilePage />
    </div>
  );
};

export default HistoryPage;

const MobilePage = () => {
  return (
    <>
      <div className="m-h-pages">
        <div className="image">
          <img src={historyImage} alt="" />
        </div>
        <div className="title">
          <h1>Uncovering the Legacy of “Forevery”</h1>
        </div>
        <div className="desc">
          <p>
            Forevery is a brand that believes in the power of luxury and the
            importance of living a happy life. Our aim is to bring the beauty
            and glamour of diamonds to everyone, regardless of their social
            status or financial standing. With premium lab-grown diamond
            jewelry, we aim to create a world where “Everyone” has the chance to
            experience the joy and elegance of wearing a diamond.
          </p>
        </div>
        <button
          className={`${btnstyle?.btn_15} forevery-btn ${btnstyle?.btn_for_new}`}
          href="about-us"
        >
          Discover More About Us
        </button>
      </div>
    </>
  );
};
