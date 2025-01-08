import React, { useEffect } from 'react'
import  ReactHTMLTableToExcel  from 'react-html-table-to-excel';
import { formatAmount } from '../../../../../../utils/Glob_Functions/AccountPages/AccountPage';
const AccountLedgerExcel = ({filterArray, credit_curr_diff, credit_amt_diff, credit_mg_diff, credit_dia_diff, debit_curr_diff, debit_amt_diff, debit_mg_diff, debit_dia_diff, resultTotal, currencySymbol}) => {

    console.log("filter array",filterArray);
    console.log("result total",resultTotal);
    console.log("credit",credit_amt_diff, credit_curr_diff, credit_dia_diff, credit_mg_diff);
    console.log("debit",debit_amt_diff, debit_curr_diff, debit_dia_diff, debit_mg_diff);
    console.log("symbol", currencySymbol);
    
    

    // const loadData = () => {
    //     setTimeout(() => {
    //         const button = document.getElementById('test-table-xls-button');
    //         button.click();
    //       }, 500);

    // }
    // useEffect(() => {
    //     loadData();
    // },[]);

  return (
    <>
    {/* <button onClick={() => loadData()}>Excel Download</button> */}
    <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button btn btn-success text-black bg-success px-2 py-1 fs-5 d-none"
        table="table-to-xls"
        filename={`AccountLedger_${Date.now()}`}
        sheet="tablexls"
        buttonText="Download as XLS"
    />
    <div className='d-none'>
    <table id='table-to-xls'>
      <tr>
        
            
                <td align='center' ><h3>Balance Gold</h3></td>
                <td colSpan={3} align='center'>
                    <h3>
                    <b>
                    {   ((((resultTotal?.debit_metalgold  + Math.abs(debit_mg_diff) ) - 
                                    ( resultTotal?.credit_metalgold + Math.abs(credit_mg_diff)))?.toFixed(3)) === 'NaN' ? '0.00' :  
                                    (((resultTotal?.debit_metalgold  + Math.abs(debit_mg_diff) ) - ( resultTotal?.credit_metalgold + Math.abs(credit_mg_diff)))?.toFixed(3)))
                    }
                    { ((resultTotal?.debit_metalgold + Math.abs(debit_mg_diff)) - (resultTotal?.credit_metalgold + Math.abs(credit_mg_diff))) > 0 ? 'Dr' : ' Cr' }
                    </b>
                    </h3>
                </td>
                <td></td>
                <td></td>
                <td align='center'><h3>Balance Diamond</h3></td>
                <td colSpan={3} align='center'>
                    <h3>
                    <b>
                    { ((((Math.abs(debit_dia_diff) + resultTotal?.debit_diamondwt) - (Math.abs(credit_dia_diff) + resultTotal?.credit_diamondwt))?.toFixed(3)) === 'NaN' ? '0.00'
                    : (((Math.abs(debit_dia_diff) + resultTotal?.debit_diamondwt) - (Math.abs(credit_dia_diff) + resultTotal?.credit_diamondwt))?.toFixed(3))) }
                    { ((Math.abs(debit_dia_diff) + resultTotal?.debit_diamondwt) - (Math.abs(credit_dia_diff) + resultTotal?.credit_diamondwt)) > 0 ? 'Dr' : ' Cr' }
                    </b>
                    </h3> 
                </td>
                <td></td>
                <td></td>
                <td align='center'><h3>Balance Amount</h3></td>
                <td colSpan={3} align='center'>
                    <h3>
                    <b>
                    <span>
                            <span dangerouslySetInnerHTML={{__html:currencySymbol}}></span>&nbsp;
                            { ((formatAmount(
                                (Math.abs(debit_curr_diff) + resultTotal?.debit_totalcurrency) - (Math.abs(credit_curr_diff) + resultTotal?.credit_totalcurrency))
                              ) === 'NaN' ? '0.00' : (formatAmount(
                                (Math.abs(debit_curr_diff) + resultTotal?.debit_totalcurrency) - (Math.abs(credit_curr_diff) + resultTotal?.credit_totalcurrency))
                              ))
                            }&nbsp;

                            {(((Math.abs(debit_curr_diff) + resultTotal?.debit_totalcurrency) - (Math.abs(credit_curr_diff) + resultTotal?.credit_totalcurrency)) ? 'Dr' : ' Cr' ) }
                    </span>
                    </b>
                    </h3>
                </td>
            
        
      </tr>

      <tr>
        <th colSpan={8} align='center'>DEBIT</th>
        <th  colSpan={8} align='center'>CREDIT</th>
      </tr>
      <tr>
        <th  align='center'>DATE</th>
        <th  align='center' colSpan={2}>PARTICULAR</th>
        <th  align='center'>VOUCHER</th>
        <th  align='center'>METAL</th>
        <th  align='center'>DIAM.</th>
        <th  align='center'>CURRENCY</th>
        <th  align='center'>VERIFIED</th>
        <th  align='center'>DATE</th>
        <th  align='center' colSpan={2}>PARTICULAR</th>
        <th  align='center'>VOUCHER</th>
        <th  align='center'>METAL</th>
        <th  align='center'>DIAM.</th>
        <th  align='center'>CURRENCY</th>
        <th  align='center'>VERIFIED</th>
      </tr>
        {
                                            ((Math.abs(debit_amt_diff) === 0) && 
                                            (Math.abs(debit_curr_diff) === 0) &&
                                            (Math.abs(debit_dia_diff) === 0) &&
                                            (Math.abs(debit_mg_diff) === 0) &&
                                            (Math.abs(credit_amt_diff) === 0) &&
                                            (Math.abs(credit_curr_diff) === 0) &&
                                            (Math.abs(credit_mg_diff) === 0) &&
                                            (Math.abs(credit_dia_diff) === 0)) ? '' : <tr className='border_Acc fw_bold_acc'>
                                            <td className='border_end_acc p_1_acc text_center_acc'></td>
                                            <td className='border_end_acc p_1_acc  ps_1_acc' align='center'>Opening</td>
                                            <td className='border_end_acc p_1_acc text_start_acc ps_1_acc'></td>
                                            <td className='border_end_acc p_1_acc text_end_acc ps_1_acc'>{ (Math.abs(debit_mg_diff))?.toFixed(3) === '0.000' ? '' : (Math.abs(debit_mg_diff))?.toFixed(3)}</td>
                                            <td className='border_end_acc p_1_acc text_end_acc ps_1_acc'>{(Math.abs(debit_dia_diff))?.toFixed(3) === '0.000' ? '' : (Math.abs(debit_dia_diff))?.toFixed(3)}</td>

                                            <td className='border_end_acc p_1_acc text_end_acc pe_1_acc' style={{minWidth:'100px'}}>{Math.abs(debit_curr_diff) === 0.00 ? '' : formatAmount(Math.abs(debit_curr_diff))}</td>
                                            <td className='border_end_acc p_1_acc text_center_acc'></td>
                                            <td className='border_end_acc p_1_acc text_center_acc'></td>
                                            <td className='border_end_acc p_1_acc text_start_acc ps_1_acc' align='center'>Opening</td>
                                            <td className='border_end_acc p_1_acc text_end_acc pe_1_acc'></td>
                                            <td className='border_end_acc p_1_acc text_end_acc ps_1_acc'>{(Math.abs(credit_mg_diff))?.toFixed(3) === '0.000' ? '' : (Math.abs(credit_mg_diff))?.toFixed(3)}</td>
                                            <td className='border_end_acc p_1_acc text_end_acc ps_1_acc'>{(Math.abs(credit_dia_diff))?.toFixed(3) === '0.000' ? '' : (Math.abs(credit_dia_diff))?.toFixed(3)}</td>
                  
                                            <td className='border_end_acc p_1_acc text_end_acc pe_1_acc' style={{minWidth:'100px'}}>{Math.abs(credit_curr_diff) === 0.00 ? '' : formatAmount(Math.abs(credit_curr_diff))}</td>
                                            <td className=' p_1_acc text_center_acc'></td>
                                        </tr> 
                                        }
      {
        filterArray?.map((e, i) => {
            return <React.Fragment key={i}>
                <tr>
                    <td  align='center'>{e?.IsDebit === 0 ? '' : e?.EntryDate}</td>
                    <td  align='center' colSpan={2}>{ e?.IsDebit === 0 ? '' : e?.particular}</td>
                    <td  align='center'>{e?.IsDebit === 0 ? '' : e?.referenceno === '' ? e?.voucherno : e?.referenceno}</td>
                    <td  align='center'>{e?.IsDebit === 0 ? '' : (e?.metalctw === 0 ? '' : e?.metalctw)}</td>
                    <td  align='center'>{e?.IsDebit === 0 ? '' : (e?.diamondctw === 0 ? '' : e?.diamondctw)}</td>
                    <td  align='center'>{ e?.IsDebit !== 0 && <span dangerouslySetInnerHTML={{__html: e?.CurrencyCode}}></span>} {e?.IsDebit === 0 ? '' : ` ${formatAmount(e?.Currency) === 'NaN' ? '' : formatAmount(e?.Currency)} `}</td>
                    <td  align='center'></td>
                    <td  align='center'>{e?.IsDebit === 0 ? e?.EntryDate : ''}</td>
                    <td  align='center' colSpan={2}>{e?.IsDebit === 0 ? e?.particular : ''}</td>
                    <td  align='center'>{e?.IsDebit === 0 ? e?.referenceno === '' ? e?.voucherno : e?.referenceno : ''}</td>
                    <td  align='center'>{e?.IsDebit === 0 ? (e?.metalctw === 0 ? '' : e?.metalctw) : ''}</td>
                    <td  align='center'>{e?.IsDebit === 0 ? (e?.diamondctw === 0 ? '' : e?.diamondctw) : ''}</td>
                    <td  align='center'> { e?.IsDebit === 0 && <span dangerouslySetInnerHTML={{__html: e?.CurrencyCode}}></span>} {e?.IsDebit === 0 ? ` ${e?.Currency === 0 ? '' : formatAmount(e?.Currency)}`  : ''}</td>
                    <td  align='center'>{e.IsVerified === 0 ? 'VERIFIED' : ''}</td>
                </tr>

            </React.Fragment>
        })
      }
                    <tr>
                        <th  align='center'>TOTAL</th>
                        <th  align='center' colSpan={2}></th>
                        <th  align='center'></th>
                        <th  align='center'>{((Math.abs(debit_mg_diff) + resultTotal?.debit_metalgold))?.toFixed(3) === '0.000' ? '' : (( (Math.abs(debit_mg_diff) + resultTotal?.debit_metalgold))?.toFixed(3) === 'NaN' ? '0.00' : ( (Math.abs(debit_mg_diff) + resultTotal?.debit_metalgold))?.toFixed(3))}</th>
                        <th  align='center'>{((Math.abs(debit_dia_diff) + resultTotal?.debit_diamondwt))?.toFixed(3) === '0.000' ? '' : (((Math.abs(debit_dia_diff) + resultTotal?.debit_diamondwt))?.toFixed(3) === 'NaN' ? '0.00' : ((Math.abs(debit_dia_diff) + resultTotal?.debit_diamondwt))?.toFixed(3))}</th>
                        <th  align='center'>
                            {formatAmount((Math.abs(debit_curr_diff) + resultTotal?.debit_totalcurrency)) === '0.00' ? '' :  <span dangerouslySetInnerHTML={{__html:currencySymbol}}></span>}&nbsp;{formatAmount((Math.abs(debit_curr_diff) + resultTotal?.debit_totalcurrency)) === '0.00' ? '' : (formatAmount((Math.abs(debit_curr_diff) + resultTotal?.debit_totalcurrency)) === 'NaN' ? '0.00' : formatAmount((Math.abs(debit_curr_diff) + resultTotal?.debit_totalcurrency)))}
                        </th>
                        <th  align='center'></th>
                        <th  align='center'></th>
                        <th  align='center' colSpan={2}></th>
                        <th  align='center'></th>
                        <th  align='center'>{((Math.abs(credit_mg_diff) + resultTotal?.credit_metalgold))?.toFixed(3) === '0.000' ? '' : (((Math.abs(credit_mg_diff) + resultTotal?.credit_metalgold))?.toFixed(3) === 'NaN' ? '0.00' : ((Math.abs(credit_mg_diff) + resultTotal?.credit_metalgold))?.toFixed(3))}</th>
                        <th  align='center'>{((Math.abs(credit_dia_diff) + resultTotal?.credit_diamondwt))?.toFixed(3) === '0.000' ? '' : (((Math.abs(credit_dia_diff) + resultTotal?.credit_diamondwt))?.toFixed(3) === 'NaN' ? '0.00' : ((Math.abs(credit_dia_diff) + resultTotal?.credit_diamondwt))?.toFixed(3))}</th>
                        <th  align='center'>{formatAmount((Math.abs(credit_curr_diff) + resultTotal?.credit_totalcurrency)) === '0.00' ? '' : <span dangerouslySetInnerHTML={{__html:currencySymbol}}></span>}
                        &nbsp;
                        {formatAmount((Math.abs(credit_curr_diff) + resultTotal?.credit_totalcurrency)) === '0.00' ? '' : ((formatAmount((Math.abs(credit_curr_diff) + resultTotal?.credit_totalcurrency)) === 'NaN' ? '0.00' : formatAmount((Math.abs(credit_curr_diff) + resultTotal?.credit_totalcurrency))))}
                        </th>
                        <th  align='center'></th>
                    </tr>
    </table>
    </div>
    </>
  )
}

export default AccountLedgerExcel;