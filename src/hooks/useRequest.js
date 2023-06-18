import { useState } from "react";
import fetchData from "../api/fetchData";
import { URI } from "../api/connectionData";

export default function useRequest(endpoint, method, hasToken) {
  const url = URI + endpoint;
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function sendRequest(data = null) {
    let config = requestBuilder(method, data, hasToken);
    setIsLoading(true);
    fetchData(url, config)
      .then((res) => {
        setResponse(res);
        setIsLoading(false);
      })
      .catch((error) => console.log(`error loading data: ${error}`));
  }

  return [response, isLoading, sendRequest];
}

function requestBuilder(method, data, hasToken) {
  const userToken = sessionStorage.getItem("token");
  let config = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (hasToken) {
    config.headers = { ...config.headers, "x-token": userToken };
  }
  if (data != null) {
    config = { ...config, ...{ body: JSON.stringify(data) } };
  }
  return config;
}
