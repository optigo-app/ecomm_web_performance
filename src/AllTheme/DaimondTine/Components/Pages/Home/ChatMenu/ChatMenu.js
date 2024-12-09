import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./ChatMenu.modul.scss";
import { useMediaQuery } from "@mui/material";

const WhtasIcone = ({phoneNo}) => {

    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNo}&text=Hi, I Need Help with !`;
    const whatsappMobileUrl = `https://api.whatsapp.com/send?phone=${phoneNo}&text=Hi,%20I%20Need%20Help%20with%20!`;
    const isTablet = useMediaQuery('(min-width:600px) and (max-width:899px)');
  return (
    <div className="dt_main_ChatMenu">
      <button className="wai">
        <a
           href={isTablet ? whatsappMobileUrl : whatsappMobileUrl}
          target="_blank"
        >
          <img
            src={`${storImagePath()}/images/wa.png`}
            alt=""
          />
        </a>
      </button>
    </div>
  );
};

export default WhtasIcone;



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

