


import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';
import { LayoutWrapper, ContentWrapper } from './PublicLayout.styled';

const PublicLayout = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default PublicLayout;


