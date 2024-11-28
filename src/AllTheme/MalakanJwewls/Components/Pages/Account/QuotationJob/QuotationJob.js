import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import "./quotation.scss";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import PrintIcon from '@mui/icons-material/Print';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {checkMonth, customComparator_Col, formatAmount, stableSort} from "../../../../../../utils/Glob_Functions/AccountPages/AccountPage"
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox,  CircularProgress,  FormControlLabel,  ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Swal from 'sweetalert2';

import { getQuotationJobData } from '../../../../../../utils/API/AccountTabs/quotationJob';

import { headCells_Jobs as columns } from "../../../../../../utils/Glob_Functions/AccountPages/AccountPageColumns";

const CustomSortIcon = ({ order }) => {
  return (
    <>
      {order === 'asc' && <ArrowUpwardIcon className='sorticon_ma_mala' />}
      {order === 'desc' && <ArrowDownwardIcon className='sorticon_ma_mala' />}
    </>
  );
};

const QuotationJob = () => {

  const isSmallScreen = useMediaQuery('(max-width:500px),(max-width:530px),(max-width:575px)');
  const isTabletScreen = useMediaQuery('(max-width:768px),(max-width:778px),(max-width:800px), (max-width:850px), (max-width:900px), (max-width:950px), (max-width:1000px), (max-width:1070px), (max-width:1105px)');

  const [allChecked, setAllChecked] = useState(false);
  const [orderProm, setOrderProm] = useState('order');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [metalColorList, setmetalColorList] = useState([]);
  const [metalPurityList, setMetalPurityList] = useState([]);
  const [statuse, setStatus] = useState(statusList[0]?.value || "");
  const [category, setCategory] = useState(categoryList[0]?.value || "");
  const [MetalColor, setMetalColor] = useState(metalColorList[0]?.value || "");
  const [metalPurity, setMetalPurity] = useState(metalPurityList[0]?.value || "");

  const [isLoading, setIsLoading] = useState(false);

  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  
  const [PrintUrl, setPrintUrl] = useState('');

  const handleOrderProms = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setOrderProm(event.target.value);
  };
  const handleStatus = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setSelectedStatus(event.target.value);
    handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, category, event.target.value, orderProm);
  };
  const handleCategory = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setCategory(event.target.value);
    // handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, event.target.value, statuse, orderProm);
    handleSearch(event, searchVal, fromDate, toDate, metalPurity, MetalColor, event.target.value, selectedStatus, orderProm);
  };
  const handleMetalColor = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setMetalColor(event.target.value);
    // handleSearch(event, searchVal, fromDate, toDate, metalPurity, event.target.value, category, statuse, orderProm);
    handleSearch(event, searchVal, fromDate, toDate, metalPurity, event.target.value, category, selectedStatus, orderProm);
  };
  const handleMetalPurity = (event) => {
    setPage(0);
    setRowsPerPage(10);
    setMetalPurity(event.target.value);
    // handleSearch(event, searchVal, fromDate, toDate, event.target.value, MetalColor, category, statuse, orderProm);
    handleSearch(event, searchVal, fromDate, toDate, event.target.value, MetalColor, category, selectedStatus, orderProm);
  };
  moment.locale('en-gb');


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setAllChecked(false);
    scrollToTop();
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    setAllChecked(false);
    scrollToTop();
  };

  const handleSearch = (eve, searchValue, fromDatess, todatess, metalPurities, MetalColors, categories, statuss, orderPromDate) => {
    let fromdates = `${fromDatess?.["$y"]}-${checkMonth(fromDatess?.["$M"])}-${fromDatess?.["$D"]}`
    let todates = `${todatess?.["$y"]}-${checkMonth(todatess?.["$M"])}-${todatess?.["$D"]}`
    let filteredData = [];
    let count = 0;
    data?.forEach((e, i) => {
      let flags = {
        dateFrom: false,
        dateTo: false,
        status: false,
        category: false,
        MetalColor: false,
        search: false,
        metalPurity: false,
      }
      if (searchValue !== "") {
        if (e?.["Sr#"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["Date"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["SKUNO"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["PO"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["JobNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["DesignNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["Category"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["metal_color"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["metal_purity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["PDate"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["FinalAmount"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["ProgressStatusName"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["Quantity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
          e?.["SuppliedQuantity"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()))
           {
          flags.search = true;
        }
    
      } else {
        flags.search = true;
      }
      //order date and promise date flag filter
      let cutDate = "";
      if (orderPromDate === "order") {
        cutDate = e?.["Date"]?.split("-");
      } else {
        cutDate = e?.["PDate"]?.split("-");
      }
      if (cutDate !== undefined) {



        cutDate = `${cutDate[2]}-${cutDate[1]}-${cutDate[0]}`;
        if (!fromdates?.includes(undefined) && !todates?.includes(undefined)) {
          let fromdat = moment(fromdates);
          let todat = moment(todates);
          let cutDat = moment(cutDate);
          if (moment(fromdat).isSameOrBefore(todat)) {
            const isBetween = cutDat.isBetween(fromdat, todat);
            if (isBetween || cutDat.isSame(fromdat) || cutDat.isSame(todat)) {
              flags.dateTo = true;
              flags.dateFrom = true;
            }
          } else {
            setTimeout(() => {
              resetAllFilters();
            }, 0)
          }
        } else if (fromdates?.includes(undefined) && !todates?.includes(undefined)) {
      
          flags.dateTo = true;
          count++;
          Swal.fire({
            title: "Error !",
            text: "Enter Valid Date From",
            icon: "error",
            confirmButtonText: "ok"
          });
    

        } else if (!fromdates?.includes(undefined) && todates?.includes(undefined)) {
       
          flags.dateFrom = true;
          count++;
          Swal.fire({
            title: "Error !",
            text: "Enter Valid Date To",
            icon: "error",
            confirmButtonText: "ok"
          });

        } else if (fromdates?.includes(undefined) && todates?.includes(undefined)) {
          flags.dateTo = true;
          flags.dateFrom = true;
        }
   
      }





      // if (e?.MetalType?.toString()?.toLowerCase()?.startsWith(metalPurities?.toLowerCase()) || metalPurities?.toLowerCase() === "all") {
      //   flags.metalPurity = true;
      // }
      if ((e?.MetalType?.toString()?.toLowerCase() === metalPurities?.toString()?.toLowerCase()) || metalPurities?.toLowerCase() === "all") {
        flags.metalPurity = true;
      }

      // if (e?.MetalColor?.toString()?.toLowerCase()?.startsWith(MetalColors?.toLowerCase()) || MetalColors?.toLowerCase() === "all") {
      //   flags.MetalColor = true;
      // }
      if ((e?.MetalColor?.toString()?.toLowerCase() === MetalColors?.toString()?.toLowerCase()) || MetalColors?.toLowerCase() === "all") {
        flags.MetalColor = true;
      }


      // if (e?.Category?.toString()?.toLowerCase()?.startsWith(categories?.toLowerCase()) || categories?.toLowerCase() === "all") {
      //   flags.category = true;
      // }
      if ((e?.Category?.toString()?.toLowerCase() === categories?.toLowerCase()) || categories?.toLowerCase() === "all") {
        flags.category = true;
      }
      





      if (!Array.isArray(statuss) || statuss?.length === 0) {
        flags.status = true; // Show all data
      } else {
        // Check if any selected status matches the ProgressStatusName
        if (Array.isArray(statuss)) {
          if (statuss.includes(e?.ProgressStatusName)) {
            flags.status = true;
          }
        } else {
          if (e?.ProgressStatusName === statuss || statuss === "all") {
            flags.status = true;
          }
        }
      }






      if (flags.dateFrom === true && flags.dateTo === true && flags.status === true && 
          flags.category === true && flags.MetalColor === true && flags.search === true &&
          flags.metalPurity === true)
      {
        filteredData.push(e);
      }

    });
    if (count === 0) {
      setFilterData(filteredData);
    } else {
      resetAllFilt();
      handleSearch(eve, "", null, null, metalPurityList[0]?.value, metalColorList[0]?.value, categoryList[0]?.value, statusList[0]?.value, "order");
    }
  }

  const resetAllFilters = (eve) => {
    setSelectedStatus([]);
    setOrderProm("order");
    setFromDate(null);
    setToDate(null);
    setStatus(statusList[0]?.value);
    setCategory(categoryList[0]?.value);
    setMetalColor(metalColorList[0]?.value);
    setMetalPurity(metalPurityList[0]?.value);
    setSearchVal("");
    handleSearch(eve, "", null, null, metalPurityList[0]?.value, metalColorList[0]?.value, categoryList[0]?.value, statusList[0]?.value, "order");
    setFilterData(data);
    setAllChecked(false);
    scrollToTop();
    setPage(0);
    setRowsPerPage(10);

  }

  const resetAllFilt = () => {
    setOrderProm("order");
    setFromDate(null);
    setToDate(null);
    setStatus(statusList[0]?.value);
    setCategory(categoryList[0]?.value);
    setMetalColor(metalColorList[0]?.value);
    setMetalPurity(metalPurityList[0]?.value);
    setSearchVal("");
  }


  const handleRequestSort = (property) => {
    if(property?.toLowerCase() === 'sr#') return null
    else{

      let isAsc = ((orderBy === property) && (order === 'asc'));
      if(isAsc){
        setOrder('desc');
      }else{
        setOrder('asc');
      }
      
      setOrderBy(property);
    const sortedData = stableSort(data, getComparator(order, property));
    setData(sortedData); // Update the data array with sorted data
  
    // Update the filterData array with the sorted data
    const sortedFilterData = stableSort(filterData, getComparator(order, property));
    // setPage(0);
    setFilterData(sortedFilterData);
    
  }
     
  };


  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const months = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };

  function parseCustomDate(dateString) {
    const months = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const parts = dateString?.split(' ');
    if (parts?.length !== 3) {
      throw new Error('Invalid date format');
    }
    const day = parseInt(parts[0]);
    const month = months[parts[1].substring(0, 3)]; // Extract the first three characters of the month name
    const year = parseInt(parts[2]);
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      throw new Error('Invalid date format');
    }
    return new Date(year, month, day);
  }
  function descendingComparator(a, b, orderBy) {
    if (!orderBy) return 0; // Add null check for orderBy
    
    if (orderBy === 'Date' || orderBy === 'PDate') {
        try {
            const dateA = parseCustomDate(a[orderBy]);
            const dateB = parseCustomDate(b[orderBy]);

            if (dateB < dateA) {
                return -1;
            }
            if (dateB > dateA) {
                return 1;
            }
            return 0;
        } catch (error) {
            console.error('Error parsing date:', error.message);
            return 0;
        }
    } else if(orderBy === 'FinalAmount' || orderBy === "JobNo"){
      
      const valueA = parseFloat(a[orderBy]) || 0;
      const valueB = parseFloat(b[orderBy]) || 0;

      if (valueB < valueA) {
          return -1;
      }
      if (valueB > valueA) {
          return 1;
      }

      return 0;

    }else if ((orderBy === 'PO') || (orderBy === 'PO') || (orderBy === 'SKUNO') || (orderBy === 'DesignNo')) {
      // Handle sorting for SKU# column
      return customComparator_Col(a[orderBy], b[orderBy]);
  }  else {
        const valueA = a[orderBy]?.toString()?.toLowerCase() || '';
        const valueB = b[orderBy]?.toString()?.toLowerCase() || '';

        if (valueB < valueA) {
            return -1;
        }
        if (valueB > valueA) {
            return 1;
        }
        return 0;
    }
}

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const storedData = sessionStorage.getItem('loginUserDetail');
      const data = JSON.parse(storedData);
      const customerid = data?.id;

      const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
      const { FrontEnd_RegNo } = storeInit;

      let currencyRate = storeInit?.CurrencyRate;
      const response = await getQuotationJobData(currencyRate, FrontEnd_RegNo, customerid, data);
      
      setPrintUrl(response?.Data?.rd1[0]?.PrintUrl);

      if (response.Data?.rd) {

        let datass = [];
        let allStatus = [];
        let allCategory = [];
        let allMetalColor = [];
        let allMetalPurity = [];
        
        response?.Data?.rd?.forEach((e, i) => {
          let obj = { ...e };
          obj["checkbox"] = <Checkbox />;
          obj["Sr#"] = i + 1;
          obj["isJobSelected"] = false;
          datass?.push(obj);
          let findStatus = allStatus?.findIndex((ele, ind) => ele?.label === e?.ProgressStatusName);
          let findCategory = allCategory?.findIndex((ele, ind) => ele?.label === e?.Category);
          let findMetalColor = allMetalColor?.findIndex((ele, ind) => ele?.label === e?.MetalColor);
          let findMetalPurity = allMetalPurity?.findIndex((ele, ind) => ele?.label === e?.MetalType);
          if (findStatus === -1) {
            allStatus?.push({ id: allStatus?.length, label: e?.ProgressStatusName, value: e?.ProgressStatusName, });
          }
          if (findCategory === -1) {
            allCategory?.push({ id: allCategory?.length, label: e?.Category, value: e?.Category, });
          }
          if (findMetalColor === -1) {
            allMetalColor?.push({ id: allMetalColor?.length, label: e?.MetalColor, value: e?.MetalColor, });
          }
          if (findMetalPurity === -1) {
            allMetalPurity?.push({ id: allMetalPurity?.length, label: e?.MetalType, value: e?.MetalType, });
          }
        });
        // allStatus?.unshift({ id: allStatus?.length, label: "ALL", value: "ALL" });
        allCategory?.unshift({ id: allCategory?.length, label: "ALL", value: "ALL" });
        allMetalColor?.unshift({ id: allMetalColor?.length, label: "ALL", value: "ALL" });
        allMetalPurity?.unshift({ id: allMetalPurity?.length, label: "ALL", value: "ALL" });
         let allStatus2 = allStatus?.filter((e) => (e?.label !== '' && e?.value !== ''))
        setStatusList(allStatus2);
        setCategoryList(allCategory);
        setmetalColorList(allMetalColor);
        setMetalPurityList(allMetalPurity);
        setStatus(allStatus[0]?.value);
        setCategory(allCategory[0]?.value);
        setMetalColor(allMetalColor[0]?.value);
        setMetalPurity(allMetalPurity[0]?.value);
        setData(datass);
        setFilterData(datass);
      } else {
        // alert('nodata')
        setData([]);
        setFilterData([]);
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    let inputFrom = fromDateRef?.current?.querySelector(".MuiInputBase-root input");
    if (inputFrom) {
      inputFrom.placeholder = 'Date From';
    }
    let inputTo = toDateRef?.current?.querySelector(".MuiInputBase-root input");
    if (inputTo) {
      inputTo.placeholder = 'Date To';
    }
  }, []);


  const handlePrintJobs = async(filterdatas, mainData) => {
      let onlyTrueJobjs = filterdatas?.filter((e) => e?.isJobSelected === true);

          let allAreChecked = [];
          onlyTrueJobjs?.forEach((e) => {
            let obj = {...e};
              obj.isJobSelected = true;
              allAreChecked.push(obj);
          });


          let jobStringArr = allAreChecked?.map((e) => e?.JobNo)?.toString();
        
            const storedData = sessionStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const customerid = data?.id;
    
          let fromdate =  moment(fromDate)
          let enddate =  moment(toDate)
          let daytextf = fromdate?._i?.$d;
          let daytextt = enddate?._i?.$d;
          
          const startDate = new Date(daytextf);
          const endDate = new Date(daytextt);
          
          const formattedStartDate = moment(startDate).format('DD MMM YYYY');
          const formattedEndDate = moment(endDate).format('DD MMM YYYY');
          
          
          const Farr = [
            {
              Customerid:`${customerid}`,
              DateFill:`${orderProm}`,
              fromdate:`${fromDate === null ? '' : formattedStartDate}`,
              todate:`${toDate === null ? '' : formattedEndDate}`,
              Search:`${searchVal}`,
              Catgeory:`${category?.toLowerCase() === 'all' ? '' : category}`,
              MetalPurity:`${metalPurity?.toLowerCase() === 'all' ? '' : metalPurity}`,
              MetalColor:`${MetalColor?.toLowerCase() === 'all' ? '' : MetalColor}`,
              JobList:`${jobStringArr}`,
              StatusF:`${selectedStatus}`,
              order:`${order === '' ? 'desc' : order}`,
              orderBy:`${orderBy === '' ? 'Date' : orderBy}`,

            }
          ]
          const jsonConvert = btoa((JSON.stringify(Farr)));
          
          const printMainUrl = `${PrintUrl}&Farr=${jsonConvert}`;
          
          const form = document.createElement('form');
          form.setAttribute('method', 'post');
          form.setAttribute('action', `${PrintUrl}`);
          form.setAttribute('target', '_blank'); // Opens in a new tab
        
          const dataInput = document.createElement('input');
          dataInput.setAttribute('type', 'hidden');
          dataInput.setAttribute('name', 'Farr');
          dataInput.setAttribute('value', jsonConvert);
          form.appendChild(dataInput);
        
          document.body.appendChild(form);
          
          // Submit the form
          form.submit();
    


  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    
  };

// Inside handleMasterCheckboxChange function
const handleMasterCheckboxChange = (event) => {

  
  const sortedData = stableSort(data, getComparator(order, orderBy));
  setData(sortedData); // Update the data array with sorted data

  // Update the filterData array with the sorted data
  const sortedFilterData = stableSort(filterData, getComparator(order, orderBy));
  
  setFilterData(sortedFilterData);



  const isChecked = event.target.checked;
  setAllChecked(isChecked);

  // Update the isJobSelected property for all rows in the current page of sortedData array
  const newData = sortedFilterData?.map((row, index) => {
    if (index >= page * rowsPerPage && index < (page + 1) * rowsPerPage) {
      return {
        ...row,
        isJobSelected: isChecked,
      };
    }
    return row;
  });
  setFilterData(newData);
};

// Inside handleCheckboxChange function
const handleCheckboxChange = (event, rowIndex) => {

  const sortedData = stableSort(data, getComparator(order, orderBy));
  setData(sortedData); // Update the data array with sorted data

  // Update the filterData array with the sorted data
  const sortedFilterData = stableSort(filterData, getComparator(order, orderBy));
  
  setFilterData(sortedFilterData);

  const newData = sortedFilterData?.map((row, index) => {
    if (index === page * rowsPerPage + rowIndex) {
      return {
        ...row,
        isJobSelected: event.target.checked,
      };
    }
    return row;
  });

  setFilterData(newData);
};


const scrollToTop = () => {
  // Find the table container element and set its scrollTop property to 0
  const tableContainer = document.querySelector('.quotationJobSec');
  if (tableContainer) {
    tableContainer.scrollTop = 0;
  }
};

  return (
    <div className='quotationJob_Account_mala'>
      <Box className='smilingSavedAddressMain quotationFiltersText p_0_mala_acc_job' sx={{ padding: "20px", }}>
        {(!isSmallScreen && !isTabletScreen) && <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
          <Button variant="contained" sx={{ marginBottom: "35px", background: "#7d7f85" }} className='muiSmilingRocksBtn QuotationJobAllBtn' onClick={eve => resetAllFilters(eve)} >All</Button>
          <Box sx={{ padding: "0 20px" }}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={orderProm}

              onChange={handleOrderProms}
              sx={{ display: "flex", alignItems: "center", flexDirection: "unset" }}
            >
              <FormControlLabel value="order" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="Order Date" sx={{ padding: "0 20px 35px 0", marginRight: "0" }} />
              <FormControlLabel value="prom" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="Promise Date" sx={{ padding: "0 10px 35px 0", marginRight: "0" }} />
            </RadioGroup>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", alignItems: "center", paddingRight: "15px", paddingBottom: "35px" }} className="QuotationJobAllBtnSec">
      
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date From"
                    value={fromDate}
                    ref={fromDateRef}
      
                    format="DD MM YYYY"
                    className='quotationFilterDates'
                    onChange={(newValue) => {
                      if (newValue === null) {
                        setFromDate(null)
                      } else {
                        if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                          setFromDate(newValue)
                        } else {

                          Swal.fire({
                            title: "Error !",
                            text: "Enter Valid Date From",
                            icon: "error",
                            confirmButtonText: "ok"
                          });
                          resetAllFilters();
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", paddingBottom: "35px", paddingRight: "15px" }} className="QuotationJobAllBtnSec">
      
              <Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date To"
                    value={toDate}
                    ref={toDateRef}
      
                    format="DD MM YYYY"
                    className='quotationFilterDates'
                    onChange={(newValue) => {
                      if (newValue === null) {
                        setToDate(null)
                      } else {
                        if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                          setToDate(newValue)
                        } else {
                          Swal.fire({
                            title: "Error !",
                            text: "Enter Valid Date To",
                            icon: "error",
                            confirmButtonText: "ok"
                          });
                          resetAllFilters();
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: "0 15px 35px 0", }} className="QuotationJobAllBtnSec">
            {/* <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm)}><SearchIcon sx={{ color: "#fff !important" }} /></Button> */}
            <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>
          </Box>
          <Box sx={{ position: "relative", padding: "0 15px 40px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
          <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-8px", }}>Status</label>
            
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedStatus} // Assuming selectedStatus is an array of selected values
                  onChange={handleStatus} // Assuming handleStatus function receives selected values
                  MenuProps={MenuProps}
                  input={<OutlinedInput  />}
                  style={{minHeight:'2.9375em'}}
                  className='statusSelect'
                  size='small'
                  label='ALL'
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em style={{color:'black'}}>Placeholder</em>;
                    }
        
                    return '';
                  }}
                  inputProps={{
                    placeholder: 'Placeholder', // Set placeholder directly on the inputProps
                }}
                
                >
                  
                {statusList?.map((status) => (
                  <MenuItem key={status.id} value={status.value}>
                    <Checkbox checked={selectedStatus?.indexOf(status.value) > -1} />
                    <ListItemText primary={status.label} />
                  </MenuItem>
                ))}
              </Select>
      
          </Box>
          <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
            <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Category</label>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" className='categoryList' value={category} label="Status" onChange={handleCategory} >
              {
                categoryList?.map((e, i) => {
                  return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                })
              }
            </Select>
          </Box>
          <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
            <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Color</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={MetalColor}
              label="Status"
              className='MetalColorList'
              onChange={handleMetalColor}
            >
              {
                metalColorList?.map((e, i) => {
                  return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                })
              }
            </Select>
          </Box>
          <Box sx={{ position: "relative", padding: "0 15px 35px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center" }} className="QuotationJobAllBtnSec" >
            <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Purity</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={metalPurity}
              label="Status"
              className='MetalPurityList'
              onChange={handleMetalPurity}
            >
              {
                metalPurityList?.map((e, i) => {
                  return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                })
              }
            </Select>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center", position: "relative", padding: "0 15px 35px 0", maxWidth: "max-content" }} className="searchbox QuotationJobAllBtnSec">
            <TextField id="standard-basic" label="Search" variant="outlined" value={searchVal} onChange={eve => {
              setSearchVal(eve?.target?.value);
              setPage(0);
              // handleSearch(eve, eve?.target?.value, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm);
              handleSearch(eve, eve?.target?.value, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm);
            }} />
            <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "20px", color: "#757575" }}
              // onClick={eve => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm)}><SearchIcon /></Button>
              onClick={eve => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm)}><SearchIcon /></Button>
          </Box>
          <Box sx={{ padding: "0 0px 40px 0", }} className="QuotationJobAllBtnSec">
            <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handlePrintJobs(filterData, data)}><PrintIcon sx={{ color: "#fff !important" }} /></Button>
          </Box>
        </Box>}
        {
        (!isSmallScreen && isTabletScreen) && <Box>
          <Box style={{display:'flex', alignItems:'center', paddingBottom:'5px'}}>
              <Button variant="contained" sx={{  background: "#7d7f85" }} className='muiSmilingRocksBtn QuotationJobAllBtn' onClick={eve => resetAllFilters(eve)} >All</Button>
              <Box sx={{ padding: "0 20px" }}>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={orderProm}
                  onChange={handleOrderProms}
                  sx={{ display: "flex", alignItems: "center", flexDirection: "unset" }}
                >
                  <FormControlLabel value="order" className='orderFrom QuotationJobAllBtnSecDate_mala' control={<Radio sx={{padding:'0px'}} />} label="Order Date" sx={{ padding: "0 5px 0px 0", marginRight: "0", marginLeft:'-20px' }} />
                  <FormControlLabel value="prom" className='orderFrom QuotationJobAllBtnSecDate_mala' control={<Radio sx={{padding:'0px'}} />} label="Promise Date" sx={{ padding: "0 5px 0px 2px", marginRight: "0" }} />
                </RadioGroup>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", position: "relative", padding: "0 0px 0px 0", maxWidth: "max-content" }} className="searchbox QuotationJobAllBtnSe">
                <TextField id="standard-basic" label="Search" variant="outlined" value={searchVal} onChange={eve => {
                  setSearchVal(eve?.target?.value);
                  setPage(0);
                  handleSearch(eve, eve?.target?.value, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm);
                }} />
                <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "20px", color: "#757575" }}
                  onClick={eve => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm)}><SearchIcon />
                </Button>
              </Box>
              <Box sx={{ padding: "0 0px 0px 20px", marginLeft:'10px'}} >
                <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handlePrintJobs(filterData, data)}><PrintIcon sx={{ color: "#fff !important" }} /></Button>
              </Box>
          </Box>
          <Box style={{display:'flex', alignItems:'center', paddingBottom:'25px'}}>
              <Box style={{paddingRight:'20px'}}> 
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date From"
                      value={fromDate}
                      ref={fromDateRef}
        
                      format="DD MM YYYY"
                      className='quotationFilterDates'
                      onChange={(newValue) => {
                        if (newValue === null) {
                          setFromDate(null)
                        } else {
                          if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                            setFromDate(newValue)
                          } else {

                            Swal.fire({
                              title: "Error !",
                              text: "Enter Valid Date From",
                              icon: "error",
                              confirmButtonText: "ok"
                            });
                            resetAllFilters();
                          }
                        }
                      }}
                    />
                </LocalizationProvider>
              </Box>
              <Box style={{paddingRight:'20px'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date To"
                    value={toDate}
                    ref={toDateRef}
      
                    format="DD MM YYYY"
                    className='quotationFilterDates'
                    onChange={(newValue) => {
                      if (newValue === null) {
                        setToDate(null)
                      } else {
                        if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                          setToDate(newValue)
                        } else {
                          Swal.fire({
                            title: "Error !",
                            text: "Enter Valid Date To",
                            icon: "error",
                            confirmButtonText: "ok"
                          });
                          resetAllFilters();
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ padding: "0 0px 0px 0", }} className="">
                <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>
              </Box>
          </Box>
          <Box style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', paddingBottom:'25px'}}>
          <Box sx={{ position: "relative",  display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", height:'35px', paddingRight:'15px', width:'25%' }}  >
              <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-8px", }}>Status</label>
            
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={selectedStatus} // Assuming selectedStatus is an array of selected values
                  onChange={handleStatus} // Assuming handleStatus function receives selected values
                  MenuProps={MenuProps}
                  input={<OutlinedInput  />}
                  style={{minHeight:'2.9375em', width:'100%'}}
                  className='statusSelect'
                  size='small'
                  label='ALL'
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em style={{color:'black'}}>Placeholder</em>;
                    }
        
                    return '';
                  }}
                  inputProps={{
                    placeholder: 'Placeholder', // Set placeholder directly on the inputProps
                }}
                
                >
                  
                {statusList?.map((status) => (
                  <MenuItem key={status.id} value={status.value}>
                    <Checkbox checked={selectedStatus?.indexOf(status.value) > -1} />
                    <ListItemText primary={status.label} />
                  </MenuItem>
                ))}
              </Select>
      
          </Box>
          <Box sx={{ position: "relative",  display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", height:'35px', paddingRight:'15px', width:'25%' }}  >
            <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Category</label>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" className='categoryList' value={category} label="Status" style={{width:'100%'}} onChange={handleCategory} >
              {
                categoryList?.map((e, i) => {
                  return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                })
              }
            </Select>
          </Box>
          <Box sx={{ position: "relative",  display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", height:'35px', paddingRight:'15px', width:'25%' }}  >
            <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Color</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={MetalColor}
              label="Status"
              className='MetalColorList'
              style={{width:'100%'}}
              onChange={handleMetalColor}
            >
              {
                metalColorList?.map((e, i) => {
                  return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                })
              }
            </Select>
          </Box>
          <Box sx={{ position: "relative",  display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", height:'35px', paddingRight:'0px', width:'25%' }}  >
            <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Purity</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={metalPurity}
              label="Status"
              className='MetalPurityList'
              style={{width:'100%'}}
              onChange={handleMetalPurity}
            >
              {
                metalPurityList?.map((e, i) => {
                  return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                })
              }
            </Select>
          </Box>
          </Box>
        </Box>
        }
        { isSmallScreen && <>
        <Accordion   style={{padding:'2px', paddingBottom:'0px', marginBottom:'40px', marginTop:'20px'}} className='accordion_Account_Head'>
          <AccordionSummary style={{paddingLeft:'5px', paddingRight:'5px'}} expandIcon={<ExpandMoreIcon />}> Filters</AccordionSummary>
          <AccordionDetails className='acc_Details_elvee_job p0_acc_mob'>
          <Box style={{marginBottom:'10px', marginTop:'5px'}}>
            <Box style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
              <Button variant="contained" sx={{ marginBottom: "25px", background: "#7d7f85" }} className='muiSmilingRocksBtn ' onClick={eve => resetAllFilters(eve)} >All</Button>
              <Box sx={{ display: "flex", alignItems: "center", position: "relative", padding: "0px 0px 20px 0px",  width:'100%', maxWidth: "max-content" }} className="searchbox ">
                <TextField id="standard-basic" label="Search" variant="outlined" value={searchVal} style={{minWidth:'100%'}} onChange={eve => {
                  setSearchVal(eve?.target?.value);
                  setPage(0);
                  // handleSearch(eve, eve?.target?.value, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm);
                  handleSearch(eve, eve?.target?.value, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm);
                }} />
                <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "20px", color: "#757575" }}
                  // onClick={eve => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, statuse, orderProm)}><SearchIcon /></Button>
                  onClick={eve => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm)}><SearchIcon />
                </Button>
              </Box>
            </Box>
            <Box sx={{ padding: "0 20px" }}>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={orderProm}

                onChange={handleOrderProms}
                sx={{ display: "flex", alignItems: "center", flexDirection: "unset" }}
              >
                <FormControlLabel value="order" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="Order Date" sx={{ padding: "0 20px 20px 0", marginRight: "0" }} />
                <FormControlLabel value="prom" className='orderFrom QuotationJobAllBtnSecDate' control={<Radio />} label="Promise Date" sx={{ padding: "0 10px 20px 0", marginRight: "0" }} />
                <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "7px 10px", marginLeft:'10px', marginBottom:'20px', minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handlePrintJobs(filterData, data)}><PrintIcon sx={{ color: "#fff !important" }} /></Button>
              </RadioGroup>
            </Box>
            
            <Box style={{ display:'flex', alignItems:'center', justifyContent:'space-between'}} className='w100dwsr'>
              <Box style={{marginBottom:'2rem', boxSizing:'border-box', width:'45%'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date From"
                        value={fromDate}
                        ref={fromDateRef}
          
                        format="DD MM YYYY"
                        // className='quotationFilterDatesElvee pd_right_elvee_job'
                        className='quotationFilterDatesElvee w100_dwsr'
                        onChange={(newValue) => {
                          if (newValue === null) {
                            setFromDate(null)
                          } else {
                            if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                              setFromDate(newValue)
                            } else {

                              Swal.fire({
                                title: "Error !",
                                text: "Enter Valid Date From",
                                icon: "error",
                                confirmButtonText: "ok"
                              });
                              resetAllFilters();
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
              </Box>
              <Box style={{marginBottom:'2rem', boxSizing:'border-box', width:'45%'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date To"
                        value={toDate}
                        ref={toDateRef}
          
                        format="DD MM YYYY"
                        // className='quotationFilterDatesElvee pd_right_elvee_job'
                        className='quotationFilterDatesElvee w100_dwsr'
                        onChange={(newValue) => {
                          if (newValue === null) {
                            setToDate(null)
                          } else {
                            if (((newValue["$y"] <= 2099 && newValue["$y"] >= 1900) || newValue["$y"] < 1000) || isNaN(newValue["$y"])) {
                              setToDate(newValue)
                            } else {
                              Swal.fire({
                                title: "Error !",
                                text: "Enter Valid Date To",
                                icon: "error",
                                confirmButtonText: "ok"
                              });
                              resetAllFilters();
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
              </Box>
              <Box style={{ marginBottom:'2rem',  boxSizing:'border-box'}}>
                <Button variant='contained' className='muiSmilingRocksBtn' sx={{ padding: "9px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate, metalPurity, MetalColor, category, selectedStatus, orderProm)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>
              </Box>
            </Box>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%'}}>
              <Box sx={{ position: "relative", padding: "0 0px 40px 0 !important", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", width:'45%' }} className="" >
              <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-8px", }}>Status</label>
                
                    <Select
                      labelId="demo-multiple-checkbox-label"
                      id="demo-multiple-checkbox"
                      multiple
                      value={selectedStatus} // Assuming selectedStatus is an array of selected values
                      onChange={handleStatus} // Assuming handleStatus function receives selected values
                      MenuProps={MenuProps}
                      input={<OutlinedInput  />}
                      style={{minHeight:'2.9375em', width:'100%'}}
                      className='statusSelect'
                      size='small'
                      label='ALL'
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em style={{color:'black'}}>Placeholder</em>;
                        }
                        return '';
                      }}
                      inputProps={{
                        placeholder: 'Placeholder', // Set placeholder directly on the inputProps
                    }}
                    
                    >
                      
                    {statusList?.map((status) => (
                      <MenuItem key={status.id} value={status.value}>
                        <Checkbox checked={selectedStatus?.indexOf(status.value) > -1} />
                        <ListItemText primary={status.label} />
                      </MenuItem>
                    ))}
                  </Select>
          
              </Box>
              <Box sx={{ position: "relative", padding: "0 0px 20px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", width:'45%' }} className="QuotationJobAllBtnSec" >
                <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Category</label>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" className='categoryList' style={{width:'100%'}} value={category} label="Status" onChange={handleCategory} >
                  {
                    categoryList?.map((e, i) => {
                      return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                    })
                  }
                </Select>
              </Box>
            </div>
            <div style={{display:'flex', alignItems:'center', width:'100%', justifyContent:'space-between'}}>
              <Box sx={{ position: "relative", padding: "0 0px 0px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", width:'45%' }} className="" >
                <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Color</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={MetalColor}
                  label="Status"
                  className='MetalColorList'
                  onChange={handleMetalColor}
                  style={{width:'100%'}}
                >
                  {
                    metalColorList?.map((e, i) => {
                      return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                    })
                  }
                </Select>
              </Box>
              <Box sx={{ position: "relative", padding: "0 0px 0px 0", display: "flex", flexWrap: "wrap", alignitems: "center", justifyContent: "center", width:'45%' }} className="" >
                <label className='lh-1 selectLabel' style={{ marginTop: "-3px", position: "absolute", left: 0, top: "-16px", }}>Metal Purity</label>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={metalPurity}
                  label="Status"
                  className='MetalPurityList'
                  onChange={handleMetalPurity}
                  style={{width:'100%'}}
                >
                  {
                    metalPurityList?.map((e, i) => {
                      return <MenuItem value={e?.value} key={i}>{e?.label}</MenuItem>
                    })
                  }
                </Select>
              </Box>
            </div>
          </Box>
        </AccordionDetails>
        </Accordion>
        </>
        }

        <Box sx={{ padding: "0 0 35px 0", marginTop: "-15px" }}>
          {isLoading ?
            <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}><CircularProgress className='loadingBarManage' /></Box> : 
            <Paper sx={{ width: '100%', overflow: 'hidden' }} className='QuoteJobtable'>
              <TableContainer sx={{ maxHeight: 810 }} className='quotationJobSec'>
                <Table stickyHeader aria-label="sticky table" className='quotaionFiltertable'>
                  <TableHead className='user-select-none'>
                    <TableRow style={{zIndex:1}}>
                    <TableCell className='account_themewise_mala' style={{ color: "#6f6f6f"}}>
                      <Checkbox
                        checked={allChecked}
                        onChange={handleMasterCheckboxChange}
                        style={{zIndex:10}}
                      />
                    </TableCell>  
                      {columns?.slice(1)?.map((column) => (
                        <TableCell
                          key={column?.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth,  color: "#6f6f6f", }}
                          onClick={() => handleRequestSort(column?.id)}
                          className='account_themewise_mala'
                        >
                          {column.label}
                          {orderBy === column.id ? (
                            <span style={{ display: 'flex', alignItems: 'right' }} className='sorticon_ma_span_mala'>
                              {orderBy === column?.id && (<CustomSortIcon order={order} />)}
                            </span>
                          ) : null}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
            

                    {stableSort(filterData, getComparator(order, orderBy))
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row, rowIndex) => {
                        let serialNumber = page * rowsPerPage + rowIndex + 1;
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column, index) => {
                              const value = row[column?.id];
                              return (
                                <TableCell key={column?.id} align={column?.align}>
                                {column.id === 'Sr#' ? serialNumber : 
                                  column?.id === 'checkbox' ? 
                                    <Checkbox 
                                      checked={row?.isJobSelected} 
                                      onChange={(event) => handleCheckboxChange(event, rowIndex, row)} 
                                    /> 
                                    : 
                                    column?.format && typeof value === 'number'
                                      ? column.format(value)
                                      : column?.id === 'FinalAmount' ? formatAmount(value) : value}
                              </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={filterData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>}
        </Box>


      </Box>
    </div>
  )
}

export default QuotationJob