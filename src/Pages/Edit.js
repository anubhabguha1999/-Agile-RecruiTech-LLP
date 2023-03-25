import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import EditCard from './EditCard';
import { useLoaderData } from 'react-router-dom';

const Edit = () => {
   const useEvent = useLoaderData()
// console.log(useEvent)
    return (
        <div className='w-11/12 m-auto text-center'>
            <h2>Hello 
            </h2>
         <EditCard
         event1={useEvent}
         key={useEvent._id}
         ></EditCard>
        </div>
    );
};

export default Edit;