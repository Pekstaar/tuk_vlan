import { useContext, useEffect, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Call from "./components/meeting/Call";
import { Home, Login, Register } from "./screens";
import LeaveCall from "./screens/LeaveScreen";
import Meet from "./screens/Meet";
import Meeting from "./screens/Meeting";
import Social from "./screens/Social";
import { mainContext } from "./services/context/MainContext";
import RoomProvider from "./services/context/RoomContext";
import PrivateRoute from "./services/PrivateRoute";

function App() {
  const id = useMemo(() => window.location.search, []);

  const { setMeetingId } = useContext(mainContext);

  useEffect(() => {
    const windowId = id?.split("=")[1];

    if (windowId) {
      setMeetingId(windowId);
    }
  }, [id, setMeetingId]);

  return (
    <div className="bg-gray-50">
      <RoomProvider>
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<Register />} />
          <>
            <Route
              path={"/"}
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            <Route
              path={"/call"}
              element={
                <PrivateRoute>
                  <Meet />
                </PrivateRoute>
              }
            />

            <Route
              path={"/meet"}
              element={
                <PrivateRoute>
                  <Meeting />
                </PrivateRoute>
              }
            />

            <Route
              path={"/leave"}
              element={
                <PrivateRoute>
                  <LeaveCall />
                </PrivateRoute>
              }
            />

            <Route
              path={"/meet/:id"}
              element={
                <PrivateRoute>
                  <Call />
                </PrivateRoute>
              }
            />

            <Route
              path={"/social"}
              element={
                <PrivateRoute>
                  <Social />
                </PrivateRoute>
              }
            />
          </>
        </Routes>
      </RoomProvider>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
