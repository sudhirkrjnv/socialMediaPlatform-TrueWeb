import { RouterProvider, createBrowserRouter} from 'react-router-dom';
import MainLayout from './Components/Layout/MainLayout';
import './App.css';
import Home from './Components/Layout/Home/Home';
import Profile from './Components/Layout/Profile/Profile';
import ChatPage from './Components/Layout/ChatPage/ChatPage';

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
    }
  ])
  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  );
}

export default App;
