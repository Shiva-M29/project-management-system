import styled from "styled-components";
import { Card, Button } from "antd";

export const ProfileWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 24px;
  background: #f5f7fa;
`;

export const ProfileCard = styled(Card)`
  width: 100%;
  max-width: 720px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const UserInfo = styled.div`
  flex: 1;

  h2 {
    margin: 0;
  }

  span {
    color: #666;
  }
`;

export const Section = styled.div`
  margin-top: 32px;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const Label = styled.span`
  font-weight: 500;
  color: #555;
`;

export const Value = styled.span`
  color: #111;
`;

export const EditButton = styled(Button)`
  padding: 0;
`;
