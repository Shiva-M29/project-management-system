import styled from "styled-components";
import { Card } from "antd";

export const ViewTicketWrapper = styled.div`
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const TicketCard = styled(Card)`
  max-width: 900px;
  margin: auto;
`;

export const Field = styled.div`
  margin-bottom: 12px;

  span {
    font-weight: 600;
  }
`;
