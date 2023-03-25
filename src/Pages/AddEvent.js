import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const imageHostKey = process.env.REACT_APP_imgbb_key

const AddEvent = () => {
 const navigate = useNavigate()

    const [events, SetEvents] = useState()
    const [titles, setTitle] = useState()
    const [images, setImage] = useState()
    const [date, setDate] = useState()
    const [fromTime, SetFromTime] = useState()
    const [toTime, SetToTime] = useState()
    const [description, setDescription] = useState()
    const [invitation, setInvitation] = useState()
    const [tag, setTag] = useState()


    const onChangeHandleTitle = async (event) => {
        setTitle(event.target.value)
    }
    const onChangeHandleTag = async (event) => {
        setTag(event.target.value)
    }
    const onChangeHandleimg = async (event) => {
        const image = event.target.files
        setImage(URL.createObjectURL(image[0]))
    }

    const onEvent = (event) => {
        SetEvents(event.target.value)
    }
    const onDate = (event) => {
        setDate(event.target.value)
    }
    const onFromTime = (event) => {
        SetFromTime(event.target.value)
    }
    const onToTime = (event) => {
        SetToTime(event.target.value)
    }
    const onDescription = (event) => {
        setDescription(event.target.value)
    }
    const onInvitation = (event) => {
        setInvitation(event.target.value)
    }
    const handleOnSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const events = form.events.value;
        const title = form.title.value;
        const tag = form.tag.value;
        const image = form.image.files[0];
        const date = form.date.value;
        const fromTime = form.fromTime.value;
        const toTime = form.toTime.value;
        const description = form.description.value;
        const images = form.icon.files;
        const invitation = form.invitation.value


        // console.log(title, image, date, fromTime, toTime, tag, description, images, invitation, events)

        const formData = new FormData()
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=2d5b1a5401d8ef6742d2329ac8957810`

        fetch(url, {
            method: "POST",
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                const schedule = { date, fromTime, toTime }

                const users = { type: events, image: data.data.url, schedule, description, images, invitation, createdAt: new Date().toISOString(), moderator: 'host', category: events, sub_category: "Sub Category,", rigor_rank: 2, attendees: 'user_id', uid: '1', tagline: tag , title}

                fetch('https://nudge-server.vercel.app/api/v3/app/events', {
                    method: 'POST',
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(users)
                }).then(res => res.json())
                    .then(data => {
                        if(data.acknowledged){
                            alert('update successfully')
                            navigate('/')
                        }
                        console.log(data);
                    })
                    .catch(err => console.log(err))
            })

            .catch(err => console.log(err))

    }
    return (
        <div className='lg:w-1/2 mx-auto text-center border-2 my-8 p-4 '>
            <form onSubmit={handleOnSubmit}>
                {/* event  */}
                <div className='flex justify-evenly items-center my-4 '>
                    <p className='ml-8'>I Want to create a nudge for  </p>
                    <img src alt="" />
                    <select name='events' onBlur={onEvent} className="select onBlur={onEvent} select-ghost w-1/2 lg:w-1/4 rounded-none ">
                        <option disabled selected>Select a Event</option>
                        <option>Event-1</option>
                        <option>Event-2</option>
                        <option>Event-3</option>
                    </select>
                </div>
                {/* tag artcal  */}
                <div>
                    <input name='tag' onBlur={onChangeHandleTag} type="text" placeholder="tag... (60 char max)" className="input input-bordered rounded-none my-4 input-success w-full max-w-lg" />
                </div>
                <div>
                    <input name='title' onBlur={onChangeHandleTitle} type="text" placeholder="Title... (60 char max)" className="input input-bordered rounded-none input-success w-full max-w-lg" />
                </div>
                {/* image input 
                
                onBlur={onEvent}
                onBlur={onChangeHandleimg}
                onBlur={onDate}
                onBlur={onFromTime}
             onBlur={onToTime}
             onBlur={onDescription} 
             onBlur={onInvitation} 
                */}
                <div>
                    <input type="file" name='image' onBlur={onChangeHandleimg} className="file-input rounded-none my-4 file-input-bordered file-input-success w-full max-w-lg" />
                </div>
                {/* schedule  */}
                <div className='flex justify-evenly mx-8'>
                    {/* date  */}
                    <div>
                        <p>Schedule On</p>
                        <input name='date' onBlur={onDate} type="date" />
                    </div>
                    {/* time  */}
                    <div className='  '>
                        <p>Timings</p>
                        <div className='flex'>
                            <p>From <span><input name='fromTime' onBlur={onFromTime} type="time" /></span> </p>
                            <p>To <span><input name='toTime' onBlur={onToTime} type="time" /></span> </p>
                        </div>
                    </div>
                </div>
                {/* discription  */}
                <div>
                    <textarea name='description' onBlur={onDescription} className="textarea textarea-success rounded-none my-4 w-full max-w-lg" placeholder="Description"></textarea>
                </div>
                {/* viewing a nodge  */}
                <div>
                    <p className='text-start ml-40'>For viewing a nudge at the end of an article</p>


                    <div className='flex justify-evenly items-center mx-24'>
                        <label htmlFor="formId">
                            <p className=' border border-emerald-200 px-3 py-2  '>Choose Icon</p>
                            <input name="icon" type="file" id="formId" hidden />

                        </label>
                        <textarea name='invitation' onBlur={onInvitation} className="textarea textarea-success rounded-none my-4 w-1/2 max-w-lg" placeholder="Invitation"></textarea>
                    </div>
                </div>
                <div className='mx-4 flex justify-evenly'>
                    <label htmlFor="my-modal-6" className="rounded-none lg:mx-32 px- btn btn-outline btn-success">Preview</label>
                    <button type='submit' className=" rounded-none lg:mx-32 px- btn btn-outline btn-success">Publish Now</button>
                </div>
            </form>
            {/* The button to open modal */}


            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Event: {events}</h3>
                    <h3 className="font-bold text-lg">Tag: {tag}</h3>
                    <h3 className="font-bold text-lg">Titles: {titles}</h3>
                    <div className='flex justify-center'>
                        <img className='w-20 h-20 m-2' src={images} alt="" />
                    </div>
                    <div className='border'>
                        <p className='text-2xl'>Schedule</p>
                        <p className="py-4">Date: {date}</p>
                        <div className='flex justify-evenly'>
                            <p className="py-4">From: {fromTime}</p>
                            <p className="py-4">To: {toTime}</p>
                        </div>
                    </div>
                    <p className="py-4">to: {description}</p>
                    <p className="py-4">to: {invitation}</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-6" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;