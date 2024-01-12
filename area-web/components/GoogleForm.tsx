import React from 'react';

const GoogleForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Logique de soumission du formulaire Google si nécessaire
  };

  const styles = {
    window: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#555555",
      borderRadius: 10,
      padding: 20,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      zIndex: 999,
    },
  };

  return (
    <div style={styles.window}>
      <h2>Google Form</h2>
      <form onSubmit={handleSubmit}>
        <p>Select an option:</p>
        <select>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <button type="submit">Submit</button>
        <button onClick={onClose}>Close</button>
      </form>
    </div>
  );
};

export default GoogleForm;
