import React, { useState } from 'react'
import { postAirtableNetworth } from '../services/airtableCrypto'

export default function NetEditForm({ accountId, account, setReload, setEditFormID, total }) {

  const [networth, setNetWorth] = useState(total)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postAirtableNetworth({ account, total: networth }, accountId)
    setEditFormID("")
    setReload((curr) => !curr)
  }

  const handleChange = (e) => {
    const { valueAsNumber } = e.target
    setNetWorth(valueAsNumber)
  }

  return (
    <>
      <form className="networth-form" onSubmit={handleSubmit}>
        <span className="networth-form-close" onClick={() => setEditFormID("")}>x</span>
        <input className="networth-input" onChange={(e) => handleChange(e)} type="number" value={networth} />
        <input className="networth-sbmt-btn" type="submit" />
      </form>
    </>
  )
}
