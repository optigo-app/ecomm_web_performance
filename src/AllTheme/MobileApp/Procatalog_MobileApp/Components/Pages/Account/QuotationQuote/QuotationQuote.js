import "./QuotationQuoteMA.scss";
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, TextField } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PrintIcon from '@mui/icons-material/Print';
import { formatAmount, checkMonth } from "../../../../../../../utils/Glob_Functions/AccountPages/AccountPage";
import { visuallyHidden } from '@mui/utils';
import { addYears, subYears } from 'date-fns';
import moment from 'moment';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Paper from '@mui/material/Paper';
import { getQuotationQuoteData } from "../../../../../../../utils/API/AccountTabs/quotationQuote";
import MobViewHeader from './../MobViewHeader/MobViewHeader';

import { headCells_Quotation as headCells } from "../../../../../../../utils/Glob_Functions/AccountPages/AccountPageColumns";

const createData = (SrNo, Date, SKUNo, TotalDesign, Amount, PrintUrl) => {
    return {
        SrNo,
        Date,
        SKUNo,
        TotalDesign,
        Amount,
        PrintUrl
    };
}

const descendingComparator = (a, b, orderBy) => {
    if (orderBy === 'Date') {
        const dateA = new Date(a[orderBy]);
        const dateB = new Date(b[orderBy]);
        if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
            return isNaN(dateA.getTime()) ? 1 : -1;
        }

        if (dateB < dateA) {
            return -1;
        }
        if (dateB > dateA) {
            return 1;
        }
        return 0;
    } else if (orderBy === 'SrNo' || orderBy === 'Amount') {
        return b[orderBy] - a[orderBy];
    } else if ((orderBy === 'SKUNo')) {
        // Handle sorting for SKU# column
        return customComparator_Col(a[orderBy], b[orderBy]);
    } else {
        const valueA = typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a[orderBy];
        const valueB = typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b[orderBy];

        if (valueB < valueA) {
            return -1;
        }
        if (valueB > valueA) {
            return 1;
        }
        return 0;
    }
}

const customComparator_Col = (a, b) => {
    const regex = /([^\d]+)(\d+)/;
    const [, wordA, numA] = a?.match(regex);
    const [, wordB, numB] = b?.match(regex);

    if (wordA !== wordB) {
        return wordA?.localeCompare(wordB);
    }

    return parseInt(numB, 10) - parseInt(numA, 10);
};

