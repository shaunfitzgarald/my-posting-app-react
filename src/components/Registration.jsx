import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [registrationErrors, setRegistrationErrors] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Ensure the password and confirmation match
    if (user.password === user.passwordConfirmation) {
      axios.post('http://localhost:3000/signup', {
        user: {
          name: user.name,
          email: user.email,
          password: user.password,
          password_confirmation: user.passwordConfirmation
        }
      },
      { withCredentials: true } // If you're dealing with sessions
      ).then(response => {
        if (response.data.status === 'created') {
          // Handle successful registration, perhaps by updating state or redirecting
        } else {
          // Handle other statuses or error messages
          setRegistrationErrors(response.data.errors);
        }
      }).catch(error => {
        console.log("registration error", error);
      });
    } else {
      // Handle password confirmation mismatch
      setRegistrationErrors('Password and password confirmation must match');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
          required
        />

        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Password Confirmation"
          value={user.passwordConfirmation}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Register</button>
      </form>

      <div>
        {registrationErrors && <div>{registrationErrors}</div>}
      </div>
    </div>
  );
};

export default Registration;
