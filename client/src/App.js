import { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getCoinMarketData } from "./services/coinmarketCrypto"
import { getAirtableCrypto, getAirtableNetWorth } from "./services/airtableCrypto"
import { createAccount, loginAccount, verify } from './services/authentication'
import { getUniqueSymbols, sumTotals } from './utilities/helpers'

import Header from "./components/Header"
import Networth from './components/Networth'
import Portfolio from './components/Portfolio'
import Home from './components/Home'
import Login from './components/Login'
import CreateAccount from './components/CreateAccount'

function App() {
  const [user, setUser] = useState(null)
  const [assets, setAssets] = useState([])
  const [accounts, setAccounts] = useState([])
  const [airTableInputs, setInputs] = useState([])
  const [networth, setNetworth] = useState(0)
  const [editFormID, setEditFormID] = useState('')

  const [reload, setReload] = useState(false)
  const [reVerify, setReverify] = useState(false)

  const getCoinData = async (symbols) => {
    const res = await getCoinMarketData(symbols)
    const data = Object.values(res.data.data)
    setAssets(data)
  }

  useEffect(() => {
    async function verifyAccount() {
      const account = await verify()
      setUser(account)
    }
    verifyAccount()
  }, [reVerify])

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
      <Header user={user} setReverify={setReverify} setReload={setReload}/>
      <Networth accounts={accounts} networth={networth} setReload={setReload} editFormID={editFormID} setEditFormID={setEditFormID} user={user} />
      <Route exact path="/">
        <Home user={user} />
      </Route>
      <Route path="/hodl-portfolio">
        {user?.username !== 'sound' && <Redirect to="/" />}
        <Portfolio cmcAssets={assets} airTableInputs={airTableInputs} editFormID={editFormID} setEditFormID={setEditFormID} setReload={setReload} />
      </Route>
      <Route path="/trade-portfolio">
        {user?.username !== 'sound' && <Redirect to="/" />}
        <Portfolio cmcAssets={assets} airTableInputs={airTableInputs} editFormID={editFormID} setEditFormID={setEditFormID} setReload={setReload} />
      </Route>
      <Route path="/login">
        <Login loginAccount={loginAccount} setUser={setUser} />
      </Route>
      <Route path="/create-account">
        <CreateAccount createAccount={createAccount} setuser={setUser} />
      </Route>
    </div>
  );
}

export default App;
