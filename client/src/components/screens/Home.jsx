import React from 'react'
import './Home.css'

const Home = ({error, privateData}) => {

    return (
      <>
        <div id="body" className="d-flex text-center text-white bg-dark">
          <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
            <header className="mb-auto">
              <div>
                <h3 className="float-md-left mb-0">Project1</h3>
                <nav className="nav nav-masthead justify-content-center float-md-right">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                  <a className="nav-link" href="/protected">
                    Projects
                  </a>
                  {privateData ? (
                    <a
                      className="nav-link"
                      href="/"
                      onClick={() => {
                        localStorage.removeItem("authToken");
                      }}
                    >
                      Logout
                    </a>
                  ) : (
                    <>
                      <a className="nav-link" href="/login">
                        Login
                      </a>
                      <a className="nav-link" href="/register">
                        Register
                      </a>
                    </>
                  )}
                </nav>
              </div>
            </header>
            <main className="px-3">
              <h1>Project1</h1>
              <p className="lead">
                {" "}
                Welcome to Project1! Lorem ipsum dolor sit amet. Lorem ipsum
                dolor sit amet consectetur adipisicing elit.
              </p>
              <a
                href="/"
                className="btn btn-lg btn-secondary font-weight-bold border-white bg-white"
              >
                View Projects
              </a>
            </main>
            <footer className="mt-auto text-white-50">
              <p>&copy; 2021 </p>
            </footer>
          </div>
        </div>
      </>
    );
}

export default Home
