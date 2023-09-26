// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Edit from './pages/Edit';
// import { Navigate } from "react-router-dom";

// const AppRoutes = () => {

//   const ProtectedRoute = ({ children }) => {
//     const isAuthenticated = localStorage.getItem("isAuthenticated");

//     return isAuthenticated ? children : <Navigate to='/login' />;
//   };

//   return (
//     <Router>
//       <Routes>
//         {" "}
//         <Route path='/' element={<Login />} />
//         <ProtectedRoute>
//           <Route path='/edit/:userId' element={<Edit />} />
//           <Route path='/dashboard' element={<Dashboard />} />
//         </ProtectedRoute>
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import routes from "./routes/routes.jsx";
import { BrowserRouter, useRoutes } from "react-router-dom";

const App = () => useRoutes(routes);

const RouterWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default RouterWrapper;

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Edit from "./pages/Edit";
// import { Navigate } from "react-router-dom";

// const AppRoutes = () => {
//   const ProtectedRoute = ({ children }) => {
//     const isAuthenticated = localStorage.getItem("isAuthenticated");

//     return isAuthenticated ? children : <Navigate to='/login' />;
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Login />} />
//         <Route path='/login' element={<Login />} />
//         <ProtectedRoute>
//           <Route path='/edit/:userId' element={<Edit />} />
//           <Route path='/dashboard' element={<Dashboard />} />
//         </ProtectedRoute>
//       </Routes>
//     </Router>
//   );
// };

// export default AppRoutes;
