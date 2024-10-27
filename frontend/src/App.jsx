import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import existing components
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import CollegeP from "./components/CollegeP"; // Assuming CollegeP is the College Prediction component
import RankP from "./components/RankP";
import PercentileP from "./components/PercentileP";
import CollegePrediction from "./components/CollegePrediction"; // Importing the CollegePrediction component

// Set up routes
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
    element: <CollegeP />, // Existing route for CollegeP
  },
  {
    path: "/rankp",
    element: <RankP />,
  },
  {
    path: "/percentilep",
    element: <PercentileP />,
  },
  {
    path: "/college-predictor", // New route for the College Prediction component
    element: <CollegePrediction />,
  },
]);

// Main App Component
function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
