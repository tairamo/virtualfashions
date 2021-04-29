import styled from "styled-components"


export const Container = styled.div`
    width: 100%;
    max-width: 1600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;

    & > :first-child{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 3;
        background-color: rgba(255, 255, 255, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        & > div{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            & > div {
                display: grid;
                grid-gap: 48px;
            }
        }
    }
`;

export const Body = styled.div`
    display: grid;
    gap: 24px;
    max-width: 720px;
    justify-content: center;

    &> h2{
        font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 46px;
        line-height: 1;
        letter-spacing: -0.02em;
        font-weight: 600;
        text-align: center;

        @media screen and (min-width: 52em){
            font-size: 56px;
        }
    }
`;

export const BodyLast = styled.div`
    display: grid;
    margin: 0 auto;
    flex-direction: column;
    max-width: 32em;
    justify-content: center;
    gap: 32px;
`;

export const BodyText = styled.div`
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: 1.6;
    text-align: center;
`;

export const BodyButton = styled.div`
    display: grid;
    gap: 32px;
    align-items: center;
    justify-content: center;

    @media screen and (min-width: 40em){
        gap: 48px;
    }
    @media screen and (min-width: 52em){
        gap: 48px;
    }
    @media screen and (min-width: 64em){
        gap: 64px;
    }

    &>button {
        appearance: none;
        line-height: inherit;
        text-decoration: none;
        font-size: inherit;
        will-change: transform;
        font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-weight: 600;
        padding: 16px 32px;
        border-radius: 15px;
        transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
        cursor: pointer;
        outline: none;
        background-color: #000000;
        color: #FFFFFF;
        border: 2px solid #1A1A1A
        border-image: initial;
        min-height: 60px;
        display: flex;
        align-items: center;
        min-width: 260px;
        text-align: center;
        justify-content: center;
    }
`;

export const Footer = styled.div`
    display: grid;
    gap: 16px;
    text-align: center;

    & > :last-child{
        font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 36px;
        line-height: 1.15;
        letter-spacing: -0.02em;
        font-weight: 600;

        @media screen and (min-width: 52em){
            font-size: 46px;
        }
    }
`