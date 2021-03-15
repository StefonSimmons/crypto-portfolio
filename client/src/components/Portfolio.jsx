import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { showAssetPrice } from '../utilities/helpers'
export default function Portfolio({ assets, airTableInputs }) {

  const [portfolio, setPortfolio] = useState([])
  const location = useLocation()

  useEffect(() => {
    const pathname = location.pathname
    if (pathname === '/all') {
      setPortfolio(airTableInputs)
    } else {
      const filtered = airTableInputs.filter(record => {
        if (pathname === '/hodl-portfolio') {
          return record.fields.paired === "BTC"
        } else {
          return record.fields.paired === "USD"
        }
      })
      setPortfolio(filtered)
    }
  }, [airTableInputs, location.pathname])

  return (
    <main className="main">
      {
        portfolio.map(record => {
          const { allocation, asset, numberOfCrypto, paired } = record.fields
          return (
            <div key={record.id} className="asset-column">
              <h5>{`${asset}-${paired}`}</h5>
              <h5>{allocation}</h5>
              <h5>{numberOfCrypto}</h5>
              {showAssetPrice(assets, asset)}
            </div>
          )
        })
      }
    </main>
  )
}
