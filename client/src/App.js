import React, { useEffect, useState } from "react";
import axios from "axios";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Screens
import PrivateScreen from "./components/screens/PrivateScreen";
import VerifyPassword from "./components/screens/VerifyPassword";
import VerifyEmail from "./components/screens/VerifyEmail";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import Home from "./components/screens/Home";

const App = () => {
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/protected", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setPrivateData("");
        setError(JSON.stringify(error));
      }
    };
    fetchPrivateDate();
  }, []);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <Home privateData={privateData} error={error} />}
        />
        <Route
          exact
          path="/protected"
          component={() => (
            <PrivateScreen privateData={privateData} error={error} />
          )}
        />
        <Route
          exact
          path="/login"
          component={() => (
            <LoginScreen privateData={privateData} error={error} />
          )}
        />
        <Route
          exact
          path="/register"
          component={() => (
            <RegisterScreen privateData={privateData} error={error} />
          )}
        />
        <Route
          exact
          path="/verification"
          component={(props) => (
            <VerifyEmail {...props} privateData={privateData} error={error} />
          )}
        />
        <Route
          exact
          path="/forgot_password"
          component={() => (
            <ForgotPasswordScreen
              privateData={privateData}
              error={error}
            />
          )}
        />
        <Route
          exact
          path="/reset_verification"
          component={(props) => (
            <VerifyPassword
              {...props}
              privateData={privateData}
              error={error}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default App;
