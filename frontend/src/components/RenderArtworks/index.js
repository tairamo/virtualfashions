import React from "react";
import { object, string } from "prop-types";

import Card from "../Card";
import { Container } from "./styles";

export class RenderArtworks extends React.Component {
  static propTyps = {
    seaport: object.isRequired,
    accountAddress: string,
  };

  state = {
    order: undefined,
    orders: [],
    total: 0,
    accountAddress: "",
    page: 1,
  };

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    // const { accountAddress, seaport } = this.props;
    const { accountAddress, seaport } = window;
    console.log("Sea port HOME:", seaport);
    const { orders, count } = await seaport.api.getOrders({}, this.state.page);

    this.setState({ orders, total: count });
  }

  paginateTo(page) {
    this.setState({ orders: undefined, page }, () => this.fetchData());
  }

  render() {
    const { orders } = this.state;
    return (
      <Container>
        {orders != null ? (
          orders.map((order, i) => (
            <Card key={i} {...this.props} order={order} />
          ))
        ) : (
          <div style={{ margin: "auto" }}>Loading...</div>
        )}
      </Container>
    );
  }
}

export default RenderArtworks;
