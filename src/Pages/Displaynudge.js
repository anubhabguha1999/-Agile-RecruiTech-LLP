import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Displaynudge = () => {

    const { data: events = [], refetch } = useQuery({
        queryKey: ['selleruser'],

        queryFn: async () => {
            const res = await fetch(`https://nudge-server.vercel.app/api/v3/app`);
            const data = await res.json();

            return data;
        }
    })

    const handleDelete = id => {
        const sureDelete = window.confirm("Are Your Sure, you want delete")
        if (sureDelete) {
            fetch(`https://nudge-server.vercel.app/api/v3/app/${id}`,
                {
                    method: "DELETE"
                })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);

                    if (data.deletedCount > 0) {
                        alert(" delete successfully")
                        refetch()
                    }
                })
        }
    }

    // console.log(events)
    return (
        <div className='grid grid-cols-2 gap-2 w-11/12 my-8 mx-auto'>
            {
                events.map(event => <div>
                    <div className="card bg-white shadow-xl image-full">
                        <figure><img src={event.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">Event: {event.title}</h2>
                            <p>{event.sub_category}</p>
                            <p> Moderator: {event.moderator}</p>
                            <p> UID: {event._id}</p>
                            <p> tagline: {event.tagline}</p>
                            <p> tagline: {event.tagline}</p>
                            <div className='flex'>

                                <p > Date {event.schedule.date}</p>
                                <p className='ml-2'>   Time: {event.schedule.fromTime}</p>
                                <p className='ml-2'> to {event.schedule.toTime}</p>

                            </div>

                            <div className="card-actions justify-end">
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="btn btn-primary">Delete</button>
                                <Link to={`/api/v3/app/${event._id}`} className="btn btn-primary">Edit</Link>
                            </div>
                        </div>
                    </div>

                </div>)
            }
        </div>
    );
};

export default Displaynudge;


