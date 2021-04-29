import Header from "../Header"
import { Container, Body, BodyLast, BodyText, BodyButton, Footer } from "./styles"


const JoinCommunity = () => {

    return (
        <>
        <Header/>
        <Container>
            <div>
                <div>
                    <div>
                        <Body>
                            <h2>Junte-se à comunidade Upvote para acessar as ferramentas do criador.</h2>
                            <BodyLast>
                                <BodyText>
                                Com o Community Upvote, os artistas são incentivados a apoiar outros artistas e a preparar o terreno para um modelo de curadoria liderada pela comunidade que coloca o poder nas mãos dos criadores.
                                </BodyText>
                                <BodyText>
                                Na nova economia criativa, todos nós crescemos juntos.
                                </BodyText>
                                <BodyButton><button>Junte-se à comunidade Upvote</button></BodyButton>
                            </BodyLast>
                        </Body>
                        <Footer>
                            <BodyText>Número atual de perfis no Upvote da comunidade:</BodyText>
                            <div>12</div>
                        </Footer>
                    </div>
                </div>
            </div>
        </Container>
        </>
    )
}

export default JoinCommunity;