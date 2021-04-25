import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { toUnitAmount } from "../../utils/constants"


export default class SalePrice extends React.Component {
    static propTypes = {
      order: PropTypes.object.isRequired
    }
  
    render() {
      const { order } = this.props
      const { currentPrice, paymentTokenContract } = order
      const price = toUnitAmount(currentPrice, paymentTokenContract)
      const priceLabel = parseFloat(price).toLocaleString(undefined, { minimumSignificantDigits: 1 })
  
      return (
        <SpanSalePrice>
          {priceLabel} {paymentTokenContract.symbol}
        </SpanSalePrice>
      )
    }
  }
  
  const SpanSalePrice = styled.span`
    img {
      height: 15px !important;
    }
  `