import banner from './Assests/banner.jpg';
import { StyledContainer } from '../utils/StyledComponents';

const Header = () => {
  return (
    <>
      <StyledContainer id="header" className='header'>
        <img src={banner} alt="Banner" />
      </StyledContainer>
    </>
  );
};

export default Header;