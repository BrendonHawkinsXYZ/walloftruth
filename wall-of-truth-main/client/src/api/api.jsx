import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000";

export default class API {
  static submitMessage = async (data) => {
    try {
      const res = await axios.post(`/api/submitMessage`, data);
      return res;
    } catch (error) {
      alert(error?.response?.data?.message);
      return error?.response?.data;
    }
  };

  static getMessages = async () => {
    try {
      const res = await axios.get(`/api/getMessages`);
      return res;
    } catch (error) {
      alert("Something went wrong");
      return error?.response?.data;
    }
  };
}
