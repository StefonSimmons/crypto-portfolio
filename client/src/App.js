import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { getCoinMarketData } from "./services/coinmarketCrypto"
import { getAirtableCrypto, getAirtableNetWorth } from "./services/airtableCrypto"
import { getUniqueSymbols, sumTotals } from './utilities/helpers'

import Header from "./components/Header"
import Networth from './components/Networth'
import Portfolio from './components/Portfolio'


function App() {
  const [assets, setAssets] = useState([])
  const [accounts, setAccounts] = useState([])
  const [airTableInputs, setInputs] = useState([])
  const [networth, setNetworth] = useState(0)

  const getCoinData = async (symbols) => {
    const res = await getCoinMarketData(symbols)
    const data = Object.values(res.data.data)
    setAssets(data)
  }

  const getTableData = async () => {
    const cryptoRes = await getAirtableCrypto()
    const cryptoRecords = cryptoRes.data.records
    setInputs(cryptoRecords)
    getCoinData(getUniqueSymbols(cryptoRecords))

    const acctRes = await getAirtableNetWorth()
    const acctRecords = acctRes.data.records
    setAccounts(acctRecords)
    setNetworth(sumTotals(acctRecords))
  }

  useEffect(() => {
    getTableData()
    // eslint-disable-next-line
  }, [])


  return (
    <div className="body">
      <Header />
      <Networth accounts={accounts} networth={networth} />
      <Route exact path="/all">
        <Portfolio cmcAssets={assets} airTableInputs={airTableInputs} />
      </Route>
      <Route path="/hodl-portfolio">
        <Portfolio cmcAssets={assets} airTableInputs={airTableInputs} />
      </Route>
      <Route path="/trade-portfolio">
        <Portfolio cmcAssets={assets} airTableInputs={airTableInputs} />
      </Route>
    </div>
  );
}

export default App;
