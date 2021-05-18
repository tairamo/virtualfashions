import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 100%;
  padding: 2px;
  flex: 1 1 auto;
  display: flex;

  @media (min-width: 992px){
    max-width: 900px;
  }
  
  @media (max-width: 780px) {
    max-width: 100%;
    width: 100%;
    padding: 0 10px;
    background-color: var(--bg-header);
    display: flex;
    align-items: center;

    & > form {
      .search_icon-form {
        cursor: pointer;
      }
    }
  }
`;

export const FormSearch = styled.div`
  color: #000;
  font-size: 16px !important;
  width: 100%;
  position: relative;
`;

export default Container;
