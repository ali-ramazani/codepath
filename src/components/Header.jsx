import header_logo from '../../public/header_logo.webp';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div>
      <img src="../public/logo.png" className="logo"/>
      </div>
      <div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Learn More About Berea</a></li>
        <li><a href="#">Fun Events in Berea</a></li>
      </ul>
      </div>
      {/* <img src={header_logo} alt="header logo" /> */}

    </header>
  )
}

export default Header;