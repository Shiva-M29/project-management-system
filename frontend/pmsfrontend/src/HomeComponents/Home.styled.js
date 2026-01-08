


import styled from 'styled-components';

export const HomeWrapper = styled.div`
  max-width: 720px;
  text-align: center;
  padding: 1rem;
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const Description = styled.p`
  font-size: 1.05rem;
  color: #555;
  margin-bottom: 1.5rem;
`;

export const Features = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
`;
