import React, {useState} from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Navbar from '../Navbar'
import Footer from '../Footer'

const VerifyPassword = (props) => {
    const history = useHistory();
    let query = queryString.parse(props.location.search);
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const fetchPrivateDate = async (e) => {
        e.preventDefault();

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      if (password !== password2) {
        setPassword("");
        setPassword2("");
        setTimeout(() => {
          setError("");
        }, 5000);
        setError("Passwords do not match");
      }else{
const changes = {
  password: password,
};
try {
  const { data } = await axios.post(
    `/verify_reset_password?token=${query.token}`,
    changes,
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
  localStorage.removeItem("authToken");
}
      }
    };

    return (
      <div className="d-flex flex-column vh-100">
        <Navbar privateData={props.privateData} />
        <main className="container mt-5">
          <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                <div className="card shadow">
                  <div className="card-body">
                    <h5 className="card-title">Reset</h5>
                    <form
                      onSubmit={fetchPrivateDate}
                      className="validated-form"
                    >
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
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="password2">
                          Confirm Password
                        </label>
                        <input
                          className="form-control"
                          onChange={(e) => setPassword2(e.target.value)}
                          value={password2}
                          type="password"
                          id="password2"
                          name="password2"
                          required
                          autoComplete="off"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success btn-block"
                      >
                        Confirm
                      </button>
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
    );
}

export default VerifyPassword
