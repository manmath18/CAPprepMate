import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import CollegeP from "./components/CollegeP";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/collegep",
    element: <CollegeP/>,
  },
]);
function App() {
  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
