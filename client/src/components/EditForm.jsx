import React, { useEffect, useState } from 'react'
import { updateAirtableNetworth, updateAirtableCrypto } from '../services/airtableCrypto'

export default function EditForm({ accountId, account, setReload, setEditFormID, total, asset, paired, allocation, numberOfCrypto, eform }) {

  const [value, setValue] = useState('')

  useEffect(() => {
    if (total) {
      setValue(total)
    } else if (eform === 'numofcrypto') {
      setValue(numberOfCrypto)
    } else {
      setValue(allocation)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (total) {
      await updateAirtableNetworth({ account, total: value }, accountId)
    } else if (eform === 'numofcrypto') {
      await updateAirtableCrypto({ asset, allocation, numberOfCrypto: value, paired }, accountId)
    } else {
      await updateAirtableCrypto({ asset, allocation: value, numberOfCrypto, paired }, accountId)
    }
    setEditFormID("")
    setReload((curr) => !curr)
  }

  const handleChange = (e) => {
    const { valueAsNumber, value } = e.target
    if (total) {
      setValue(valueAsNumber)
    } else {
      setValue(value)
    }
  }

  return (
    <>
      <form className="networth-form" onSubmit={handleSubmit}>
        <span className="networth-form-close" onClick={() => setEditFormID("")}>x</span>
        <input className="networth-input" onChange={(e) => handleChange(e)} type={total ? "number" : "text"} value={value} />
        <input className="networth-sbmt-btn" type="submit" />
      </form>
    </>
  )
}
