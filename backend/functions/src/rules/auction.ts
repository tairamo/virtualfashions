export default () => {
  return {
    tokenId: 'required',
    minimumBid: 'required|numeric',
    biddingEndDate: 'required',
    'chainInfo.id': 'required',
    'chainInfo.txId': 'required'
  }
}
