import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUrls, createUrls, getClicks } from "../redux/features/urlSlice";
import { Oval } from "react-loader-spinner";

import ToastService from "react-material-toast";
import "./index.css";

function Home() {
  var websiteFormat =
    /^((https?|ftp|smtp):\/\/)?(www.)?[-a-zA-Z0-9_?]+(\.[a-z%]+)+(\/[_a-zA-Z0-9-.#%?]+\/?)*$/;
  const { urls } = useSelector((state) => ({
    ...state.app,
  }));

  const toast = ToastService.new({
    place: "topRight",
    duration: 3,
    maxCount: 5,
  });

  const apiFailureToast = (message) => {
    toast.error(message);
  };

  const apiSuccessToast = (msg) => {
    toast.success(msg);
  };

  const dispatch = useDispatch();
  const [value, setValue] = useState();
  const [response, setResponse] = useState();
  const [toggleUrl, setToggleUrl] = useState();
  const [isLoading, setLoading] = useState();
  const [showUrls] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      url: value,
    };
    if (!value) {
      apiFailureToast("Please enter required field");

      return;
    } else if (!value.match(websiteFormat)) {
      apiFailureToast("Enter valid Url");

      return;
    }
    dispatch(createUrls(data));
    setResponse((pre) => !pre);
    apiSuccessToast("Short link Created");
  };

  const clickHandler = () => {
    setToggleUrl((pre) => !pre);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      dispatch(getUrls());
      setToggleUrl();
      setLoading(false);
    }, 500);
  }, [response, toggleUrl]);

  const showUrl = () => {
    return (
      <>
        <table className="table">
          <tr className="th">
            <th className="title-url">Original URL</th>
            <th className="title-shortUrl">Shortened URL</th>
            <th className="title-clicks">Clicks</th>
          </tr>

          {urls[0]?.response.map((val, key) => {
            return (
              <tr key={key} className="table-response">
                <td>{val.original_url}</td>
                <a
                  onClick={() => {
                    clickHandler();
                  }}
                  href={`http://localhost:3001/api/v1/shortUrl/${val.short_url}`}
                  target="_blank"
                  className="Links"
                >
                  shorten/{val.short_url}
                </a>

                <td>{val.clicks} times</td>
              </tr>
            );
          })}
        </table>
      </>
    );
  };

  return (
    <div className="home-screen">
      <div className="Div-1">
        <div className="heading">
          <p>URL SHORTENER</p>
        </div>

        <div className="Div-2">
          <div className="div-Input">
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter Url"
            ></input>
            <button onClick={handleSubmit} type="button">
              Short Link
            </button>
          </div>

          <div className="table-div">
            {isLoading ? (
              <div className="loader">
                <Oval></Oval>
              </div>
            ) : (
              <div>{showUrl()}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
