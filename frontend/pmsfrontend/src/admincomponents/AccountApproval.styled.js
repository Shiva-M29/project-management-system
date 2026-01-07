import styled from "styled-components";
import { Card, Button } from "antd";

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 24px;
  background: #f5f7fa;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;


export const ApprovalCard = styled(Card)`
  width: 100%;
  margin: auto;
  border-radius: 12px;

  .ant-card-head {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  .ant-card-head-title {
    font-size: 20px;
    font-weight: 600;
    white-space: normal;   /* IMPORTANT */
    overflow: visible;     /* IMPORTANT */
  }
`;


export const UserRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  padding: 14px 18px;
  border-radius: 10px;
  margin-bottom: 12px;
  border: 1px solid #eaeaea;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  span:first-child {
    font-weight: 600;
  }

  span:last-child {
    font-size: 13px;
    color: #666;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

export const ApproveButton = styled(Button)`
  background: #52c41a;
  color: white;
  border: none;

  &:hover {
    background: #389e0d !important;
    color: white !important;
  }
`;

export const RejectButton = styled(Button)`
  background: #ff4d4f;
  color: white;
  border: none;

  &:hover {
    background: #d9363e !important;
    color: white !important;
  }
`;

export const LoadingWrapper = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const LoadingText = styled.span`
  margin-left: 12px;
  font-size: 16px;
  color: #555;
`;


export const ErrorWrapper = styled.div`
  max-width: 600px;
  margin: 40px auto;
`;

export const ViewButton = styled(ApproveButton)``;

export const DeleteButton = styled(RejectButton)``;