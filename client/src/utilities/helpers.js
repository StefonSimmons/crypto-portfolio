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


export function showAssetPrice(assets, symbol, paired, idx) {
  let price = 0
  const asset = assets.find(asset => asset.symbol === symbol)
  const usdPrice = asset && asset.quote.USD.price
  price = usdPrice
  if (paired === "BTC") {
    const btc = assets.find(asset => asset.symbol === 'BTC')
    const btcPrice = btc && btc.quote.USD.price
    price = usdPrice / btcPrice
  }

  return asset && <h5 className={`row-${idx} col-4`}>{price.toFixed(2)}</h5>
}