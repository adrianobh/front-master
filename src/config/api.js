import axios from "axios";
// export const  api = axios.create({
//   baseURL: "http://ec2-54-245-133-39.us-west-2.compute.amazonaws.com:8000",
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

export const  api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    'Content-Type': 'application/json',
  }
});