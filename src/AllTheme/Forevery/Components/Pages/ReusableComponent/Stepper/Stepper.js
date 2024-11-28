import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Stepper = ({ Swap, StyleCondition, setswap, customizeStep }) => {
    const dropdownRefs = useRef({});
    const [open, setOpen] = useState(null);
    const [isSetting, setIsSetting] = useState([]);
    const [storeInit, setStoreInit] = useState({});
    const [loginCurrency, setLoginCurrency] = useState();
    const Navigation = useNavigate();
    const location = useLocation();
    const getStepName = location?.pathname.split('/');
    const getCustStepData = JSON?.parse(sessionStorage?.getItem('customizeSteps'));
    console.log('getCustStepData: ', getCustStepData);
    const getCustStepData2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));
    console.log('getCustStepData2: ', getCustStepData2);
    const getdiaData = JSON.parse(sessionStorage.getItem('custStepData'));
    const getdiaData2 = JSON.parse(sessionStorage.getItem('custStepData2'));
    console.log('getdiaData2: ', getdiaData2);
    const setting = getStepName.includes('Ring') || getStepName.includes('Pendant');
    const [setshape, setSetShape] = useState();

    useEffect(() => {
        const handleCompset = () => {
            const getSetShape = JSON.parse(sessionStorage.getItem('customizeSteps')) ?? JSON.parse(sessionStorage.getItem('customizeSteps2'));
            setSetShape(getSetShape);
        }
        handleCompset();
    }, [])

    const getCompleteStep1 = JSON.parse(sessionStorage.getItem('customizeSteps'));
    const getCompleteStep2 = JSON.parse(sessionStorage.getItem('customizeSteps2'));

    useEffect(() => {
        const storeData = JSON.parse(sessionStorage.getItem("storeInit"));
        setStoreInit(storeData);

        const loginData = JSON.parse(sessionStorage.getItem('loginUserDetail'));
        setLoginCurrency(loginData);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click was outside of any dropdown
            if (Object.values(dropdownRefs.current).every(ref => ref && !ref.contains(event.target))) {
                setOpen(null); // Close all dropdowns
            }
        };

        // Add event listener for clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener on component unmount
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOpen = (index) => {
        setOpen(open === index ? null : index);
    };

    const renderSteps = () => {
        return (
            <>
                <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
                    <span className="for_title_span" style={StyleCondition}
                        onClick={() => {
                            Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                            setswap("settings");
                        }}
                    >
                        <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={
                            (getCustStepData2?.[0]?.Setting === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                            StepImages[1]?.img
                        } alt="" /> Settings
                    </span>
                    {getdiaData2?.[0]?.step1Data && (
                        <HandleDrp
                            index={0}
                            open={open === 'setting'}
                            handleOpen={() => handleOpen('setting')}
                            data={getdiaData2?.[0]}
                            ref={(el) => { dropdownRefs.current[0] = el; }}
                        />
                    )}
                    {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
                        <HandleDrp
                            index={0}
                            open={open === 'setting'}
                            handleOpen={() => handleOpen('setting')}
                            data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
                            ref={(el) => { dropdownRefs.current[0] = el; }}
                        />
                    )}
                </div>

                <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
                    <span className="for_title_span" style={StyleCondition} onClick={() => {
                        Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`)
                        setswap("diamond");
                    }}>
                        <img src={StepImages[0]?.img} alt="" /> Diamond
                    </span>
                    {(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                        />
                    )}
                    {getdiaData?.[0]?.step1Data?.[0] && (
                        <HandleDrp
                            index={1}
                            open={open === 'diamond'}
                            handleOpen={() => handleOpen('diamond')}
                            data={getdiaData?.[0]?.step1Data?.[0]}
                            ref={(el) => { dropdownRefs.current[1] = el; }}
                        />
                    )}
                </div>

                <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
                    <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url)}`); setswap("finish"); }}>
                        <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[2]?.img1 : StepImages[2]?.img) ||
                            StepImages[2]?.img} alt="" /> {(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'Pendant' : 'Ring'}
                    </span>
                    {(getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true) && (
                        <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price))}</span>
                    )}
                </div>
            </>
        );
    };

    console.log('jee', getCustStepData?.[0]?.step1 === true ?? getCustStepData2?.[1]?.step2 === true)

    return (
        <>
            {getdiaData?.length > 0 || (getCustStepData?.[0]?.step1 === true ?? getCustStepData2?.[1]?.step2 === true) ? (
                <div className="diamond_Step_data">
                    <div className={`step_data ${getStepName.includes('diamond') ? 'active' : ''} d-1`}>
                        <span className="for_title_span" style={StyleCondition} onClick={() => {
                            Navigation(`/certified-loose-lab-grown-diamonds/diamond/${setshape?.[0]?.shape ?? setshape?.[1]?.shape}`);
                            setswap("diamond");
                        }}>
                            <img src={StepImages[0]?.img} alt="" /> Diamond
                        </span>
                        {getdiaData?.[0]?.step1Data?.[0] && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData?.[0]?.step1Data?.[0]}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                            />
                        )}
                        {(getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data) && (
                            <HandleDrp
                                index={0}
                                open={open === 'diamond'}
                                handleOpen={() => handleOpen('diamond')}
                                data={getdiaData2?.[1]?.step2Data ?? getdiaData2?.[0]?.step2Data}
                                ref={(el) => { dropdownRefs.current[0] = el; }}
                            />
                        )}
                    </div>

                    <div className={`step_data ${setting === true ? 'active' : ''} d-2`}>
                        <span className="for_title_span" style={StyleCondition}
                            onClick={() => {
                                Navigation(`/certified-loose-lab-grown-diamonds/settings/${setshape?.[1]?.Setting ?? setshape?.[0]?.Setting}/diamond_shape=${setshape?.[1]?.shape ?? setshape?.[0]?.shape}/${((setshape?.[1]?.Setting ?? setshape?.[0]?.Setting) === 'Ring' ? 'M=UmluZy9jYXRlZ29yeQ==' : 'M=UGVuZGFudC9jYXRlZ29yeQ==')}`)
                                setswap("settings");
                            }}
                        >
                            <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={(getCustStepData?.[1]?.Setting === 'Pendant' ? StepImages[1]?.img1 : StepImages[1]?.img) ||
                                StepImages[2]?.img} alt="" /> Settings
                        </span>
                        {(getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data) && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={getdiaData?.[1]?.step2Data ?? getdiaData?.[0]?.step2Data}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                            />
                        )}
                        {getdiaData2?.[0]?.step1Data && (
                            <HandleDrp
                                index={1}
                                open={open === 'setting'}
                                handleOpen={() => handleOpen('setting')}
                                data={getdiaData2?.[0]}
                                ref={(el) => { dropdownRefs.current[1] = el; }}
                            />
                        )}
                    </div>

                    <div className={`step_data ${(getdiaData2?.[1]?.step2Data || getdiaData?.[1]?.step2Data) ? '' : 'finish_set'} ${getStepName.includes('setting-complete-product') ? 'active' : ''} d-3`}>
                        <span style={StyleCondition} onClick={() => { Navigation(`/d/setting-complete-product/det/?p=${(getCompleteStep1?.[2]?.url || getCompleteStep2?.[2]?.url)}`); setswap("finish"); }}>
                            <img className={getStepName.includes('Pendant') ? 'for_pendant_view' : ''} src={((getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? StepImages[2]?.img1 : StepImages[2]?.img) ||
                                StepImages[2]?.img} alt="" /> {(getCustStepData2?.[0]?.Setting === 'Pendant' || getCustStepData?.[1]?.Setting === 'Pendant') ? 'Pendant' : 'Ring'}
                        </span>
                        {(getCompleteStep1?.[2]?.step3 == true || getCompleteStep2?.[2]?.step3 == true) && (
                            <span className='for_total_prc'>{loginCurrency?.CurrencyCode ?? storeInit?.CurrencyCode} {formatter((getCompleteStep1?.[2]?.price || getCompleteStep2?.[2]?.price))}</span>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {!getStepName.includes('diamond_shape') ? (
                        <div className="diamond_Step_data">
                            {renderSteps()}
                        </div>
                    ) : (
                        <>
                            <div className="diamond_Step">
                                {Swap === "diamond" ? (
                                    <div
                                        className="step d-1"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
                                            setswap("diamond");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[0]?.img} alt="" /> Diamond
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="step d-2"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                                            setswap("settings");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[1]?.img} alt="" /> Settings
                                        </span>
                                    </div>
                                )}
                                {Swap !== "diamond" ? (
                                    <div
                                        className="step d-1"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/diamond/Round`);
                                            setswap("diamond");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[0]?.img} alt="" /> Diamond
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className="step d-2"
                                        onClick={() => {
                                            Navigation(`/certified-loose-lab-grown-diamonds/settings/Ring/M=UmluZy9jYXRlZ29yeQ==`);
                                            setswap("settings");
                                        }}
                                    >
                                        <span style={StyleCondition}>
                                            <img src={StepImages[1]?.img} alt="" /> Settings
                                        </span>
                                    </div>
                                )}
                                <div className="step finish_set d-3">
                                    <span style={StyleCondition}>
                                        <img src={StepImages[2]?.img} alt="" /> Rings
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
}
export default Stepper;