import styled from "styled-components";

export const ViewTicketsWrapper = styled.div`
  padding: 16px;
  width: 100%;

  /* Desktop */
  @media (min-width: 992px) {
    padding: 24px;
  }

  /* Table tweaks */
  .ant-table {
    background: #ffffff;
    border-radius: 8px;
  }

  /* Mobile spacing */
  @media (max-width: 576px) {
    .ant-table {
      font-size: 12px;
    }
  }
`;
