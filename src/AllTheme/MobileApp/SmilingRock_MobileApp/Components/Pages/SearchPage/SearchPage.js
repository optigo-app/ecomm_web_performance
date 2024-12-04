import React, { useState } from 'react'
import './SearchPage.css'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { IoArrowBack } from 'react-icons/io5';
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import Pako from 'pako';

export default function SearchPage() {

    const [searchText, setSearchText] = useState(null)

    const navigation = useNavigate();

    const toggleOverlay = () => {
        setSearchText('');
    };


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
        if (e.key === "Enter" || 'Enter'== e) {
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
    //     if (e.key === 'Enter') {
    //         if (searchText) {
    //             navigation(`/p/${searchText}/?S=${btoa(searchText)}`)
    //         }
    //     }
    // }

    return (
        <div>
            <div className='HeaderMainSearch'>
                <IoArrowBack style={{ height: '25px', width: '25px', marginRight: '10px', color: '#7d7f85' }} onClick={() => navigation('/')} />
                <div className="searchPageBoxOnlyHeaderFiexedMain">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        autoFocus
                        onChange={(e) => setSearchText(e.target.value)}
                        className="searchBoxOnlyHeaderFiexed"
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                searchDataFucn(event);
                            }
                        }}
                    />
                    <SearchIcon onClick={()=>searchDataFucn("Enter")} style={{ color: '#7d7f85' }} />
                </div>
            </div>

            {/* <div>
                <p className='searchTreadingTitle'>TRENDING SEARCHES</p>
                <div className='recenSearchAllMain'>

                    <div className='recentSearchMain'>
                        <PiArrowCounterClockwiseBold style={{ height: '20px', width: '20px', marginRight: '10px', color: '#7d7f85' }} />
                        <p className='menuRecentSearch'>Diamond Ring</p>
                    </div>

                    <div className='recentSearchMain'>
                        <PiArrowCounterClockwiseBold style={{ height: '20px', width: '20px', marginRight: '10px', color: '#7d7f85' }} />
                        <p className='menuRecentSearch'>Diamond Earrings</p>
                    </div>

                    <div className='recentSearchMain'>
                        <PiArrowCounterClockwiseBold style={{ height: '20px', width: '20px', marginRight: '10px', color: '#7d7f85' }} />
                        <p className='menuRecentSearch'>Solitaire Ring</p>
                    </div>

                    <div className='recentSearchMain'>
                        <PiArrowCounterClockwiseBold style={{ height: '20px', width: '20px', marginRight: '10px', color: '#7d7f85' }} />
                        <p className='menuRecentSearch'>Pendants</p>
                    </div>

                    <div className='recentSearchMain'>
                        <PiArrowCounterClockwiseBold style={{ height: '20px', width: '20px', marginRight: '10px', color: '#7d7f85' }} />
                        <p className='menuRecentSearch'>Bangles</p>
                    </div>
                </div>
            </div> */}
        </div>
    )
}
