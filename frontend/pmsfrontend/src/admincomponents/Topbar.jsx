import {
  TopbarWrapper,
  Left,
  Center,
  NavItem,
  UserBox,Right,LogoutButton
} from "./topbarStyles";
import {useAuth} from "../AuthProvider";
import {toast} from "react-toastify";

const Topbar = () => {
    const {user,logout}=useAuth();
    const basePath = user.role === "ADMIN" ? "/admin" : "/employee";
     const handleLogout = () => {
    toast.success("Logged out successfully");

    setTimeout(() => {
      logout();
      queryClient.clear(); 
    }, 500);
  };

  return (
    <TopbarWrapper>
      <Left>
        <UserBox>{user.role==="ADMIN"?"Admin":"Employee"}</UserBox>
      </Left>

        <Center>
        <NavItem to={basePath} end>
          Tickets
        </NavItem>

        {user.role === "ADMIN" && (
          <>
            <NavItem to={`${basePath}/create-ticket`}>
              Create Ticket
            </NavItem>
            <NavItem to={`${basePath}/approvals`}>
              Approvals
            </NavItem>
            <NavItem to={`${basePath}/manageusers`}>
              Users
            </NavItem>
          </>
        )}

        {user.role === "EMPLOYEE" && (
          <NavItem to={`${basePath}/my-tickets`}>
            My Tickets
          </NavItem>
        )}

        <NavItem to={`${basePath}/profile`}>
          Profile
        </NavItem>
        <Right>
        <LogoutButton onClick={handleLogout}>
          Logout
        </LogoutButton>
      </Right>
      </Center>
    </TopbarWrapper>
  );
};

export default Topbar;
