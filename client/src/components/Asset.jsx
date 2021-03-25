import React, { useState } from 'react'
import EditForm from './EditForm'
import { deleteAirtableCrypto } from '../services/airtableCrypto'

export default function Asset({ idx, asset, paired, allocation, numberOfCrypto,
  record, price, investedUSD, investedBTC, priceObj, usdHoldings, btcHoldings, editFormID, setEditFormID, setReload }) {

  const [closeOut, showCloseOut] = useState('')

  // USD evaluation
  const value = numberOfCrypto * price
  const valueChange = value - allocation
  const percentChange = (valueChange / allocation) * 100
  const percentOfUSDPortInvested = (allocation / investedUSD) * 100
  const percentOfUSDPort = (value / usdHoldings) * 100

  // BTC evaluation 
  const priceInBTC = price / priceObj.BTC
  const valueInBTC = numberOfCrypto * priceInBTC
  const valueInBTCChange = valueInBTC - allocation
  const percentChangeInBTC = (valueInBTCChange / allocation) * 100
  const percentOfBTCPortInvested = (allocation / investedBTC) * 100
  const percentOfBTCPort = (valueInBTC / btcHoldings) * 100
  const costBasis = allocation / numberOfCrypto

  const handleDelete = async (recordID) => {
    await deleteAirtableCrypto(recordID)
    showCloseOut(false)
    setReload(curr => !curr)
  }

  return (

    <React.Fragment key={record.id}>
      {price &&
        <>
          { closeOut === `${idx}-1`
            ?
            <div className={`row-${idx} col-1 delete-container`}>
              <span className="delete-asset" onClick={() => handleDelete(record.id)}>delete</span>
              <span className="escape-delete" onClick={() => showCloseOut("")}>cancel</span>
            </div>
            : <h5 className={`row-${idx} col-1 select`} onClick={() => showCloseOut(`${idx}-1`)}>{`${asset}-${paired}`}</h5>
          }
          {editFormID === `${idx}-2`
            ? <div className={`row-${idx} col-2 edit-form`} ><EditForm setEditFormID={setEditFormID} asset={asset} paired={paired} allocation={allocation} accountId={record.id} numberOfCrypto={numberOfCrypto} setReload={setReload} eform="allocation" /></div>
            : <h5 className={`row-${idx} col-2`} onClick={() => setEditFormID(`${idx}-2`)}>{paired === "USD" ? `$${allocation}` : parseFloat(allocation)}</h5>
          }
          { editFormID === `${idx}-3`
            ? <div className={`row-${idx} col-3 edit-form`} ><EditForm setEditFormID={setEditFormID} asset={asset} paired={paired} allocation={allocation} numberOfCrypto={numberOfCrypto} accountId={record.id} setReload={setReload} eform="numofcrypto" /></div>
            : <h5 className={`row-${idx} col-3`} onClick={() => setEditFormID(`${idx}-3`)}>{parseFloat(numberOfCrypto)}</h5>
          }
          <h5 className={`row-${idx} col-4`}>{paired === "USD" ? `$${price.toFixed(2)}` : priceInBTC.toFixed(8)}</h5>
          <h5 className={`row-${idx} col-5`}>{paired === "USD" ? `$${value.toFixed(2)}` : valueInBTC.toFixed(8)}</h5>
          <h5 className={`row-${idx} col-6`}>{paired === "USD" ? `$${valueChange.toFixed(2)}` : valueInBTCChange.toFixed(8)}</h5>
          <h5 className={`row-${idx} col-7`}>{paired === "USD" ? `${percentChange.toFixed(2)}%` : `${percentChangeInBTC.toFixed(2)}%`}</h5>
          <h5 className={`row-${idx} col-7`}>{paired === "USD" ? `${percentOfUSDPortInvested.toFixed(2)}%` : `${percentOfBTCPortInvested.toFixed(2)}%`}</h5>
          <h5 className={`row-${idx} col-8`}>{paired === "USD" ? `${percentOfUSDPort.toFixed(2)}%` : `${percentOfBTCPort.toFixed(2)}%`}</h5>
          <h5 className={`row-${idx} col-9`}>{paired === "USD" ? `$${costBasis.toFixed(2)}` : costBasis.toFixed(8)}</h5>
        </>
      }

    </React.Fragment>
  )
}
