import React, { useEffect, useState } from 'react'
import { PC_AppCartCount, PC_AppWishCount, PC_AppcompanyLogo, PC_ApploginState } from '../../../Recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import './Header.modul.scss'
import { Badge, Tooltip } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from '@mui/icons-material/Search';
import { FiArrowLeft } from "react-icons/fi";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { GetCountAPI } from '../../../../../../../utils/API/GetCount/GetCountAPI';
import Cookies from 'js-cookie'
import Pako from 'pako';



const Header = () => {

  const compnyLogo = useRecoilValue(PC_AppcompanyLogo);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const navigation = useNavigate();
  const [isB2bFlag, setIsB2BFlaf] = useState('');
  const [cartCountNum, setCartCountNum] = useRecoilState(PC_AppCartCount)
  const [wishCountNum, setWishCountNum] = useRecoilState(PC_AppWishCount)
  const [islogin, setislogin] = useRecoilState(PC_ApploginState);

  let cookie = Cookies.get('visiterId')


  useEffect(() => {
    let storeinit = JSON.parse(sessionStorage.getItem("storeInit"));
    setIsB2BFlaf(storeinit?.IsB2BWebsite);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  useEffect(() => {
    GetCountAPI(cookie).then((res) => {
      if (res) {
        setCartCountNum(res?.cartcount)
        setWishCountNum(res?.wishcount)
      }
    }).catch((err) => {
      if (err) {
        console.log("getCountApiErr", err);
      }
    })
  }, [])


  const compressAndEncode = (inputString) => {
    try {
      const uint8Array = new TextEncoder().encode(inputString);
      const compressed = Pako.deflate(uint8Array, { to: 'string' });
      return btoa(String.fromCharCode.apply(null, compressed));
    } catch (error) {
      console.error('Error compressing and encoding:', error);
      return null;
    }
  };

  const searchDataFucn = (e) => {
    if (e.key === "Enter") {
      if (searchText) {
        let loginInfo = JSON.parse(sessionStorage.getItem("loginUserDetail"));
        let storeInit = JSON.parse(sessionStorage.getItem("storeInit"));
        let obj = {
          a: "",
          b: searchText,
          m: loginInfo?.MetalId ?? storeInit?.MetalId,
          d: loginInfo?.cmboDiaQCid ?? storeInit?.cmboDiaQCid,
          c: loginInfo?.cmboCSQCid ?? storeInit?.cmboCSQCid,
          f: {},
        };

        let encodeObj = btoa(JSON.stringify(obj))
        navigation(`/p/${searchText}?S=${encodeObj}`);
        setSearchText("")
      }
    }
  };


  // const searchDataFucn = (e) => {
  //   if(e.key === 'Enter'){
  //     if(searchText){
  //       navigation(`/p/${searchText}/?S=${btoa(searchText)}`)
  //       console.log("searchtext",searchText);
  //     }
  //   }else{
  //     if(searchText){
  //       navigation(`/p/${searchText}/?S=${btoa(searchText)}`)
  //       console.log("searchtext",searchText);
  //     }
  //   }
  // }

  console.log('ddddddddd', location);

  const handleNaviagteSearch = () => {

    if (isB2bFlag == 1) {
      if (islogin == false) {

      } else {
        navigation('/SearchPage')
      }
    } else {
      navigation('/SearchPage')
    }
  }
  return (
    <div>
      {(location.pathname.split('/')[1] === "p") || (location.pathname.split('/')[1] === "d") ?
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: '10px', height: '50px', position: 'fixed', width: '100%', alignItems: 'center', padding: '0px 0px 0px 5px', borderBottom: '1px solid lightgray', backgroundColor: 'white', zIndex: '111111' }}>
          <FiArrowLeft style={{ height: '25px', width: '25px' }} onClick={() => navigation(-1)} />
          <ul className="mobileViewTopIconeMain" style={{ listStyle: 'none', margin: '0px', display: 'flex', padding: '0px', width: '90%' }}>
            <div className="smeMASearchBoxDiv">
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="smeMASearchBoxInputDiv"
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    searchDataFucn(event);
                  }
                }}
              />
              <div style={{ width: '30px' }} onClick={(e) => searchDataFucn(e)} >
                <SearchIcon />
              </div>
            </div>
            <Badge
              badgeContent={cartCountNum}
              overlap={"rectangular"}
              color="secondary"
              style={{ marginTop: '5px', marginLeft: '5px' }}
              className="mobileCartIconePage"
            >
              <Tooltip title="Cart">
                <li
                  onClick={() => navigation('/CartPage')}
                  // onClick={toggleCartDrawer(true)}CartPage
                  style={{
                    marginTop: "0px",
                    cursor: "pointer",
                  }}
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ height: '25x', width: '25px' }}
                  />
                </li>
              </Tooltip>
            </Badge>
          </ul>
        </div>

        :

        (location.pathname === "CartPage") ?
          ""
          :
          <div className='smrMA_HeaderMain' style={{ height: isB2bFlag == 1 ? islogin == true ? '113px' : '60px' : '113px' }}>
            <div className='smrMA_Top_header_sub'>
              <div className='smrMA_Div1Main'>
                {/* <a href="/"> */}
                <img src={compnyLogo} loading='lazy' className='smrMA_logo_header' />
                {/* </a> */}
                {/* {isB2bFlag == 1 ?
                  islogin == false ?
                    ''
                    :
                    <Badge
                      badgeContent={wishCountNum}
                      overlap={"rectangular"}
                      color="secondary"
                      style={{ marginInline: '6px' }}
                      className="smilingHeaderWhishlistIcon"
                    // className="smilingHeaderWhishlistIcon badge12"
                    >
                      <Tooltip title="WishList">
                        <li style={{ listStyle: 'none' }} onClick={() => navigation("/myWishList")}>
                          <FavoriteBorderIcon
                            style={{
                              height: "25px",
                              cursor: "pointer",
                              width: "25px",
                              // color: "white",
                            }}
                            className="mobileViewSmilingTop1Icone"
                          />
                        </li>
                      </Tooltip>
                    </Badge>
                  :
                  <Badge
                    badgeContent={wishCountNum}
                    overlap={"rectangular"}
                    color="secondary"
                    style={{ marginInline: '6px' }}
                    className="smilingHeaderWhishlistIcon"
                  // className="smilingHeaderWhishlistIcon badge12"
                  >
                    <Tooltip title="WishList">
                      <li style={{ listStyle: 'none' }} onClick={() => navigation("/myWishList")}>
                        <FavoriteBorderIcon
                          style={{
                            height: "25px",
                            cursor: "pointer",
                            width: "25px",
                            // color: "white",
                          }}
                          className="mobileViewSmilingTop1Icone"
                        />
                      </li>
                    </Tooltip>
                  </Badge>
                } */}

              </div>
              {isB2bFlag == 1 ?
                islogin == true ?
                  <div>
                    <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                      <input
                        type="text"
                        placeholder="Search..."
                        // value={searchText}
                        // onChange={(e) => setSearchText(e.target.value)}
                        className="searchBoxOnlyHeaderFiexed"
                      // onKeyDown={(event) => {
                      //   if (event.key === 'Enter') {
                      //     searchDataFucn();
                      //     setSerachShowOverlay(false);
                      //   }
                      // }}
                      />
                      <SearchIcon onClick={handleNaviagteSearch} />
                    </div>
                  </div>
                  : ''
                :
                <div>
                  <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                    <input
                      type="text"
                      placeholder="Search..."
                      // value={searchText}
                      // onChange={(e) => setSearchText(e.target.value)}
                      className="searchBoxOnlyHeaderFiexed"
                    // onKeyDown={(event) => {
                    //   if (event.key === 'Enter') {
                    //     searchDataFucn();
                    //     setSerachShowOverlay(false);
                    //   }
                    // }}
                    />
                    <SearchIcon onClick={handleNaviagteSearch} />
                  </div>
                </div>
              }
            </div>


            {isB2bFlag == 1 ?
              islogin == true ?
                <div
                  className={`smrMA_Fixed_Header ${isHeaderFixed ? "fixed" : ""}`}
                >

                  <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                    <input
                      type="text"
                      placeholder="Search..."
                      // value={searchText}
                      // onChange={(e) => setSearchText(e.target.value)}
                      className="searchBoxOnlyHeaderFiexed"
                    // onKeyDown={(event) => {
                    //   if (event.key === 'Enter') {
                    //     searchDataFucn();
                    //     setSerachShowOverlay(false);
                    //   }
                    // }}
                    />
                    <SearchIcon onClick={handleNaviagteSearch} />
                  </div>
                </div>
                : ''
              :
              <div
                className={`smrMA_Fixed_Header ${isHeaderFixed ? "fixed" : ""}`}
              >

                <div className="searchBoxOnlyHeaderFiexedMain" onClick={handleNaviagteSearch}>
                  <input
                    type="text"
                    placeholder="Search..."
                    // value={searchText}
                    // onChange={(e) => setSearchText(e.target.value)}
                    className="searchBoxOnlyHeaderFiexed"
                  // onKeyDown={(event) => {
                  //   if (event.key === 'Enter') {
                  //     searchDataFucn();
                  //     setSerachShowOverlay(false);
                  //   }
                  // }}
                  />
                  <SearchIcon onClick={handleNaviagteSearch} />
                </div>
              </div>
            }


          </div>
      }
    </div>
  )
}

export default Header