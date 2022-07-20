import { Navbar, NavDropdown, Container } from "react-bootstrap";
import { StyledNav } from "../utils/StyledComponents";

const NavBar = () => {

  const checkEvent = (e) => {
    console.log(e.target);
    const changeColor = () => {

    };
  };

  return (
    <Navbar collapseOnSelect>
      <Container fluid onMouseOver={(e) => checkEvent(e)}>
        <StyledNav
          defaultActiveKey="/home">
          <StyledNav.Item>
            <StyledNav.Link href="/">Home</StyledNav.Link>
          </StyledNav.Item>
          <NavDropdown title="Dogs" id="dogs-dropdown">
            <NavDropdown.Item eventKey="all-dogs" href="/dogs">All Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="male-dogs">Male Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="female-dogs">Female Dogs</NavDropdown.Item>
            <NavDropdown.Item eventKey="retired-dogs">Retired Dogs</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Litters" id="litter-dropdown" onClick={(e) => checkEvent(e)}>
            <NavDropdown.Item eventKey="apply-for-litter" href="/litterApplication">Apply for Adoption</NavDropdown.Item>
            <NavDropdown.Item eventKey="litter-schedule">Litter Schedule</NavDropdown.Item>
            <NavDropdown.Item eventKey="litter-showcase">Litter Showcase</NavDropdown.Item>
          </NavDropdown>
          <StyledNav.Link href="/shows">Shows</StyledNav.Link>
          <NavDropdown title="Our Company" id="company-dropdown" onClick={(e) => checkEvent(e)}>
            <NavDropdown.Item eventKey="about-us" href="/about">About Us</NavDropdown.Item>
            <NavDropdown.Item eventKey="litter-schedule">Legalities (Temp)</NavDropdown.Item>
            <NavDropdown.Item eventKey="contactForm" href="/contactForm">Contact Us</NavDropdown.Item>
          </NavDropdown>
        </StyledNav>
      </Container>
    </Navbar>
  );
};

export default NavBar;