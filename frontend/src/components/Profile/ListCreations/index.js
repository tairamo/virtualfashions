import React from "react";
import styled from "styled-components";
import { object, string } from "prop-types";

import ErrorBoundary from "../../ErrorBoundaries";
import Card from "../../Card";
import { Loading } from "../../common";

const Container = styled.div`
  min-width: 0;
  max-width: 100%;
  display: grid;
  grid-gap: 14px;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: 40em) {
    grid-gap: 16px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 52em) {
    grid-gap: 32px;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 72em) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

class ListCreations extends React.Component {
  static propTyps = {
    seaport: object.isRequired,
    accountAddress: string,
  };

  state = {
    order: undefined,
    orders: null,
    total: 0,
    accountAddress: "",
    page: 1,
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const { accountAddress, seaport } = window;
    const { orders, count } = await seaport.api.getOrders(
      { maker: "0x484eC62385e780f2460fEaC34864A77bA5A18134" },
      this.state.page
    );

    this.setState({ orders, total: count });
  }

  paginateTo(page) {
    this.setState({ orders: undefined, page }, () => this.fetchData());
  }

  render() {
    const { orders } = this.state;
    return (
      <ErrorBoundary>
        {!!orders ? (
          <Container>
            {orders.map((order, i) => (
              <Card key={i} {...this.props} order={order} />
            ))}
          </Container>
        ) : (
          <div
            style={{
              height: "100%",
              margin: "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Loading />
          </div>
        )}
      </ErrorBoundary>
    );
  }
}

export default ListCreations;
