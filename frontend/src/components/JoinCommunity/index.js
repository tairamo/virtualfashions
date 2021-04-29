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
                            <h2>Join the Community Upvote to access creator tools.</h2>
                            <BodyLast>
                                <BodyText>
                                With the Community Upvote, artists are encouraged to support other artists and to set the stage for a model of community-led curation that puts power in the hands of creators.
                                </BodyText>
                                <BodyText>
                                In the new creative economy, we all rise up together.
                                </BodyText>
                                <BodyButton><button>Join Community Upvote</button></BodyButton>
                            </BodyLast>
                        </Body>
                        <Footer>
                            <BodyText>Current number of profiles on the Community Upvote:</BodyText>
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