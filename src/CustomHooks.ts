import { useEffect, useState } from "react";
import AxiosInstance from "./config/AxiosConfig";

interface AxiosProps {
  endPoint: string;
}

/*
  @param axiosProps: AxiosProps accept endpoint url
  useAxios(): This is a custom hook to fetch data from backend API or service. 
  This method returns response, error and loading as return as per the stage
*/
const useAxios = (axiosProps: AxiosProps) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setloading] = useState<boolean>(true);

  const fetchData = () => {
    AxiosInstance.get(axiosProps.endPoint)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};

/*
  useWindowResize(): This is a custom hook to get updated window size on resize the screen. 
  This method returns windowSize object, contains width & height of current window
*/
const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

export { useAxios, useWindowResize };
