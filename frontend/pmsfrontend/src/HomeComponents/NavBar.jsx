


import { useNavigate } from 'react-router-dom';
import {
  Nav,
  Logo,
  NavActions,
  NavButton
} from './NavBar.styled';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Nav>
      <Logo onClick={() => navigate('/')}>
        PMS
      </Logo>

      <NavActions>
        <NavButton onClick={() => navigate('/login')}>
          Login
        </NavButton>
        <NavButton primary onClick={() => navigate('/register')}>
          Register
        </NavButton>
      </NavActions>
    </Nav>
  );
};

export default Navbar;
