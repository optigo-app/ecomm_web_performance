import React, { useEffect, useState } from "react";
import { DiamondFilterData } from "../../../../../utils/API/DiamondStore/DiamondFilter";
import { DiamondListData } from "../../../../../utils/API/DiamondStore/DiamondList";
import "./test.scss";

const Test = () => {
  const [gridCol,SetgridCol] = useState({
    view : `20%`,
    view1 : `40%` , 
    view2 : `60%`,
    view3 : `80%`,
  })

  const [selectedView,setselectedView] =useState(gridCol.view)


  return (
    <div className="hero">
      <div className="col_gor">
     {Object.keys(gridCol).map((val,i)=>{
      return <button onClick={()=>setselectedView(gridCol[val])}>{gridCol[val]}</button>
     })}
      </div>
      <div className="grid" style={{
        gridTemplateColumns  :`repeat(auto-fill, minmax(${selectedView}, 1fr))`
      }}>
        {Array.from({ length: 8 }).map((val, i) => {
          return (
            <div key={i} className="card">
              <img
                src="http://zen/R50B3/UFS/BYJQD1FKE0ON69L2IRW4_Image/Design_Image/F1002_1.jpg"
                alt=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Test;

// {
//   const [mergedData, setMergedData] = useState(null);
//   const [selectedShape, setselectedShape] = useState('round');

//   const diamondShapes = [
//       "Round", "Princess", "Princess", "Cushion", "Cushion",
//       "Emerald", "Emerald", "Oval", "Oval", "Radiant",
//       "Radiant", "Asscher", "Asscher", "Marquise", "Marquise",
//       "Heart", "Heart", "Pear", "Pear"
//     ];

// const transformApiResponse = async (apiResponse) => {
//   try {
//     const data = apiResponse?.Data?.rd;
//     const transformed = {};
//     const excludedKeys = new Set(["Gridle", "Shape"]);

//     data.forEach((item) => {
//       const options = JSON?.parse(item.options);
//       const transformedItem = {
//         label: item.Name,
//         type: item?.inptype,
//         options: options.map((option) => ({
//           value: option.Name,
//           label: option.Name,
//         })),
//       };

//       // Add properties only if they exist
//       if (item.min !== null && item.min !== undefined) {
//         transformedItem.min = item.min;
//       }
//       if (item.max !== null && item.max !== undefined) {
//         transformedItem.max = item.max;
//       }
//       if (item.default !== null && item.default !== undefined) {
//         transformedItem.default = item.default;
//       }

//       // Add to the transformed object only if it's not in excludedKeys
//       if (!excludedKeys.has(item.Name)) {
//         transformed[item.id] = transformedItem;
//       }
//     });
//     return transformed;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const RangeApiResponse = async (resData)=>{
//   try {
//       const transformedData = {
//           price: {
//             label: "Price",
//             type: "range",
//             min: resData?.minprice,
//             max: resData?.maxprice,
//             default: [resData?.minprice, resData?.maxprice],
//           },
//           carat: {
//             label: "Carat",
//             type: "range",
//             min: resData?.mincarat,
//             max: resData?.maxcarat,
//             default: [resData?.mincarat, resData?.maxcarat],
//           },
//           depth: {
//             label: "Depth",
//             type: "range",
//             min: resData?.mindepth,
//             max: resData?.maxdepth,
//             default: [resData?.mindepth, resData?.maxdepth],
//           },
//           table: {
//             label: "Table",
//             type: "range",
//             min: resData?.mintable,
//             max: resData?.maxtable,
//             default: [resData?.mintable, resData?.maxtable],
//           },
//         };
//         return transformedData ;
//   } catch (error) {
//       console.log(error)
//   }
// }
// const getDiamondFilterData = async () => {
//   try {
//     const response = await DiamondFilterData();
//     const data = await transformApiResponse(response);
//     return data;
//   } catch (error) {
//     console.error("Error fetching diamond data:", error);
//   }
// };
// const RangeFiltersData = async()=>{
//   try {
//     const response = await DiamondListData(1, selectedShape, "", "");
//     const data  = await RangeApiResponse(response?.Data?.rd[0])
//     console.log(response?.Data?.rd)
//     sessionStorage.setItem('rangeFiltersData', JSON.stringify(data));
//   } catch (error) {
//       console.log(error)
//   }
// }

// useEffect(() => {
//   const fetchData = async () => {
//     const filterData = await getDiamondFilterData();
//     await RangeFiltersData();
//     console.log(filterData)
//     if (filterData) {
//       const storedRangeFiltersData = sessionStorage.getItem('rangeFiltersData');
//       const rangeFiltersData = storedRangeFiltersData ? JSON.parse(storedRangeFiltersData) : {};
//       const merged = { ...filterData, ...rangeFiltersData };
//       setMergedData(merged);
//       sessionStorage.setItem('mergedData', JSON.stringify(merged));
//     }
//   };

//   fetchData();
// }, [selectedShape]);
// const uniqueDiamondShapes = [...new Set(diamondShapes)];

// }
// {
//   <div
//       style={{
//         width: "100%",
//         height: "100vh",
//         marginTop: "110px",
//         backgroundColor: "skyblue",
//       }}
//     >
//         {uniqueDiamondShapes.map((shape, index) => (
//           <button key={index} onClick={()=>setselectedShape(shape)}>{shape}</button>
//         ))}
//       Test
//     </div>
// }
