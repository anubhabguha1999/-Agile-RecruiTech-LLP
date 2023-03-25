import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex justify-between">
                    <button className='flex justify-center'>    <Link to='/' className="btn btn-ghost normal-case text-xl">Simple Navbar</Link></button>

                    <button className='flex justify-center'>
                        <Link className='btn btn-primary' to='/addevent'>Add Event</Link>
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Nav;