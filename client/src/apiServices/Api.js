/* eslint-disable */
import axios from "axios";
import * as Cookies from "js-cookie";

export default () => {
  const instance = axios.create({
    baseURL: `http://localhost:9001/api` // BASEURL
  });

  Cookies.get("CLCNWAHASH")
    ? (instance.defaults.headers.common["Authorization"] = Cookies.get(
      "CLCNWAHASH"
    ))
    : undefined;
  instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

  instance.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      // Do something with response error
      if (!error["response"]) {
        if (status) {
          // redirect to auth page or login again
          window.location.replace("/login");
          alert("Your authorization token is invalid or expired");
        }

        return Promise.reject(error);
      } else if (error.response.status == 403) {
        // redirect to auth page or login again
        window.location.replace("/login");
        alert("Your authorization token is invalid or expired");

      } else if (error.response.status == 401) {
        window.location.replace("/login");
        alert(
          "Something went wrong. kindly contact your administrator"
        );
      } else {
        // alert(
        //   "Something went wrong. kindly contact your administrator"
        // );
      }
      return Promise.reject(error);
    }
  );
  return instance;
};
