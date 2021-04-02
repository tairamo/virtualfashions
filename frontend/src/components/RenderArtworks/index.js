import Card from "../Card";
import { Container } from "./styles";

export const RenderArtworks = () => {
  return (
    <Container>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <Card key={i} />
      ))}
    </Container>
  );
};

export default RenderArtworks;
