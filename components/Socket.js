import socketIO from "socket.io-client";

const newSocket = socketIO("https://fitforhire.herokuapp.com", {
  transports: ["websocket"],
  jsonp: false
});

const connectSocket = () => {
  newSocket.connect();
  newSocket.on("connect", () => {
    console.log("Chat Server Connected!");
  });
};

export default newSocket;

export { connectSocket };
