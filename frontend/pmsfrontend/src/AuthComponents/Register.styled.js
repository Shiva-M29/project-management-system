import styled from 'styled-components';
import  {Card} from 'antd';
export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f7fa;
`;

export const RegisterCard = styled(Card)`
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 24px;
`;

export const SubmitButton = styled.div`
  margin-top: 16px`;
