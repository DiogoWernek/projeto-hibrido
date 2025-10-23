import { useEffect } from "react";

import api from "../services/api";

export const Home = () => {
  const importData = async () => {
    try {
      const response = await api.get("/import");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    importData();
  }, []);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};
