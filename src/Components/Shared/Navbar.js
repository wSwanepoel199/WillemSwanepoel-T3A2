import { Button, Navbar, NavDropdown, Container, Form, Offcanvas, Nav } from "react-bootstrap";
import { StyledNav } from "../utils/StyledComponents";

const NavBar = () => {

  const checkEvent = (e) => {
    console.log(e.target);
    const changeColor = () => {

    };
  };

  return (
    // <Navbar collapseOnSelect>
    //   <Container fluid onMouseOver={(e) => checkEvent(e)}>
    //     <StyledNav
    //       defaultActiveKey="/home">
    //       <StyledNav.Item>
    //         <StyledNav.Link href="/">Home</StyledNav.Link>
    //       </StyledNav.Item>
    //       <NavDropdown title="Dogs" id="dogs-dropdown">
    //         <NavDropdown.Item eventKey="all-dogs" href="/dogs">All Dogs</NavDropdown.Item>
    //         <NavDropdown.Item eventKey="male-dogs">Male Dogs</NavDropdown.Item>
    //         <NavDropdown.Item eventKey="female-dogs">Female Dogs</NavDropdown.Item>
    //         <NavDropdown.Item eventKey="retired-dogs">Retired Dogs</NavDropdown.Item>
    //       </NavDropdown>
    //       <NavDropdown title="Litters" id="litter-dropdown" onClick={(e) => checkEvent(e)}>
    //         <NavDropdown.Item eventKey="apply-for-litter" href="/litterApplication">Apply for Adoption</NavDropdown.Item>
    //         <NavDropdown.Item eventKey="litter-schedule">Litter Schedule</NavDropdown.Item>
    //         <NavDropdown.Item eventKey="litter-showcase">Litter Showcase</NavDropdown.Item>
    //       </NavDropdown>
    //       <StyledNav.Link href="/shows">Shows</StyledNav.Link>
    //       <NavDropdown title="Our Company" id="company-dropdown" onClick={(e) => checkEvent(e)}>
    //         <NavDropdown.Item eventKey="about-us" href="/about">About Us</NavDropdown.Item>
    //         <NavDropdown.Item eventKey="litter-schedule">Legalities (Temp)</NavDropdown.Item>
    //         <NavDropdown.Item eventKey="contactForm" href="/contactForm">Contact Us</NavDropdown.Item>
    //       </NavDropdown>
    //     </StyledNav>
    //   </Container>
    // </Navbar>
    <>
      {['md',].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb=3">
          <Container fluid>
            <Navbar.Brand href="#">Myshalair</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbar-expand-${expand}`}
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <NavDropdown
                    title="Dogs"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item eventKey="all-dogs" href="/dogs">All Dogs</NavDropdown.Item>
                    <NavDropdown.Item eventKey="male-dogs">Male Dogs</NavDropdown.Item>
                    <NavDropdown.Item eventKey="female-dogs">Female Dogs</NavDropdown.Item>
                    <NavDropdown.Item eventKey="retired-dogs">Retired Dogs</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Litters"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}>
                    <NavDropdown.Item eventKey="apply-for-litter" href="/litterApplication">Apply for Adoption</NavDropdown.Item>
                    <NavDropdown.Item eventKey="litter-schedule">Litter Schedule</NavDropdown.Item>
                    <NavDropdown.Item eventKey="litter-showcase">Litter Showcase</NavDropdown.Item>
                  </NavDropdown>
                  <StyledNav.Link href="/shows">Shows</StyledNav.Link>
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
      ))}
    </>
  );
};

export default NavBar;