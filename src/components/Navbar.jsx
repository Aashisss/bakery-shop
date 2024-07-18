import React from "react";
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ favoritesCount }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="#">
              <img src="https://marketplace.canva.com/EAFJvC7BTsM/1/0/1600w/canva-cream-beige-modern-cake-and-bakery-logo-K80d7s9NfIg.jpg" alt="Bakery Shop" style={{ height: '80px' }} /> {/* Increased height */}
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active me-2 fw-bold" aria-current="page" to={"/home"} 
                style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fw-bold" to={"/product"}
                style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                  Birthday Cake
                </Link>
              </li>              
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle fw-bold"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ fontFamily: 'Tisa Offc Serif Pro'}}
                >
                  Top Selling
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="#"
                    style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                      Chocolate Cake
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#"
                    style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                      Red Velvet Cake
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider"></hr>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#"
                    style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                      Carrot Cake
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="d-flex align-items-center">
            {/* Add to Cart Button */}
            <Link to="/cart" className="btn btn-outline-dark me-2">
              <FaShoppingCart />
            </Link>

            {/* Favorites Icon */}
            <Link to="/favorites" className="btn btn-outline-dark me-2">
              <FaHeart />
              <span className="badge bg-danger text-white ms-1">{favoritesCount}</span>
            </Link>
          
            {/* User Authentication Section */}
            {user ? (
              <div className="dropdown">
                <button className="btn btn-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Welcome, {user.firstName}!
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to={"/profile"}>Profile</Link></li>
                  <li><Link className="dropdown-item" to={"/changepassword"}>Change Password</Link></li>
                  <li><button onClick={handleLogout} className="dropdown-item" to="/logout">Log Out</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-outline-dark me-2" to={'/login'}>Login</Link>
                <Link className="btn btn-outline-dark" to={'/register'}>Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
