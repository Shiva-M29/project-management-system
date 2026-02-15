
import styled from "styled-components";

export const TicketPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
`;

export const TicketCard = styled.div`
  width: 100%;
  max-width: 650px;
  padding: 40px;
  border-radius: 20px;
  background: white;
  box-shadow: 0 30px 70px rgba(0,0,0,0.15);
   .ant-form-item-label > label {
    color: #4f46e5;   /* Indigo */
    font-weight: 600;
    font-size: 14px;
  }
`;