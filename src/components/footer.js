import { BsFacebook, BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="social-icon">
        <li className="social-icon__item">
          <a className="social-icon__link" href="/">
            <BsFacebook />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="/">
            <BsTwitter />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="/">
            <BsLinkedin />
          </a>
        </li>
        <li className="social-icon__item">
          <a className="social-icon__link" href="/">
            <BsInstagram />
          </a>
        </li>
      </ul>
      <ul className="menu">
        <li className="menu__item">
          <a className="menu__link" href="/">
            Home
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="/">
            About
          </a>
        </li>
        <li className="menu__item">
          <a className="menu__link" href="/">
            Contact
          </a>
        </li>
      </ul>
      <p>&copy;2023 Secrefiy | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
