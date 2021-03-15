export function getUniqueSymbols(records) {
  const symbols = []
  records.forEach(crypto => {
    if (!symbols.includes(crypto.fields.asset)) {
      symbols.push(crypto.fields.asset)
    }
  })
  return symbols
}