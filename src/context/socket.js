import io from "socket.io-client"; 

export const socket = io('https://malath.onrender.com/', {
  extraHeaders: {
    // "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${JSON?.parse(localStorage?.getItem("user"))?.token}`
  },
  withCredentials: true,
  });


// export const socket = io("https://malath.onrender.com/"  ,{autoConnect: false} , {withCredentials: true,
// transports: ['websocket', 'polling', 'flashsocket'],
//     auth: {
//         token: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
//     }
// });

// export const socket = io("https://malath.onrender.com/"  , {withCredentials: true,
// extraHeaders: {
//   Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
// }});
// export const socket = io("https://malath.onrender.com" , {cors: { origin: "*" }}, {withCredentials: true,

//   header: {"Access-Control-Allow-Origin": "*"}
// }, {




//     query: "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4MTU4NDA3OX0.sPQTpiNZl6WRzN5aPZw9C_7ASu00oRgfDNOdPg806s4"



// } ,{ transports: ['websocket'] });
// export const SocketContext = React.createContext();