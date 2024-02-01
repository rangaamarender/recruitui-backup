import React from 'react'
import { useSelector } from 'react-redux';
import {Button} from 'primereact/button';
function ContractTerms() {
    const {contractSummarySelected} = useSelector((state) => state.contract);
    console.log(contractSummarySelected,"contractSummarySelected");
  const selectedCompanyData= contractSummarySelected;
    return (
        <>
             <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
            <h5 className='fw-bold m-2'>Contract Billing Details</h5>
            <Button
              label=""
              severity="primary"
              icon="pi pi-plus fs-5"
            //   onClick={addAddressActionHandler}
              size="small"
              className='m-2'
            />
          </div>
                <div className="formgrid grid col-12">
                {/* <div className="col-12 md:col-6">
                <p className='fw-bold'>Contract Billing Details</p>
                </div> */}
     {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"].length >0 && <table className="table m-2">
                    <thead>
                        <tr>
                            <th className="l-width-70">BillPeriod Units</th>
                            <th className="l-width-70">BillCycle</th>
                            <th className="l-width-70">Start Date</th>
                            <th className="l-width-30">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"]?.map((contractBillingDetails,index) =>(
                            <tr
                             key={index}
                            >
                                <td className="text-start">{contractBillingDetails?.billPeriodUnits}</td>
                                <td>{contractBillingDetails?.billCycle || ''}</td>
                                <td>{contractBillingDetails?.startDate || ''}</td>
                                <td className="text-start">
                                  <span>
                                        <i className="pi pi-pencil m-2"></i>
                                        </span>
                                        <span>
                                        <i className="pi pi-trash"></i>
                                        </span>
                                </td>
                            </tr>
                         ))} 
                    </tbody>
                </table> 
}
{selectedCompanyData?.["contractAccounts"]?.[0]?.["contractBillingDetails"].length === 0 && 
(
  <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
<p className='m-4'>No data is Available</p>
</div> )}
                </div>
                <div className="company-main-text border-bottom fs-6 pb-2 mt-2 fw-bold d-flex justify-content-between align-items-center">
            <h5 className='fw-bold m-2'>Contract Discounts</h5>
            <Button
              label=""
              severity="primary"
              icon="pi pi-plus fs-5"
            //   onClick={addAddressActionHandler}
              size="small"
              className='m-2'
            />
          </div>
                <div className="formgrid grid col-12">

        {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"].length === 0 && <p>No data is Available</p> }        
        {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"].length > 0  && (
        <table className="table m-2">
                    <thead>
                        <tr>
                            <th className="l-width-70">DiscountName</th>
                            <th className="l-width-70">Start Date</th>
                            <th className="l-width-30">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                {selectedCompanyData?.["contractAccounts"]?.[0]?.["contractDiscounts"]?.map((contractBillingDetails,index) =>(
                            <tr
                             key={index}
                            >
                                <td className="text-start">{contractBillingDetails?.discountName || ''}</td>
                                <td>{contractBillingDetails?.startDate || ''}</td>
                                <td className="text-start">
                                  <span>
                                        <i className="pi pi-pencil m-2"></i>
                                        </span>
                                        <span>
                                        <i className="pi pi-trash"></i>
                                        </span>
                                </td>
                            </tr>
                         ))} 
                    </tbody>
                </table>
)}          
                </div>

            </>
  )
}

export default ContractTerms