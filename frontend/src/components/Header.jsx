import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaTachometerAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="header-modern">
      <Navbar expand='lg' variant="dark">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Library Management System</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' style={{ border: 'none' }} />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                // --- USER IS LOGGED IN ---
                <NavDropdown 
                  title={userInfo.name} 
                  id='username' 
                  menuVariant='dark' 
                  className="dropdown-menu-modern"
                  align="end" // This ensures the dropdown aligns to the right edge
                >
                  {(userInfo.role === 'Admin' || userInfo.role === 'SuperAdmin') ? (
                    // --- ADMIN/SUPERADMIN DROPDOWN ---
                    <>
                      <LinkContainer to='/admin/dashboard'>
                        <NavDropdown.Item><FaTachometerAlt /> Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/userlist'>
                        <NavDropdown.Item>Manage Users</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to='/admin/booklist'>
                        <NavDropdown.Item>Manage Books</NavDropdown.Item>
                      </LinkContainer>
                       <LinkContainer to='/admin/loanlist'>
                        <NavDropdown.Item>Manage Loans</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    // --- MEMBER DROPDOWN ---
                    <LinkContainer to='/dashboard'>
                        <NavDropdown.Item><FaTachometerAlt /> My Dashboard</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Divider />
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                // --- USER IS LOGGED OUT ---
                <>
                  <LinkContainer to='/'>
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;