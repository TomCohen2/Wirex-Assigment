import React from "react";
import { useState, useEffect } from "react";
import Button from "mui-button";

function Logout() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.href = "/";
  };

  return (
    <Button
      style={{
        marginLeft: "10px",
      }}
      color="primary"
      variant="outlined"
      onClick={() => handleLogout()}
    >
      Logout
    </Button>
  );
}

export default Logout;
