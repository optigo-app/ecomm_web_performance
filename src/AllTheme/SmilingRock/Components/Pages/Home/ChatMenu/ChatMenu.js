import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./ChatMenu.modul.scss";
import { useMediaQuery } from "@mui/material";

const WhatsAppChat = ({phoneNo,message=encodeURIComponent("Hello, I’m interested in your jewelry collection. Could you please share more details about your products, pricing, and any customization options? Thank you!")}) => {
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNo}&text=Hi, I Need Help with !`;
    const whatsappMobileUrl = `https://api.whatsapp.com/send?phone=${phoneNo}&text=${message}`;
    const isTablet = useMediaQuery('(min-width:600px) and (max-width:899px)');
  return (
    <div className="smr_main_ChatMenu">
      <button className="wai">
        <a
           href={isTablet ? whatsappMobileUrl : whatsappMobileUrl}
          target="_blank"
        >
          <img
            src={`${storImagePath()}/wa.png`}
            alt="whatsapp-icon"
          />
        </a>
      </button>
    </div>
  );
};

export default WhatsAppChat;



// const WhtasIcone = () => {

//   const whatsappUrl = `https://web.whatsapp.com/send?phone=9899778849&text=Hello, Talk to a Jewellery expert now!`;
// return (
//   <div className="dt_Wths_main_ChatMenu">
//     <button className="wa">
//       <a
//         href={whatsappUrl}
//         target="_blank"
//       >
//         <img
//           src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
//           alt=""
//         />
//       </a>
//     </button>
//   </div>
// );
// };

// export default WhtasIcone;

