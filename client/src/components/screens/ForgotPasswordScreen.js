import { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";
import Navbar from "../Navbar"
import Footer from "../Footer"

const ForgotPasswordScreen = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [emailSend, setEmailSend] = useState(false);

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/reset_password",
        { email },
        config
      );
      console.log(data)
      setEmailSend(true)
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar privateData={props.privateData} />
      {emailSend ? (
        <main className="container mt-5">
          <div className="container d-flex justify-content-center align-items-center mt-5">
            Check your email for Verify reset password
          </div>
        </main>
      ) : (
        <main className="container mt-5">
          <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Reset</h5>
                    <form
                      onSubmit={forgotPasswordHandler}
                      className="validated-form"
                    >
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
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Reset
                      </button>
                      {error && <span className="error-message">{error}</span>}
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
  );
};

export default ForgotPasswordScreen;
