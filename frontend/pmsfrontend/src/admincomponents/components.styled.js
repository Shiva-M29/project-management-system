import styled from "styled-components";
import { NavLink } from "react-router-dom";

/* Layout */
export const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
  background: #f5f7fb;
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

/* Sidebar */
export const SidebarWrapper = styled.div`
  width: 240px;
  background: #0f172a;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled.h2`
  margin-bottom: 40px;
  text-align: center;
`;

export const NavItem = styled(NavLink)`
  color: #cbd5e1;
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  text-decoration: none;
  transition: 0.3s;

  &.active {
    background: #1e293b;
    color: white;
  }

  &:hover {
    background: #1e293b;
    color: white;
  }
`;

/* Topbar */
export const TopbarWrapper = styled.div`
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
`;

export const Title = styled.h3`
  margin: 0;
`;

export const UserBox = styled.div`
  background: #e2e8f0;
  padding: 8px 14px;
  border-radius: 20px;
`;
