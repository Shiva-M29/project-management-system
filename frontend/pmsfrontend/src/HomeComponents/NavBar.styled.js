



import styled from 'styled-components';

export const Nav = styled.nav`
  height: 64px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border-bottom: 1px solid #eaeaea;
`;

export const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  color: #1677ff;
`;

export const NavActions = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const NavButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 6px;
  border: 1px solid #1677ff;
  background: ${({ primary }) => (primary ? '#1677ff' : 'transparent')};
  color: ${({ primary }) => (primary ? '#fff' : '#1677ff')};
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.75rem;
    font-size: 0.8rem;
  }
`;
