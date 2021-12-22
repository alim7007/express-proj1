import React from 'react'

const Navbar = ({ privateData }) => {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Project1
          </a>
          <div className="navbar-nav">
            <a className="nav-link" href="/">
              Home
            </a>
            <a className="nav-link" href="/">
              secondPage
            </a>
            <a className="nav-link" href="/">
              thirdPage
            </a>
          </div>
          <div className="navbar-nav ml-auto">
            {!privateData ? (
              <>
                <a className="nav-link" href="/login">
                  Login
                </a>
                <a className="nav-link" href="/register">
                  Register
                </a>
              </>
            ) : (
              <a
                className="nav-link"
                href="/"
                onClick={() => {
                  localStorage.removeItem("authToken");
                }}
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar
