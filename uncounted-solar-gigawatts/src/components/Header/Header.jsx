import "./Header.css";

function Header() {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo">
          <img className="logo-image" src="/HX-Logo.png" alt="HX"></img>
        </div>

        <div className="header-title">
          <h1>Uncounted Solar Gigawatts</h1>
          <span>Web GIS Demo</span>
        </div>
      </div>
    </header>
  );
}

export default Header;