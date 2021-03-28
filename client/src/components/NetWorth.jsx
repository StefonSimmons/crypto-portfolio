import React from 'react'
import EditForm from './EditForm'

export default function Networth({ accounts, networth, setReload, editFormID, setEditFormID, user }) {

  return (
    <section className="networth-section">
      {
        accounts.map(acc => {
          const { fields: { account, total } } = acc
          return (
            <div key={acc.id} className="account-column">
              <h5 className="account-name">{account}</h5>
              { user?.username === 'sound' ?
                <>
                  {editFormID === acc.id
                    ? <EditForm accountId={acc.id} account={account} setReload={setReload} setEditFormID={setEditFormID} total={total} />
                    : <h5
                      className="account-total"
                      onClick={() => setEditFormID(acc.id)}
                    >${total}</h5>
                  }
                </>
                : <h5 className="account-total">--</h5>
              }
            </div>
          )
        })
      }
      <div className="account-column">
        <h5 className="account-name">Total</h5>
        <h5 className="account-total">{user?.username === 'sound' ? `$${networth}` : '--'}</h5>
      </div>
    </section>
  )
}
