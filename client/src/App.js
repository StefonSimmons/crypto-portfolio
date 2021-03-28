import { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { getCoinMarketData } from "./services/coinmarketCrypto"
import { getAirtableCrypto, getAirtableNetWorth } from "./services/airtableCrypto"
import { getUniqueSymbols, sumTotals } from './utilities/helpers'

import Header from "./components/Header"
import Networth from './components/Networth'
import Portfolio from './components/Portfolio'
import Home from './components/Home'
import Login from './components/Login'

function App() {
  const [assets, setAssets] = useState([])
  const [accounts, setAccounts] = useState([])
  const [airTableInputs, setInputs] = useState([])
  const [networth, setNetworth] = useState(0)
  const [editFormID, setEditFormID] = useState('')

  const [reload, setReload] = useState(false)

  const getCoinData = async (symbols) => {
    const res = await getCoinMarketData(symbols)
    const data = Object.values(res.data.data)
    setAssets(data)
  }


  useEffect(() => {
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

    getTableData()
    // eslint-disable-next-line
  }, [reload])



  return (
    <div className="body">
      <Header/>
      <Networth accounts={accounts} networth={networth} setReload={setReload} editFormID={editFormID} setEditFormID={setEditFormID} />
      <Route exact path="/">
        <Home/>
      </Route>
      <Route path="/hodl-portfolio">
        <Portfolio cmcAssets={assets} airTableInputs={airTableInputs} editFormID={editFormID} setEditFormID={setEditFormID} setReload={setReload} />
      </Route>
      <Route path="/trade-portfolio">
        <Portfolio cmcAssets={assets} airTableInputs={airTableInputs} editFormID={editFormID} setEditFormID={setEditFormID} setReload={setReload} />
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
    </div>
  );
}

export default App;
