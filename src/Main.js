import React from 'react';
import { Outlet } from 'react-router-dom';
import About from './About';
import Nav from './Nav';
import Displaynudge from './Pages/Displaynudge';

const Main = () => {
    return (
        <div>
           <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;