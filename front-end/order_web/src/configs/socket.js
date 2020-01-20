import io from "socket.io-client";
import apiConfig from "./apiConfig";

const socket = io.connect(apiConfig.url);

export default socket;