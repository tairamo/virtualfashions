import styled from "styled-components";

import Avatar from "../Avatar";

const Container = styled.div`
  margin: 0px 0px 0px auto;
  display: flex;
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 10px 20px;
  align-items: center;
  border-radius: 999px;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1) 0s;
  cursor: pointer;
  will-change: transform;

  & > :first-child {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 6px 6px 6px 24px;
    border-radius: 999px;

    & > :first-child {
      margin: 0px 16px 0px 0px;
      display: flex;
      text-align: right;
      flex-direction: column;
      align-items: flex-end;

      .sw_eth {
        margin: 0px 0px 2px;
        font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
          "Segoe UI Symbol";
        font-size: 18px;
        font-weight: 600;
      }
      .acc_address {
        font-family: "Formular Mono", Consolas, "Andale Mono WT", "Andale Mono",
          "Lucida Console", "Lucida Sans Typewriter", "DejaVu Sans Mono",
          "Bitstream Vera Sans Mono", "Liberation Mono", "Nimbus Mono L", Monaco,
          "Courier New", Courier, monospace;
        font-weight: 400;
        font-size: 12px;
      }
    }
  }
`;

const Account = ({ address, no_eth }) => {
  const newAddress =
    address.slice(0, 6) +
    "..." +
    address.slice(address.length - 4, address.length);
  console.log("new Address:", newAddress);

  return (
    <Container>
      <div>
        <div>
          {!no_eth && <div className="sw_eth">0 ETH</div>}
          <div className="acc_address">{newAddress}</div>
        </div>
        <Avatar width={42} />
      </div>
    </Container>
  );
};

export default Account;
