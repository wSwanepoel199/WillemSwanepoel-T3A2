import { Navbar, NavDropdown, Container } from "react-bootstrap";
import { StyledNav } from "../utils/StyledComponents";

const NavBar = () => {

  const checkEvent = (e) => {
    console.log(e.target);
  };
  return (
    <Navbar>
      <Container fluid>
        <StyledNav
          activeKey='/'>
          <StyledNav.Item>
            <StyledNav.Link href="/">Home</StyledNav.Link>
          </StyledNav.Item>
          <NavDropdown title="Dogs" id="dogs-dropdown" onClick={(e) => checkEvent(e)}>
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

    // <nav>
    //   <a href="/">Home</a>
    //   <a href="/dogs">Dogs</a>
    //   <a href="/">Litters</a>
    //   <a href="/">Shows</a>
    //   <a href="/">Our Company</a>
    //   <a href="/about">Temp About</a>
    // </nav>
  );
};

export default NavBar;