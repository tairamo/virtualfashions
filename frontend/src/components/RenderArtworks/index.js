import React from "react";
import { object, string } from "prop-types";

import Loading, { ContainerLoading } from "../common/Loading"
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
    const { seaport } = window;
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
        {orders ? (
          orders.map((order, i) => (
            <Card key={i} {...this.props} order={order} />
          ))
        ) : (
        <ContainerLoading><Loading /></ContainerLoading>
        )}
      </Container>
    );
  }
}

export default RenderArtworks;
