
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Register from './AuthComponents/register';
import Login from './AuthComponents/login';
import AccountApproval from './admincomponents/AccountApproval';
import PublicLayout from './HomeComponents/PublicLayout';
import Home from './HomeComponents/Home';
import AdminLayout from './admincomponents/AdminLayout';
import ViewTickets from './TicketComponents/ViewTickets';
import ProtectedRoute from './ProtectedRoute';
import ViewTicket from './TicketComponents/ViewTicket';
import UserManagement from './admincomponents/UserManagement';
import CreateTicket from './TicketComponents/CreateTicket';
import Profile from './admincomponents/Profile';

function App() {
  const router = createBrowserRouter([
   {
  path: "/",
  element: <PublicLayout />,
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    }
  ],
},
{
    path: "/admin",
   element: <ProtectedRoute/>,
    children: [{
      element: <AdminLayout />,  
      children:[
        {
        index: true,
        element: <ViewTickets />,
      },
      {
      path: "tickets/:id",
      element: <ViewTicket />,
     },
     {
      path: "create-ticket",
      element: <CreateTicket />,
     },
     {
        path: "approvals",
        element: <AccountApproval />,
     },
    
     {
      path: "manageusers",
      element: <UserManagement/>
     },
     {
      path:"profile/:userId",
      element:<Profile/>
     } ,
     {
      path: "profile",
      element: <Profile />,
     },

    ]
  }
  ]}
  ,{
  path: "/employee",
  element: <ProtectedRoute />,
  children: [
    {
      element: <AdminLayout />, 
      children: [
        {
          index: true,
          element: <ViewTickets />, 
        },
        {
          path: "tickets/:id",
          element: <ViewTicket />, 
        },
        {
          path: "profile",
          element: <Profile />, 
        },
      ],
    },
  ],
}

  ]);

  return (
      <RouterProvider router={router} />);
}

export default App
