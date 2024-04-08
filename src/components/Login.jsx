import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loginErrors, setLoginErrors] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/login`, {
      user: {
        email: credentials.email,
        password: credentials.password
      }
    },
    { withCredentials: true } // If you're dealing with sessions
    ).then(response => {
      if (response.data.logged_in) {
        // If login is successful, you might want to handle the logged in status,
        // perhaps saving the user to the state, and redirecting to a dashboard or home page.
        props.handleSuccessfulAuth(response.data);
      } else {
        setLoginErrors(response.data.message);
      }
    }).catch(error => {
      console.log('login error', error);
      setLoginErrors('An error occurred while trying to log in.');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Log in</button>
      </form>

      {loginErrors && <div>{loginErrors}</div>}
    </div>
  );
};

export default Login;
