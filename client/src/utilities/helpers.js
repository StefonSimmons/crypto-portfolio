export function getUniqueSymbols(records) {
  const symbols = []
  records.forEach(crypto => {
    if (!symbols.includes(crypto.fields.asset)) {
      symbols.push(crypto.fields.asset)
    }
  })
  return symbols
}

export function sumTotals(accounts) {
  const sum = accounts.reduce((acc, curr) => {
    const currTotal = curr.fields && curr.fields.total
    return acc + currTotal
  }, 0)
  return sum
}


export function showAssetPrice(assets, symbol) {
  const asset = assets.find(asset => asset.symbol === symbol)
  return asset && <h5>{asset.quote.USD.price}</h5>
}