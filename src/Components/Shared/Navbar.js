import { Navbar, NavDropdown, Container, Offcanvas, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb=3">
          {console.log(expand)}
          <Container fluid>
            <Navbar.Brand>Myshalair</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbar-expand-${expand}`}
              placement="start">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Myshalair
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <NavDropdown
                    title="Dogs"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item eventKey="all-dogs" href="/dogs/all" id="all-dogs">All Dogs</NavDropdown.Item>
                    <NavDropdown.Item eventKey="male-dogs" href="/dogs/males" id="male-dogs">Male Dogs</NavDropdown.Item>
                    <NavDropdown.Item eventKey="female-dogs" href="/dogs/females" id="female-dogs">Female Dogs</NavDropdown.Item>
                    <NavDropdown.Item eventKey="retired-dogs">Retired Dogs</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Litters"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item eventKey="apply-for-litter" href="/litterApplication">Apply for Adoption</NavDropdown.Item>
                    <NavDropdown.Item eventKey="litter-schedule">Litter Schedule</NavDropdown.Item>
                    <NavDropdown.Item eventKey="litter-showcase">Litter Showcase</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/shows">Shows</Nav.Link>
                  <NavDropdown
                    title="Our Company"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item eventKey="about-us" href="/about">About Us</NavDropdown.Item>
                    <NavDropdown.Item eventKey="litter-schedule">Legalities (Temp)</NavDropdown.Item>
                    <NavDropdown.Item eventKey="contactForm" href="/contactForm">Contact Us</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))
      }
    </>
  );
};

export default NavBar;