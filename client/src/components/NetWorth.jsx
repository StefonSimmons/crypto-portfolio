import React from 'react'

export default function Networth({ accounts, networth }) {


  return (
    <section className="networth-section">
      {
        accounts.map(acc => {
          const { fields: { account, total } } = acc
          return (
            <div key={acc.id} className="account-column">
              <h5 className="account-name">{account}</h5>
              <h5 className="account-total">${total}</h5>
            </div>
          )
        })
      }
      <div className="account-column">
        <h5 className="account-name">Total</h5>
        <h5 className="account-total">${networth}</h5>
      </div>
    </section>
  )
}
