import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout';
import './App.css';
import Home from './Components/Layout/Home/Home';
import Profile from './Components/Layout/Profile/Profile';
import ChatPage from './Components/Layout/ChatPage/ChatPage';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';

function App() {
  const browserRouter = createBrowserRouter([
    {
      path:"/",
      element:<MainLayout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/",
          element:<Profile/>
        },
        {
          path:"/ChatPage/",
          element:<ChatPage/>
        }
      ]
    },
    {
      path:'/signin',
      element:<Signin/>
    },
    {
      path:'/signup',
      element:<Signup/>
    }
  ])
  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  );
}

export default App;
