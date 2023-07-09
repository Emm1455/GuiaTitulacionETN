import { useState } from "react";
import fetchData from "../api/fetchData";
import { URI } from "../api/connectionData";

export default function useRequest(
  endpoint,
  method,
  token,
  responseHandler
) {
  const url = URI + endpoint;
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState("");

  function sendRequest(data = null) {
    let config = requestBuilder(method, data, token);
    setIsLoading("requesting");
    fetchData(url, config)
      .then((res) => {
        setResponse(res);
        setIsLoading("requested");
        responseHandler(res);
      })
      .catch((error) => console.log(`error loading data: ${error}`));
  }

  return [response, isLoading, sendRequest];
}

function requestBuilder(method, data, token) {
  let config = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (token !== "") {
    config.headers = { ...config.headers, "x-token": token };
  }
  if (data != null) {
    config = { ...config, ...{ body: JSON.stringify(data) } };
  }
  return config;
}
