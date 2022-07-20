import banner from './Assests/banner.jpg';
import { StyledContainer, StyledImage } from '../utils/StyledComponents';

const Header = () => {
  return (
    <>
      <StyledContainer id="header" className='header'>
        <StyledImage src={banner} alt="Banner" />
      </StyledContainer>
    </>
  );
};

export default Header;