import logo from './logo.svg';
import './App.css';
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import AddEvent from './Pages/AddEvent';
import Displaynudge from './Pages/Displaynudge';
import Edit from './Pages/Edit';
import { RouterProvider } from 'react-router-dom';
import { routes } from './Router';

function App() {

  return (
    <div className="Ap">
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
