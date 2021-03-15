import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { getCoinMarketData } from "./services/coinmarketCrypto"
import { getAirtableCrypto, getAirtableNetWorth } from "./services/airtableCrypto"
import { getUniqueSymbols } from './utilities/helpers'

import Header from "./components/Header"
import NetWorth from './components/NetWorth'


function App() {
  const [assets, setAssets] = useState([])
  const [networthAccts, setNetworthAccts] = useState([])

  const getCoinData = async (symbols) => {
    const res = await getCoinMarketData(symbols)
    const data = res.data.data
    setAssets(data)
  }

  const getTableData = async () => {
    const cryptoRes = await getAirtableCrypto()
    const cryptoRecords = cryptoRes.data.records
    getCoinData(getUniqueSymbols(cryptoRecords))

    const networthRes = await getAirtableNetWorth()
    const networthRecords = networthRes.data.records
    setNetworthAccts(networthRecords)
  }

  useEffect(() => {
    getTableData()
  }, [])


  return (
    <div className="body">
      <Header />
      <NetWorth accounts={networthAccts} />
      <hr/>
      <main className="main">

      </main>
    </div>
  );
}

export default App;
