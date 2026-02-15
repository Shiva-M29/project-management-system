import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const TopbarWrapper = styled.div`
  height: 64px;
 
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #ffffff, #f8fafc);
border-bottom: 1px solid #e2e8f0;
box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
  padding: 0 24px;
  
`;

export const Left = styled.div`
  min-width: 120px;
`;

export const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const NavItem = styled(NavLink)`
  text-decoration: none;
  color: #194076;
  font-weight: 600;
  padding: 8px 20px;
  border-radius: 999px;
  letter-spacing: 0.3px;
  transition: all 0.25s ease;

  background: #ebeeef;

  &:hover {
    background: #e2e8f0;
    color: #1e293b;
    transform: translateY(-1px);
  }

  &.active {
    background: linear-gradient(135deg, #2563eb, #1e3a8a);
    color: white;
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
  }
`;

export const UserBox = styled.div`
  background: #f1f5f9;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 500;
 color: #194076;
`;
export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid #ff4d4f;
  color: #ff4d4f;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #ff4d4f;
    color: white;
  }
`;
