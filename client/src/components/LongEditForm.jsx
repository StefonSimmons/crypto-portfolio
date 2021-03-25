import {useState} from 'react'
import { postAirtableCrypto } from '../services/airtableCrypto'

export default function LongEditForm({setReload, toggleNewForm}) {
  const [postData, setPostData] = useState({
    asset: '',
    allocation: '',
    numberOfCrypto: '',
    paired: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postAirtableCrypto(postData)
    toggleNewForm(false)
    setReload(curr => !curr)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPostData({
      ...postData,
      [name] : value
    })
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Asset" name="asset" value={postData.asset} onChange={handleChange}/>
      <input type="text" placeholder="Paired" name="paired"value={postData.paired} onChange={handleChange}/>
      <input type="text" placeholder="Allocated" name="allocation" value={postData.allocation} onChange={handleChange}/>
      <input type="text" placeholder="Number of Crypto" name="numberOfCrypto" value={postData.numberOfCrypto} onChange={handleChange} />
      <input type="submit" value="Send"/>
    </form>
  )
}
