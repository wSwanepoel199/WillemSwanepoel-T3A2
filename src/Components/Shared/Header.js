import banner from './Assests/banner.jpg';
import { HeaderContainer, HeaderImage } from './styles/Header.styled';

const Header = () => {
  return (
    <>
      <HeaderContainer id="header" className='header'>
        <HeaderImage src={banner} alt="Banner" data-testid="header-img" />
      </HeaderContainer>
    </>
  );
};

export default Header;