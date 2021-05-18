import styled from "styled-components"


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    color: #000000;
    flex: 1 1 0%;  
    overflow: hidden;
    box-shadow: 0px 10px 20px rgb(0 0 0 / 5%);
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    text-decoration: none;
    color: inherit;
    will-change: transform;
    position: relative;
    background-color: #fff;

    @media (hover: hover) {
        :hover {
        transform: translateY(-4px);
        box-shadow: 0px 10px 20px rgb(0 0 0 / 10%);
        }
    }

    & > a:first-of-type {
        display: block;
        text-decoration: none;
        color: inherit;
    }
`;

export const HeaderPicture = styled.div`
  position: relative;

   & > :first-of-type{
        position: relative;
        overflow:  hidden;

        & > :first-child{
            width: 100%;
            height: 0;
            padding-bottom: 57.142857142857146%;
        }

        & > :last-child{
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: #F2F2F2;
            display: flex;

            img {
                height: 100%;
                margin: auto;
            }
        }
   }
`;

export const AvatarLoc = styled.div`
    box-sizing: border-box;
    margin: 0;
    min-width: 0;
    margin-left: 24px;
    margin-right: 24px;
    position: relative;
`;

export const Body = styled.div`
    padding-left: 24px;
    padding-right: 24px;
    padding-top: 64px;
    padding-bottom: 48px;
`;

export const UserInfo = styled.div`
    display: grid;
    grid-gap: 5px;
    margin-bottom: 16px;
   padding: 5px 15px 15px 20px;

  & > :first-child{
    letter-spacing: -0.03em;
    font-size: 32px;
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-weight: 600;
    color: #000000;
  }

  & > :last-child{
    display: flex;

    & > div{
    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    font-size: 24px;
    font-weight: 600;

    font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.01em;
    line-height: 1.2;
    font-size: 22px;
    margin: 0px;
    background: linear-gradient(110.78deg, rgb(118, 230, 80) -1.13%, rgb(249, 214, 73) 15.22%, rgb(240, 142, 53) 32.09%, rgb(236, 81, 87) 48.96%, rgb(255, 24, 189) 67.94%, rgb(26, 75, 255) 85.34%, rgb(98, 216, 249) 99.57%) text;
    }
  }
`

export const Content = styled.div`
    display: grid;
    gap: 20px;
    padding: 5px 15px 15px 20px;

    & > div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    .creator__flw{
        display: grid;
        gap: 5px;
        font-size: 14px;

        &>:first-child {
            font-weight: 600;
        }
    }
`;
