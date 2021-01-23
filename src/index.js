/* eslint-disable jsx-a11y/anchor-is-valid */
import axios                  from "axios";
import React                  from "react";
import ReactDOM               from "react-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
}                             from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ImageTest />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

function useRandomImage() {
  return useQuery("image", async () => {
    const { data } = await axios.get(
      "https://source.unsplash.com/2560x1600", {
        responseType: "arraybuffer"
      }
    );
    return new Buffer(data, "binary").toString("base64");
  }, {
    staleTime: Infinity,
    cacheTime: Infinity
  });
}

function ImageTest() {
  const { status, data, error } = useRandomImage();
  console.log({ data });
  return status === "loading" ? (
    "Loading..."
  ) : status === "error" ? (
    <span>Error: {error.message}</span>
  ) : (
    <img
      style={{
        width:   1000,
        margin:  "3rem auto 0px",
        display: "block"
      }}
      src={`data:image/jpeg;base64,${data}`}
      alt="random test"
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
