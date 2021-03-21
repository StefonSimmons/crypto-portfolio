import React from 'react'

export default function Asset({ idx, asset, paired, allocation, numberOfCrypto,
  record, price, investedUSD, investedBTC, priceObj, usdHoldings, btcHoldings }) {
  
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


  return (

    <React.Fragment key={record.id}>
      {price &&
        <>
          <h5 className={`row-${idx} col-1`}>{`${asset}-${paired}`}</h5>
          <h5 className={`row-${idx} col-2`}>{paired === "USD" ? `$${allocation}` : parseFloat(allocation)}</h5>
          <h5 className={`row-${idx} col-3`}>{parseFloat(numberOfCrypto)}</h5>
          <h5 className={`row-${idx} col-4`}>{paired === "USD" ? `$${price.toFixed(2)}` : priceInBTC.toFixed(8)}</h5>
          <h5 className={`row-${idx} col-5`}>{paired === "USD" ? `$${value.toFixed(2)}` : valueInBTC.toFixed(8)}</h5>
          <h5 className={`row-${idx} col-6`}>{paired === "USD" ? `$${valueChange.toFixed(2)}` : valueInBTCChange.toFixed(8)}</h5>
          <h5 className={`row-${idx} col-7`}>{paired === "USD" ? `${percentChange.toFixed(2)}%` : `${percentChangeInBTC.toFixed(2)}%`}</h5>
          <h5 className={`row-${idx} col-7`}>{paired === "USD" ? `${percentOfUSDPortInvested.toFixed(2)}%` : `${percentOfBTCPortInvested.toFixed(2)}%`}</h5>
          <h5 className={`row-${idx} col-8`}>{paired === "USD" ? `${percentOfUSDPort.toFixed(2)}%` : `${percentOfBTCPort.toFixed(2)}%`}</h5>
          <h5 className={`row-${idx} col-9`}>{paired === "USD" ? `$${costBasis.toFixed(2)}`: costBasis.toFixed(8)}</h5>
        </>
      }

    </React.Fragment>
  )
}
