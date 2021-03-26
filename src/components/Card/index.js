import { CardContainer, CardImage, CardHeader } from "./styles";

export const Card = () => (
  <CardContainer>
    <CardImage></CardImage>
    <CardHeader>
      <div className="card-title">STAND ALONE</div>
      <div className="card-info">
        <div></div> <span>@tairamu</span>
      </div>
    </CardHeader>
  </CardContainer>
);

export default Card;
