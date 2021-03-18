import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Asset from './Asset'


export default function Portfolio({ cmcAssets, airTableInputs }) {

  const headers = [
    "Asset",
    "Allocation",
    "# of Crypto",
    "Price",
    "Value",
    "Change",
    "% Change",
    "% of Port",
    "Cur Port %",
    "Cost Basis"
  ]
  const [portfolio, setPortfolio] = useState([])
  const location = useLocation()
  const [priceObj, setPriceObj] = useState({})
  const [investedUSD, setInvestedUSD] = useState(0)
  const [investedBTC, setInvestedBTC] = useState(0)
  const [usdHoldings, setUSDHoldings] = useState(0)
  const [btcHoldings, setBTCHoldings] = useState(0)
  const pathname = location.pathname

  useEffect(() => {
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

    // SUM of Invested USD
    const usdPaired = airTableInputs.filter(asset => asset.fields.paired === "USD")
    const sumInvestedUSD = usdPaired.reduce((acc, curr) => {
      return acc + parseFloat(curr.fields.allocation)
    }, 0)
    setInvestedUSD(sumInvestedUSD)

    // SUM of Invested BTC
    const btcPaired = airTableInputs.filter(asset => asset.fields.paired === "BTC")
    const sumInvestedBTC = btcPaired.reduce((acc, curr) => acc + parseFloat(curr.fields.allocation), 0)
    setInvestedBTC(sumInvestedBTC)

    // Creating an array of values (value*allocation) to reduce to a total of USD holdings
    const usdHoldingValues = usdPaired.map(asset => {
      return asset.fields.numberOfCrypto * priceObj[asset.fields.asset]
    })
    const sumOfUSDHoldings = usdHoldingValues.reduce((acc, curr) => acc + curr, 0)
    setUSDHoldings(sumOfUSDHoldings)

    // Creating an array of values (value*allocation) to reduce to a total of BTC holdings
    const btcHoldingValues = btcPaired.map(asset => {
      return asset.fields.numberOfCrypto * priceObj[asset.fields.asset]
    })
    const sumOfBTCHoldings = btcHoldingValues.reduce((acc, curr) => {
      return acc + curr
    }, 0)
    setBTCHoldings(sumOfBTCHoldings / priceObj.BTC)

  }, [airTableInputs, location.pathname])



  useEffect(() => {
    // Create Price Object of current crypto holdings
    const getPrices = () => {
      cmcAssets.forEach(asset => {
        const { symbol, quote: { USD: { price } } } = asset
        priceObj[symbol] = price
      })
    }
    getPrices()
  }, [location, cmcAssets])


  return (
    <main className="main">
      {headers.map((header, idx) => <h5 key={idx} className="header">{header}</h5>)}
      {
        portfolio.map((record, idx) => {
          const { allocation, asset, numberOfCrypto, paired } = record.fields
          return (
            <Asset
              allocation={allocation} asset={asset} key={idx} idx={idx}
              numberOfCrypto={numberOfCrypto} paired={paired}
              record={record} price={priceObj[asset]} priceObj={priceObj} investedUSD={investedUSD}
              investedBTC={investedBTC} usdHoldings={usdHoldings} btcHoldings={btcHoldings}
            />
          )
        })
      }
      <h5>Total Holdings: {pathname === "USD" ? usdHoldings.toFixed(2) : btcHoldings.toFixed(8)}</h5>
    </main>
  )
}
