import React, { useState } from "react";

const NavBar = () => {
  const [activeHam, setActiveHam] = useState(false);
  const menuItems = (
    <>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </>
  );
  return (
    <div className="navbar-container">
      <nav>
        <div className="nav-container">
          <h1 className="nav-brand">Secrefiy</h1>
          <div className="menu">{menuItems}</div>
          <button
            className={activeHam ? "hamburger active-hamburger" : "hamburger"}
            onClick={() => setActiveHam(!activeHam)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      {activeHam && <div className="nav-dropdown">{menuItems}</div>}
    </div>
  );
};

export default NavBar;
