export default () => {
  return {
    auctionId: 'required',
    bidETH: 'required|numeric',
    bidUSD: 'required|numeric',
    'chainInfo.id': 'required',
    'chainInfo.txId': 'required'
  }
}
