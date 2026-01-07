// import { LayoutWrapper, ContentWrapper } from '../HomeComponents/PublicLayout.styled';
// import { Outlet } from 'react-router-dom';
// import Navbar from './AdminNav';
// import { useContext } from 'react';
// import { AuthContext } from '../AuthProvider';
// import { Navigate } from 'react-router-dom';

// function AdminLayout() {
//     const { user } = useContext(AuthContext);

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

// return (
//     <LayoutWrapper>
//       <Navbar />
//       <ContentWrapper>
//         <Outlet />
//       </ContentWrapper>
//     </LayoutWrapper>
//   );

// }
// export default AdminLayout;

import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import { LayoutWrapper, ContentWrapper } from "./styles";

const AdminLayout = () => {
  return (
    <LayoutWrapper>
      <Topbar />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </LayoutWrapper>
  );
};

export default AdminLayout;


