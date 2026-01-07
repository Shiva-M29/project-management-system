import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const TopbarWrapper = styled.div`
  height: 64px;
  background: white;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
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
  color: #334155;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 999px;
  transition: all 0.25s ease;

  &:hover {
    background: #e0e7ff;
    color: #1d4ed8;
  }

  &.active {
    background: #2563eb;
    color: white;
    box-shadow: 0 4px 10px rgba(37,99,235,0.25);
  }
`;

export const UserBox = styled.div`
  background: #f1f5f9;
  padding: 8px 14px;
  border-radius: 999px;
  font-weight: 500;
  color: #0f172a;
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
