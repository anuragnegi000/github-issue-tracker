import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const UserId = localStorage.getItem("UserId");
      const token = localStorage.getItem("token");

      if (!UserId || !token) {
        throw new Error("User ID or token is missing");
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/repos/${UserId}`, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.repos || []);

    } catch (error) {
      console.error("There was an error fetching the data:", error);
      setData([]);
    }
  };

  return (
    <DataContext.Provider value={{ data, setData, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
