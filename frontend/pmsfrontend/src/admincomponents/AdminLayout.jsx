
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


