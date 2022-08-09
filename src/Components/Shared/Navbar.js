import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { SignOut, useGlobalState } from "../utils";
import { NavLink, useNavigate } from "react-router-dom";

const NavBar = () => {
  const { store, dispatch, init } = useGlobalState();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch({
      type: "clearState",
      data: init
    });
    sessionStorage.removeItem("user");
  };

  const handleSelect = (e) => {
    navigate(e);
  };

  const NavBody = () => {
    return (
      <>
        <Nav className="justify-content-start flex-grow-1 pe-3">
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavDropdown
            title="Dogs"
            id={`offcanvasNavbarDropdown-expand-md`}>
            <NavDropdown.Item eventKey="/dogs/all" id="all-dogs">All Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="/dogs/males" id="male-dogs">Male Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="/dogs/females" id="female-dogs">Female Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="/dogs/retired" id="retired-dogs">Retired Dogs</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Litters"
            id={`offcanvasNavbarDropdown-expand-md`}>
            <NavDropdown.Item eventKey="/litters/apply" id="litter-application">Apply for Adoption</NavDropdown.Item>
            <NavDropdown.Item eventKey="litter-schedule">Litter Schedule</NavDropdown.Item>
            <NavDropdown.Item eventKey="litter-showcase">Litter Showcase</NavDropdown.Item>
          </NavDropdown>
          <NavLink className="nav-link" to="/shows">Shows</NavLink>
          <NavDropdown
            title="Our Company"
            id={`offcanvasNavbarDropdown-expand-md`}>
            <NavDropdown.Item eventKey="/about">About Us</NavDropdown.Item>
            <NavDropdown.Item eventKey="litter-schedule">Legalities (Temp)</NavDropdown.Item>
            <NavDropdown.Item eventKey="/contacts/form">Contact Us</NavDropdown.Item>
          </NavDropdown>
          {store.loggedInUser.admin ?
            <>
              <NavDropdown
                title="Admin Panel"
                id={`offcanvasNavbarDropdown-expand-md`}>
                <NavDropdown.Item eventKey="/contacts" id="view-contacts">View Contact Requests</NavDropdown.Item>
                <NavDropdown.Item eventKey="/litters/manage" id="manage-litters">Manage Litters</NavDropdown.Item>
                <NavDropdown.Item eventKey="female-dogs" href="/dogs/females" id="female-dogs">Female Dogs</NavDropdown.Item>
                <NavDropdown.Item eventKey="retired-dogs">Retired Dogs</NavDropdown.Item>
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
              <NavLink className="nav-link" to="/signIn">Sign In</NavLink>
            </Nav>
        }
      </>
    );
  };

  return (
    <>
      <Navbar key='md' bg="light" expand='md' className="mb=3" onSelect={handleSelect}>
        <Container fluid>
          <NavLink className="navbar-brand" to="/">Myshalair</NavLink>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
          <Navbar.Collapse
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbar-expand-md`}>
            <NavBody />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;