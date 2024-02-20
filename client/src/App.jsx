import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Chats from "./pages/Chats";
import Chat from "./organisms/Chat";
import Profil from "./pages/Profil";
import "./App.css";
import Global from "./layout/Global";
import ProtectedRoute from "./ProtectedRoute";
import { io } from "socket.io-client";
// import Loading from "./pages/Loading";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

const socket = io("http://localhost:5000");
console.log("Connected to websocket");

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Global>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/chats" element={<Chats socket={socket} />}>
                  <Route path=":id" element={<Chat socket={socket} />} />
                </Route>
              </Route>
              {/* <Route path="/loading" element={<Loading />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/profile" element={<Profil />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Global>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
