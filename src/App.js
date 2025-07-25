import "./App.css";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import ThemeRoutes from "./ThemeRoutes";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRemoveAllConsole from "./hooks/useRemoveAllConsole";
function App() {
  const toastStyle = {
    borderRadius: "6px",
    boxShadow: `  rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px`,
    minWidth: "0px",
    width: "fit-content !important",
    padding: "12px 6px !important",
    borderLeft: `8px solid teal`,
    fontSize: "18px",
  };

  // useRemoveAllConsole()
  return (
    <>
      <RecoilRoot>
        <BrowserRouter>
          <ThemeRoutes />
          <ToastContainer
            toastStyle={toastStyle}
            stacked={true}
            hideProgressBar={true}
            autoClose={1400}
            transition={Zoom}
            style={{ zIndex: "9999999999999999", fontFamily: "inherit" }}
          />
        </BrowserRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
