import { useState } from "react";
import axios from "axios";
import "./RegisterScreen.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { GoogleLogin } from "react-google-login"
import { useHistory } from "react-router-dom";


const RegisterScreen = ({ privateData }) => {
  const history = useHistory()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailSend, setEmailSend] = useState(false);

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    const authorization = {
      name,
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "/register",
        authorization,
        config
      );
      console.log(data)
      localStorage.setItem("authToken", data.token);
      setEmailSend(true)
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }

  const responseGoogle = async (response) => {
    try {
      console.log(response);
      console.log(response.access_token);
      const { data } = await axios.post(
        "/google_register",
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

  return (
    <>
      <div className="d-flex flex-column vh-100">
        <Navbar privateData={privateData} />
        {emailSend ? (
          <main className="container mt-5">
            <div className="container d-flex justify-content-center align-items-center mt-5">
              Check your email for verifcation
            </div>
          </main>
        ) : (
          <main className="container mt-5">
            <div className="container d-flex justify-content-center align-items-center mt-5">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                  <div className="card shadow">
                    <div className="card-body">
                      <h5 className="card-title">Register</h5>
                      <form
                        onSubmit={registerHandler}
                        className="validated-form"
                      >
                        <div className="mb-3">
                          <label className="form-label" htmlFor="name">
                            name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="off"
                            autoFocus
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            className="form-control"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            required
                            autoComplete="off"
                          />
                        </div>
                        <button id="bbb" className="btn btn-success btn-block">
                          Register
                        </button>
                        <div className="googleBtn">
                          <GoogleLogin
                            className="googleBtn"
                            clientId="120190989342-rjkgo5ruoiggecgp3td3g5q6vqa6mqc2.apps.googleusercontent.com"
                            buttonText="Sign up with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                          />
                        </div>
                        {error && (
                          <span className="error-message">{error}</span>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        <Footer />
      </div>
    </>
  );
};

export default RegisterScreen;
