import styled from "styled-components";
import { Card } from "antd";

export const CreateTicketWrapper = styled.div`
  padding: 16px;

  @media (min-width: 768px) {
    padding: 24px;
  }
`;

export const TicketCard = styled(Card)`
  max-width: 600px;
  margin: auto;
`;
