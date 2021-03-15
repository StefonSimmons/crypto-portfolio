import React from 'react'

export default function NetWorth({ accounts }) {
  return (
    <section className="networth-section">
      {
        accounts.map(acc => {
          const { fields: { account, total } } = acc
          return (
            <div key={acc.id} className="account-column">
              <h5 className="account-name">{account}</h5>
              <hr/>
              <h5 className="account-total">{total}</h5>
            </div>
          )
        })
      }
      <div className="account-column">
        <h5 className="account-name">Total</h5>
        <hr/>
        <h5 className="account-total">$$$$$</h5>
      </div>
    </section>
  )
}
