import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";
import Search from "../Search";
import Creator from "../Creator";
import ErrorBoundary from "../ErrorBoundaries";

const Container = styled.div`
  padding: 0 100px 100px;
  background-color: #fff;
`;

const List = styled.div`
  display: grid;
  grid-gap: 16px;
  margin: 50px 0 0;
  grid-template-columns: repeat(1, 1fr);

  @media screen and (min-width: 40em) {
    grid-gap: 24px;
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

const ListCreators = () => {
  // data come from NodeJs Backend (need to deploy)
  return (
    <>
      <ErrorBoundary>
        <Container>
          <Header white />
          <div style={{ margin: "100px 0 0" }}>
            <Search style={{ margin: "auto" }} />
            <List>
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Creator key={i} />
              ))}
            </List>
          </div>
        </Container>
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default ListCreators;
