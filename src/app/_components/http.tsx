import axios from "axios";

const serviceUrlGeneral = process.env.NEXT_PUBLIC_API_ENDPOINT;
const timeoutGeneral: string | undefined = process.env.NEXT_PUBLIC_API_TIMEOUT;
let timeoutGeneralNumber: number = timeoutGeneral !== undefined ? parseInt(timeoutGeneral,10) : 300000;

const http = axios.create({
  baseURL: serviceUrlGeneral,
  timeout: timeoutGeneralNumber,
  headers:{
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default http;