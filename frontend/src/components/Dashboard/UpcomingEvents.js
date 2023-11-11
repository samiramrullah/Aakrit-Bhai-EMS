import { useEffect, useState } from 'react'
import Eventcard from '../../utils/Cards/Eventcard';
const UpcomingEvents = () => {
    const [allUpcomingEvents, setAllUpcomingEvents] = useState();
    useEffect(() => {
        fetch("http://localhost:5000/event/upcomingevents")
            .then((response) => response.json())
            .then((data) => setAllUpcomingEvents(data.doc))
            .catch((error) => console.log(error));
    }, []);
    if (allUpcomingEvents?.length > 0) {
        return (
            <div class="container">
                <h1 class="text-center" >Ongoing Events</h1>
                <hr class="hr hr-blurry" />
                <div class='row'>
                    {allUpcomingEvents?.map(itm => (
                        <div class="col-lg-6 mt-2" >
                            <Eventcard eventName={itm.eventName} location={itm.location} date={itm.eventDate} img={itm.eventImageUrl} id={itm._id} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (
            <h1>NO Data</h1>
        )
    }
}

export default UpcomingEvents;