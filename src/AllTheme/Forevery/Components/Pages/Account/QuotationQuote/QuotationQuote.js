import "./QuotationQuote.scss";
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
import { Button, CircularProgress, TextField } from "@mui/material";
import { CommonAPI } from "../../../../../../utils/API/CommonAPI/CommonAPI";
import PrintIcon from '@mui/icons-material/Print';
import { formatAmount, checkMonth, customComparator_Col, stableSort } from "../../../../../../utils/Glob_Functions/AccountPages/AccountPage";
import { visuallyHidden } from '@mui/utils';
import { addYears, subYears } from 'date-fns';
import moment from 'moment';
import Swal from 'sweetalert2';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import Paper from '@mui/material/Paper';
import { getQuotationQuoteData } from "../../../../../../utils/API/AccountTabs/quotationQuote";

import { headCells_Quotation as headCells } from "../../../../../../utils/Glob_Functions/AccountPages/AccountPageColumns";

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
    } else if ((orderBy === 'SKUNo') ) {
        // Handle sorting for SKU# column
        return customComparator_Col(a[orderBy], b[orderBy]);
    }  else {
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



const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
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
                    <>
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
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
                    </>
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
        if(property?.toLowerCase() === 'srno') return null;
        else{

            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
        }
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
        <div className="quotationQuote_Account_FE">
        <Box className='smilingSavedAddressMain salesApiSectionQWeb' sx={{ padding: "20px"}}>
            <Box className="d_flex_quote" sx={{ display: "flex", flexWrap: "wrap" }}>
                <Box sx={{ paddingRight: "15px" }} className="AllQuoteBtn QuotePadSec">
                    <Button variant="contained" className="muiSmilingRocksBtn" sx={{ background: "#7d7f85", display: "flex", alignItems: "center", marginBottom: 0, padding: "6px 0", }} onClick={eve => resetAllFilters(eve)}>
                        All
                    </Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", position: "relative", padding: "0 15px 35px 0", maxWidth: "max-content" }} className="searchbox QuotePadSec w_q">
                    <TextField id="standard-basic" label="Search" variant="outlined" className="w_q" value={searchVal} onChange={eve => {
                        setSearchVal(eve?.target?.value);
                        handleSearch(eve, eve?.target?.value, fromDate, toDate);
                    }} />
                    <Button sx={{ padding: 0, maxWidth: "max-content", minWidth: "max-content", position: "absolute", right: "20px", color: "#757575" }}
                        onClick={eve => handleSearch(eve, searchVal, fromDate, toDate)}><SearchIcon /></Button>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }} className="d_flex_quote w_q">
                    <Box sx={{ display: "flex", alignItems: "center", paddingRight: "15px", paddingBottom: "35px" }} className="QuotePadSec w_q">
                        <p className='w_20_q' style={{ paddingRight: "8px", fontSize:'14px',marginBottom:'0px' }}>Date: </p>
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
                    <Box sx={{ display: "flex", alignItems: "center", paddingBottom: "35px", paddingRight: "15px" }} className="QuotePadSec w_q">
                        <p className='w_20_q ' style={{ paddingRight: "8px", fontSize:'14px', marginBottom:'0px' }}>To: </p>
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
                </Box>
                <Box sx={{ padding: "0 15px 35px 0", display: "flex", alignItems: "center", }} className="QuotePadSec pad_left_q">
                    <Button variant='contained' className="muiSmilingRocksBtn" sx={{ padding: "7px 10px", minWidth: "max-content", background: "#7d7f85" }} onClick={(eve) => handleSearch(eve, searchVal, fromDate, toDate)}><SearchIcon sx={{ color: "#fff !important" }} /></Button>
                </Box>
            </Box>
            {isLoading ?
                <Box sx={{ display: "flex", justifyContent: "center", paddingTop: "10px" }}><CircularProgress className='loadingBarManage' /></Box> : 
                <Paper sx={{ width: '100%', mb: 2 }} className="salesApiTableQWeb">
                    <TableContainer style={{maxHeight: 580, overflowX:'auto', overflowY:'auto'}}>
                        <Table
                            sx={{ minWidth: 750, border: "1px solid rgba(224, 224, 224, 1)", overflowX:'auto', overflowY:'auto'}}
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
                                            >
                                            
                                                {page * rowsPerPage + index + 1}
                                            </TableCell>
                                            <TableCell align="center">{row.Date}</TableCell>
                                            <TableCell align="center">{row.SKUNo}</TableCell>
                                            <TableCell align="center">{row.TotalDesign}</TableCell>
                                            <TableCell align="right">{formatAmount(row.Amount)}</TableCell>
                                            <TableCell align="center">
                                                
                                               
                                                        <div onClick={() => handlePrintUrl(row?.PrintUrl)}>
                                                            <PrintIcon   />
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

// import React from 'react'

// const QuotationQuote = () => {
//   return (
//     <div>QuotationQuote</div>
//   )
// }

// export default QuotationQuote