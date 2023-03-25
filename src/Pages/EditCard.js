import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const EditCard = ({ event1 }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/myreview";

    const [users, setUser] = useState({});
    console.log(users)

    const handleOnSubmit = event => {
        event.preventDefault();
        fetch(`https://nudge-server.vercel.app/api/${event1._id}`, {
            method: "PUT",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(users)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    alert('update successfully')
                    navigate('/')
                }
            })
        console.log(users)
    }
    const handleInputChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newUser = { ...users }
        newUser[field] = value;
        setUser(newUser);
    }
    return (
        <div className='lg:w-1/2 mx-auto text-center border-2 my-8 p-4 '>
            <form onSubmit={handleOnSubmit}>
                {/* event  */}
                <div className='flex justify-evenly items-center my-4 '>
                    <p className='ml-8'>I Want to create a nudge for  </p>
                    <img src alt="" />
                    <select name='events' onChange={handleInputChange} className="select onBlur={onEvent} select-ghost w-1/2 lg:w-1/4 rounded-none ">
                        <option disabled selected>Select a Event</option>
                        <option>Event-1</option>
                        <option>Event-2</option>
                        <option>Event-3</option>
                    </select>
                </div>
                {/* tag artcal  */}
                <div>
                    <input name='tag' onChange={handleInputChange} defaultValue={event1.tagline} type="text" placeholder="tag... (60 char max)" className="input input-bordered rounded-none my-4 input-success w-full max-w-lg" />
                </div>
                <div>
                    <input name='title' defaultValue={event1.title} onChange={handleInputChange} type="text" placeholder="Title... (60 char max)" className="input input-bordered rounded-none input-success w-full max-w-lg" />
                </div>

                {/* <div>
                    <input type="file" name='image' onChange={handleInputChange} className="file-input rounded-none my-4 file-input-bordered file-input-success w-full max-w-lg" />
                </div> */}
                {/* schedule  */}
                <div className='flex justify-evenly mx-8'>
                    {/* date  */}
                    <div>
                        <p>Schedule On</p>
                        <input name='date' defaultValue={event1.schedule.date} onChange={handleInputChange} type="date" />
                    </div>
                    {/* time  */}
                    <div className='  '>
                        <p>Timings</p>
                        <div className='flex'>
                            <p>From <span><input name='fromTime' defaultValue={event1.schedule.fromTime} onChange={handleInputChange} type="time" /></span> </p>
                            <p>To <span><input defaultValue={event1.schedule.toTime} name='toTime' onChange={handleInputChange} type="time" /></span> </p>
                        </div>
                    </div>
                </div>
                {/* discription  */}
                <div>
                    <textarea name='description' defaultValue={event1.description} onChange={handleInputChange} className="textarea textarea-success rounded-none my-4 w-full max-w-lg" placeholder="Description"></textarea>
                </div>
                {/* viewing a nodge  */}
                <div>
                    <p className='text-start ml-40'>For viewing a nudge at the end of an article</p>


                    <div className='flex justify-evenly items-center mx-24'>
                        {/* <label htmlFor="formId">
                            <p className=' border border-emerald-200 px-3 py-2  '>Choose Icon</p>
                            <input name="icon" type="file" id="formId" hidden />

                        </label> */}
                        <textarea name='invitation' defaultValue={event1.invitation} onChange={handleInputChange} className="textarea textarea-success rounded-none my-4 w-1/2 max-w-lg" placeholder="Invitation"></textarea>
                    </div>
                </div>
                <div className='mx-4 flex justify-evenly'>
                    <label htmlFor="my-modal-6" className="rounded-none lg:mx-32 px- btn btn-outline btn-success">Preview</label>
                    <button type='submit' className=" rounded-none lg:mx-32 px- btn btn-outline btn-success">Publish Now</button>
                </div>
            </form>
        </div>
    );
};

export default EditCard;