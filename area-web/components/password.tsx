import React, { useState } from 'react';

const PasswordInput = () => {
  return (
    <div>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        style={styles.input}
        placeholder="Enter your password"
      />
    </div>
  );
};

const styles = {
  input: {
    border: '1px solid #ccc',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    width: 300,
    backgroundColor: '#f4f0f0',
    transition: 'border-color 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  }
};

export default PasswordInput;