const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        style={{ fontSize: '10px' }}
                    >
                        {
                            ((headCell?.id?.toLowerCase() === 'srno') || (headCell?.id?.toLowerCase() === 'print')) ?
                                `${headCell?.id}`
                                :
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <>
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        </>
                                    ) : null}
                                </TableSortLabel>
                        }
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const QuotationQuote = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [searchVal, setSearchVal] = useState("");
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const maxYear = addYears(new Date(), 1); // Set maximum year to the next year
    const minYear = subYears(new Date(), 1);

    const fromDateRef = useRef(null);
    const toDateRef = useRef(null);

    const handleRequestSort = (event, property) => {
        console.log('property--', property);
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };



    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        scrollToTop();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        scrollToTop();
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filterData.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(filterData, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, filterData],
    );

    const resetAllFilters = () => {
        setSearchVal("");
        setFromDate(null);
        setToDate(null);
        setFilterData(data);
        setPage(0);
        setRowsPerPage(10);
    }

    const reseltFil = () => {
        setSearchVal("");
        setFromDate(null);
        setToDate(null);
        setPage(0);
    }

    const handleSearch = (eve, searchValue, fromDatess, todatess) => {
        setPage(0);

        let fromdates = `${fromDatess?.["$y"]}-${checkMonth(fromDatess?.["$M"])}-${fromDatess?.["$D"]}`;
        let todates = `${todatess?.["$y"]}-${checkMonth(todatess?.["$M"])}-${todatess?.["$D"]}`;

        let filteredData = [];
        let count = 0;
        data?.forEach((e, i) => {
            let cutDate = "";
            cutDate = e?.["Date"]?.split("-");
            let compareDate = `${cutDate[0]}-${cutDate[1]}-${cutDate[2]}`
            cutDate = `${cutDate[2]}-${cutDate[1]}-${cutDate[0]}`;
            let flags = {
                dateFrom: false,
                dateTo: false,
                search: false,
            }
            if (searchValue !== "") {
                if (e?.["SrNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
                    e?.["SKUNo"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
                    e?.["Amount"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
                    e?.["TotalDesign"]?.toString()?.toLowerCase()?.includes(searchValue?.trim()?.toLowerCase()) ||
                    compareDate?.toString()?.toLowerCase()?.includes?.(searchValue?.trim()?.toLowerCase())
                ) {
                    flags.search = true;
                }
            } else {
                flags.search = true;
            }

            if (cutDate !== undefined) {

                if (!fromdates?.includes(undefined) && !todates?.includes(undefined)) {
                    let fromdat = moment(fromdates);
                    let todat = moment(todates);
                    let cutDat = moment(cutDate);
                    if (moment(fromdates).isSameOrBefore(todates)) {
                        const isBetween = cutDat.isBetween(fromdat, todat, null, '[]');
                        if (isBetween || cutDat.isSame(fromdat) || cutDat.isSame(todat)) {
                            flags.dateTo = true;
                            flags.dateFrom = true;
                        }
                    }
                    else {
                        setTimeout(() => {
                            reseltFil();
                            setFilterData(data);
                        }, 0)
                    }
                } else if (fromdates?.includes(undefined) && !todates?.includes(undefined)) {
                    count = count + 1
                    flags.dateFrom = true;
                    Swal.fire({
                        title: "Error !",
                        text: "Enter Valid Date From",
                        icon: "error",
                        confirmButtonText: "ok"
                    });
                    reseltFil();
                } else if (!fromdates?.includes(undefined) && todates?.includes(undefined)) {

                    count = count + 1
                    flags.dateTo = true;
                    Swal.fire({
                        title: "Error !",
                        text: "Enter Valid Date To",
                        icon: "error",
                        confirmButtonText: "ok"
                    });
                    reseltFil();

                } else if (fromdates?.includes(undefined) && todates?.includes(undefined)) {
                    flags.dateTo = true;
                    flags.dateFrom = true;
                }

            }

            if (flags.dateFrom === true && flags.dateTo === true && flags.search === true) {
                filteredData.push(e);
            }

        });
        if (count === 0) {
            setFilterData(filteredData);
        }
        else {
            setFilterData(data);
        }
    }

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const storedData = sessionStorage.getItem('loginUserDetail');
            const data = JSON.parse(storedData);
            const customerid = data.id;
            const storeInit = JSON.parse(sessionStorage.getItem('storeInit'));
            const { FrontEnd_RegNo } = storeInit;
            // const combinedValue = JSON.stringify({
            //     CurrencyRate: "1", FrontEnd_RegNo: `${FrontEnd_RegNo}`, Customerid: `${customerid}`
            // });
            // const encodedCombinedValue = btoa(combinedValue);
            // const body = {
            //     "con": `{\"id\":\"Store\",\"mode\":\"getquote\",\"appuserid\":\"${data.email1}\"}`,
            //     "f": "zen (cartcount)",
            //     p: encodedCombinedValue
            // };
            // const response = await CommonAPI(body);
            let currencyRate = storeInit?.CurrencyRate;
            const response = await getQuotationQuoteData(data, currencyRate, FrontEnd_RegNo, customerid);

            if (response?.Data?.rd) {
                let rows = [];
                response?.Data?.rd?.forEach((e, i) => {
                    let printUrl = atob(e?.PrintUrl);
                    let dataa = createData(i + 1, e?.Date, e?.SKUNo, e?.TotalDesign, e?.Amount, printUrl);
                    rows?.push(dataa)
                });

                setData(rows);
                setFilterData(rows);
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

    const handlePrintUrl = (printUrl) => {
        window.open(printUrl)
    }

    const scrollToTop = () => {
        // Find the table container element and set its scrollTop property to 0
        const tableContainer = document.querySelector('.quotationJobSec');
        if (tableContainer) {
            tableContainer.scrollTop = 0;
        }
    };


    return (
        <div className="quotationQuote_Account_PCMJ">
            <div className="sticky-header">
                <MobViewHeader title="Quotation" />
            </div>
            <Box className='smilingSavedAddressMain salesApiSectionQMA headSetQMAMain' sx={{ padding: "5px", }}>
                {/* <Accordion sx={{ marginBottom: '20px' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        More Filters
                    </AccordionSummary>
                    <AccordionDetails className="proCatApp_AcoriDeatil_quat">
                        <Box className="proCatAPP_Quat_flex_quote" sx={{ display: "flex", flexWrap: "wrap" }}>
                            <Box style={{ display: 'flex' , justifyContent: 'space-around' }} sx={{ padding: "0px" }}>
                                <Box className="proCatApp_QutSearchMainDiv" sx={{ display: "flex", alignItems: "center", position: "relative", }}>
                                    <input type="text" id="standard-basic" placeholder="Search" className="proCatApp_Qut_SearchBox" value={searchVal} onChange={eve => {
                                        setSearchVal(eve?.target?.value);
                                        handleSearch(eve, eve?.target?.value, fromDate, toDate);
                                    }} />
                                    <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "8px", color: "#757575" }}
                                        onClick={eve => handleSearch(eve, searchVal, fromDate, toDate)}><SearchIcon />
                                    </Button>
                                </Box>

                             
                                <Button variant="contained" className="muiSmilingRocksBtn" sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={eve => resetAllFilters(eve)}>
                                    All
                                </Button>
                            </Box>
                            <Box className="proCatApp_Qut_DateMain">
                                <Box className="proCatApp_DateMainDiv_QuotePadSec">
                                    <Box className="w_80_q">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Date From"
                                                value={fromDate}
                                                format="DD MM YYYY"
                                                placeholder="DD MM YYYY"
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
                                                className='quotationFilterDates w_q'
                                                ref={fromDateRef}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                                <Box className="proCatApp_DateMainDiv_QuotePadSec">
                                    <Box className="w_80_q">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Date To"
                                                value={toDate}

                                                format="DD MM YYYY"
                                                placeholder="DD MM YYYY"

                                                className='quotationFilterDates w_q'
                                                ref={toDateRef}
                                                inputProps={{ readOnly: true }}
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

                                <Button variant='contained' className="muiSmilingRocksBtn" sx={{ padding: "0px",height:'40px', minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>

                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion> */}
                            {
                
                <Accordion  style={{padding:'2px', paddingBottom:'0px', marginBottom:'40px', marginTop:'20px'}} className='accordion_Account_Head'>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>Filters</AccordionSummary>
                    <AccordionDetails style={{padding:'0px'}} className='p0_acc_mob'>
                        
                        <Box sx={{ display: "flex", justifyContent:'space-between', alignItems: "center", position: "relative", padding: "0 0px 35px 0", minWidth:'100%',  maxWidth: "max-content" }} className="searchbox QuotePadSec w_q">
                            <Button variant="contained" className="muiSmilingRocksBtn fs_elvee_quote" sx={{ background: "#7d7f85", display: "flex", alignItems: "center", marginBottom: '5px' }} onClick={eve => resetAllFilters(eve)}>
                                All
                            </Button>
                            <div style={{position:'relative'}}>
                            <TextField id="standard-basic" label="Search" variant="outlined" className="w_q fs_elvee_quote"  value={searchVal} onChange={eve => {
                                setSearchVal(eve?.target?.value);
                                handleSearch(eve, eve?.target?.value, fromDate, toDate);
                            }} />
                            <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "20px", color: "#757575" }}
                                onClick={eve => handleSearch(eve, searchVal, fromDate, toDate)} className="fs_elvee_quote"><SearchIcon />
                            </Button>
                            </div>
                        </Box>
                        <Box style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', paddingBottom:'10px'}}>
                            <Box style={{ boxSizing:'border-box', width:'45%'}}>
                                {/* <p className='fs-6 w_20_q mb-0 fs_elvee_quote' style={{ paddingRight: "8px", paddingBottom:'10px' }}>Date: </p> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date From"
                                            value={fromDate}
                                            format="DD MM YYYY"
                                            placeholder="DD MM YYYY"
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
                                            className='quotationFilterDates fs_elvee_quote pd_right_elvee w100_dwsr'
                                            ref={fromDateRef}
                                        />
                                    </LocalizationProvider>
                            </Box>
                            <Box style={{ boxSizing:'border-box', width:'45%'}}>
                                {/* <p className='fs-6 w_20_q mb-0 fs_elvee_quote' style={{ paddingRight: "8px", paddingBottom:'10px' }}>To: </p> */}
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Date To"
                                            value={toDate}
                                    
                                            format="DD MM YYYY"
                                            placeholder="DD MM YYYY"
                                    
                                            className='quotationFilterDates w_q fs_elvee_quote pd_right_elvee w100_dwsr'
                                            ref={toDateRef}
                                            inputProps={{ readOnly: true }}
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
                            <Box sx={{ paddingBottom: '0px', display: "flex", alignItems: "center", }} className="  fs_elvee_quote">
                                <Button variant='contained' className="muiSmilingRocksBtn" sx={{ padding: "9px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                
            }
                {isLoading ?
                    <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}><CircularProgress className='loadingBarManage' /></Box> :
                    <Paper sx={{ width: '100%', marginBottom: '10%' }} className="salesApiTableQMA">
                        <TableContainer style={{ maxHeight: 580, overflowX: 'auto', overflowY: 'auto' }}>
                            <Table
                                sx={{ minWidth: 750, border: "1px solid rgba(224, 224, 224, 1)", overflowX: 'auto', overflowX: 'auto' }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                    rowCount={filterData.length}
                                />
                                <TableBody>
                                    {visibleRows.map((row, index) => {

                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, index)}
                                                tabIndex={-1}
                                                key={index}
                                                sx={{ cursor: 'pointer' }}
                                            >

                                                <TableCell
                                                    component="td"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    align="center"
                                                    className="proCatApp_Qut_TopName"
                                                >

                                                    {page * rowsPerPage + index + 1}
                                                </TableCell>
                                                <TableCell className="proCatApp_Qut_TopName" align="center">{row.Date}</TableCell>
                                                <TableCell className="proCatApp_Qut_TopName" align="center">{row.SKUNo}</TableCell>
                                                <TableCell className="proCatApp_Qut_TopName" align="center">{row.TotalDesign}</TableCell>
                                                <TableCell className="proCatApp_Qut_TopName" align="right">{formatAmount(row.Amount)}</TableCell>
                                                <TableCell className="proCatApp_Qut_TopName" align="center">


                                                    <div onClick={() => handlePrintUrl(row?.PrintUrl)}>
                                                        <PrintIcon />
                                                    </div>


                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
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
        </div>
    )
}

export default QuotationQuote
