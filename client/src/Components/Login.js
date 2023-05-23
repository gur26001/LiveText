import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
const Login = () => {
  const [user, setUser] = useState({});

  function handleSignOut(event) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }
  useEffect(() => {
    const handleCallbackResponse = (response) => {
      console.log("encoded jwt id token: " + response.credential);
      var userobject = jwt_decode(response.credential);
      console.log(userobject);
      setUser(userobject);
      document.getElementById("signInDiv").hidden = true;
    };

    const initializeGoogleSignIn = () => {
      google.accounts.id.initialize({
        client_id:
          "735040736954-60qo6ch77aoaunbfqec1fh2cs5ooj923.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
      });
    };

    if (window.gapi) {
      // `google` object is available
      initializeGoogleSignIn();
    } else {
      // Load Google API client library
      window.gapi.load("client", initializeGoogleSignIn);
    }

    // google.accoounts.id.prompt();
  }, []);

  return (
    <div className="App">
      <div id="signInDiv"></div>
      {Object.keys(user).length != 0 && (
        <button onClick={(e) => handleSignOut(e)}>SignOut</button>
      )}

      {user && (
        <div>
          <img src={user.picture}></img>
          <h1>{user.name}</h1>
        </div>
      )}
    </div>
  );
};

export default Login;
