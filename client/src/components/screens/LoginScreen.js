import { useState, useEffect } from "react";
import axios from "axios";
import "./LoginScreen.css";
import Navbar from '../Navbar'
import Footer from '../Footer'
import { GoogleLogin } from "react-google-login"
import {useHistory} from 'react-router-dom'

const LoginScreen = (props) => {
  const history = useHistory()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

const responseGoogle = async (response) => {
  try {
    console.log(response);
    console.log(response.access_token);
    const { data } = await axios.post(
      "/google_login",
      { token: response.tokenId },
      config
    );
    localStorage.setItem("authToken", data.jwtHeaderToken);
    history.push("/");
    window.location.reload();
  } catch (error) {
    setError(error.response.data.error);
    setTimeout(() => {
      setError("");
    }, 3000);
  }
};

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", { email, password }, config);
      localStorage.setItem("authToken", data.jwtHeaderToken);
      history.push("/");
      window.location.reload()
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <>
      <div className="d-flex flex-column vh-100">
        <Navbar privateData={props.privateData} />
        <main className="container mt-5">
          <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Login</h5>
                    <form onSubmit={loginHandler} className="validated-form">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="off"
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          className="form-control"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type="password"
                          id="password"
                          name="password"
                          required
                          autoComplete="off"
                        />
                        <a href="/forgot_password">Forgot Password</a>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Login
                      </button>
                      <div className="googleBtn">
                        <GoogleLogin
                          clientId="120190989342-rjkgo5ruoiggecgp3td3g5q6vqa6mqc2.apps.googleusercontent.com"
                          buttonText="Sign in with Google"
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div>
                      {error && <span className="error-message">{error}</span>}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LoginScreen;
