import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-wrapper">
          <img className="header-logo" src="/car_showroom_logo.jpg" alt="logo" />
          <h1 className="header-title">CAR SHOWROOM</h1>
        </Link>
      </div>

    </header>
  )
}