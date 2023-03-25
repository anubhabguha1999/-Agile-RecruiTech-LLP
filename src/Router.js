import { createBrowserRouter } from "react-router-dom";
import About from "./About";
import Main from "./Main";
import AddEvent from "./Pages/AddEvent";
import Displaynudge from "./Pages/Displaynudge";
import Edit from "./Pages/Edit";


export const routes = createBrowserRouter([
    

{
    path: '/',
   element: <Main></Main>,
   children: [
    {
        path: '/api/v3/app/:id',
        element: <Edit></Edit>,
        loader: ({ params }) => fetch(`https://nudge-server.vercel.app/api/v3/app/${params.id}`)
    },
    {
        path: '/about',
        element: <About></About>
    },
    {
        path: '/',
        element: <Displaynudge></Displaynudge>
    },
    {
        path: '/addevent',
        element: <AddEvent></AddEvent>
    }
 
   ]

}

])