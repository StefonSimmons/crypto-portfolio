import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { showAssetPrice } from '../utilities/helpers'
export default function Portfolio({ assets, airTableInputs }) {

  const [headers, setHeaders] = useState([
    "Asset",
    "Allocation",
    "# of Crypto",
    "Price",
    "Value",
    "Change",
    "% Change",
    "Port %",
    "Curr Port %",
    "Cost Basis"
  ]) 
  const [portfolio, setPortfolio] = useState([])
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname
    if (pathname === '/all') {
      setPortfolio(airTableInputs)
    } else {
      const filtered = airTableInputs.filter(record => {
        if (pathname === '/hodl-portfolio') {
          return record.fields.paired === "USD"
        } else {
          return record.fields.paired === "BTC"
        }
      })
      setPortfolio(filtered)
    }
  }, [airTableInputs, location.pathname])

  return (
    <main className="main">
      {
        headers.map(header => (
          <h5 className="header">{header}</h5>
        )) 
      }
      {
        portfolio.map((record, idx) => {
          const { allocation, asset, numberOfCrypto, paired } = record.fields
          return (
            <React.Fragment key={record.id}>
              <h5 className={`row-${idx} col-1`}>{`${asset}-${paired}`}</h5>
              <h5 className={`row-${idx} col-2`}>{allocation}</h5>
              <h5 className={`row-${idx} col-3`}>{numberOfCrypto}</h5>
              {showAssetPrice(assets, asset, paired, idx)}
            </React.Fragment>
          )
        })
      }
    </main>
  )
}
