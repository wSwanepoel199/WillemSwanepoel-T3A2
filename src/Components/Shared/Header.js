import banner from './Assests/banner.jpg';
import { HeaderContainer, HeaderImage } from '../utils/StyledComponents';

const Header = () => {
  return (
    <>
      <HeaderContainer id="header" className='header'>
        <HeaderImage src={banner} alt="Banner" />
      </HeaderContainer>
    </>
  );
};

export default Header;