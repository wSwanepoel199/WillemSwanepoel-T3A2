import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { useGlobalState } from "../utils/componentIndex";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { store, dispatch } = useGlobalState();
  const navigate = useNavigate();

  const handleSelect = (e) => {
    navigate(e);
  };

  const handleSignOut = () => {
    dispatch({
      type: "signOutUser"
    });
  };

  const NavBody = () => {
    return (
      <>
        <Nav
          className="justify-content-start flex-grow-1 pe-3"
        >
          <Nav.Link className="nav-link" eventKey="/">Home</Nav.Link>
          <NavDropdown
            title="Dogs"
            id={`offcanvasNavbarDropdown-expand-md`}>
            <NavDropdown.Item eventKey="/dogs/display/all" id="all-dogs">All Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="/dogs/display/males" id="male-dogs">Male Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="/dogs/display/females" id="female-dogs">Female Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="/dogs/display/retired" id="retired-dogs">Retired Dogs</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Litters"
            id={`offcanvasNavbarDropdown-expand-md`}>
            <NavDropdown.Item eventKey="/litters/apply" id="litter-application">Litter Application</NavDropdown.Item>
            <NavDropdown.Item eventKey="litter-showcase">Litter Showcase</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link className="nav-link" eventKey="/shows">Shows</Nav.Link>
          <NavDropdown
            title="Our Company"
            id={`offcanvasNavbarDropdown-expand-md`}>
            <NavDropdown.Item eventKey="/about">About Us</NavDropdown.Item>
          </NavDropdown>
          {store.loggedInUser.admin ?
            <>
              <NavDropdown
                title="Admin Panel"
                id={`offcanvasNavbarDropdown-expand-md`}>
                <NavDropdown.Item eventKey="/contacts" id="view-contacts">View Contact Requests</NavDropdown.Item>
                <NavDropdown.Item eventKey="/litters/manage" id="manage-litters">Manage Litters</NavDropdown.Item>
                <NavDropdown.Item eventKey="/dogs/manage" id="manage-dogs">Manage Dogs</NavDropdown.Item>
                <NavDropdown.Item eventKey="/litters/applications">Manage Litter Applications</NavDropdown.Item>
              </NavDropdown>
            </>
            :
            <>

            </>}
        </Nav>
        {
          store.loggedInUser.username ?
            <Nav fluid="true" className="justify-content-end align-items-end pe-3">
              <NavDropdown
                title={store.loggedInUser.username}
                id={`offcanvasNavbarDropdown-expand-md`}
                align={{ md: 'end' }}
                style={{ textAlign: 'right' }}
              >
                <NavDropdown.Item eventKey={`/users/${store.loggedInUser.id}`} id="view-contacts">Profile</NavDropdown.Item>
                <NavDropdown.Item eventKey="/" onClick={handleSignOut} id="sign-out">Sign Out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            :
            <Nav>
              <Nav.Link className="nav-link" eventKey="/signIn">Sign In</Nav.Link>
            </Nav>
        }
      </>
    );
  };

  return (
    <>
      <Navbar key='md' bg="light" expand='md' className="mb=3" onSelect={handleSelect} collapseOnSelect>
        <Container fluid>
          <Nav.Link className="navbar-brand" eventKey="/">Myshalair</Nav.Link>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Collapse
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbar-expand-md`}
          >
            <NavBody />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;