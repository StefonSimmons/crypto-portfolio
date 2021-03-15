import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { getCoinMarketData } from "./services/coinmarketCrypto"
import { getAirtableInputs } from "./services/airtableCrypto"
import { getUniqueSymbols } from './utilities/helpers'

import Header from "./components/Header"


function App() {
  const [assets, setAssets] = useState([])

  const getCoinData = async (symbols) => {
    const res = await getCoinMarketData(symbols)
    const data = res.data.data
    setAssets(data)
  }

  const getTableData = async () => {
    const res = await getAirtableInputs()
    const records = res.data.records
    getCoinData(getUniqueSymbols(records))
  }

  useEffect(() => {
    // getTableData()
  }, [])


  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
