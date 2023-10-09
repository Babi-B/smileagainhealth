import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import FormModal from "../components/FormModal";
import { db, storage } from "../firebase/config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import "../About.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Events(props) {
  const [events, setEvent] = useState(props.events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [forEdit, setForEdit] = useState(false)

  const eventCollectionRef = collection(db, "events");
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setEvent(props.event);
  }, [props.event]);

  // ADD A EVENT
  const addEvent = async (event, fileUpload) => {
    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, 'event-images/' + fileUpload.name);
      const snapshot = await uploadBytes(storageRef, fileUpload);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(snapshot.ref);

      const docRef = await addDoc(eventCollectionRef, {
        ...event,
        imageUrl: downloadURL, // Save the image URL in the Firestore document
      });

      const newEvent = {
        ...event,
        id: docRef.id, 
        imageUrl: downloadURL, // Include the image URL in the new service object
      };

      setEvent([...events, newEvent]);
      console.log("EVENT ADDED")
    } catch (error) {
      console.error(`COULD NOT ADD EVENT. Error Message: ${error}`);
    }
  };

  // EDIT A EVENT
  const editEvent = async (eventId, updatedEvent, fileUpload) => {
    console.log(`The file is ${fileUpload.name}`)
    try {
          // Upload the new image to Firebase Storage
    const storageRef = ref(storage, 'event-images/' + fileUpload.name);
    const snapshot = await uploadBytes(storageRef, fileUpload);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(snapshot.ref);

      // Update the service data in Firebase Firestore, including the new image URL
    await updateDoc(doc(db, "events", eventId), {
      ...updatedEvent,
      imageUrl: downloadURL, // Include the new image URL in the updated service data
    });

    // Update the services state with the updated service
    setEvent((prevEvent) =>
      prevEvent.map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent, imageUrl: downloadURL } : event
      )
    );
      console.log("Event updated");
    } catch (error) {
      console.error(`COULD NOT UPDATE EVENT: ${error.message}`);
      alert(`COULD NOT UPDATE EVENT: ${error.message}`);
    }
  };

  // DELETE A EVENT
  const deleteEvent = async (eventId) => {
    try {
      // Delete the event from Firebase Firestore
      await deleteDoc(doc(db, "event", eventId));
      // Update the events state by removing the deleted service
      setEvent((prevEvent) =>
        prevEvent.filter((event) => event.id !== eventId)
      );
      console.log("Event deleted");
      props.refreshApp()
    } catch (error) {
      console.error(`COULD NOT DELETE EVENT: ${error.message}`);
      alert(`COULD NOT DELETE EVENT: ${error.message}`);
    }
  };

  return (
    <>
      <MiniNavbar location="Dashboard/Event" location_url="/dashboard/events" />
      <section id="team">
        <div className="container-lg py-5">
          <div className="d-flex justify-content-between flex-wrap mb-5">
            <h3 className="blue-text">Complete List of All Events</h3>
            <button
              className="btn btn-success px-3"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              ADD EVENT
            </button>
          </div>
          {props.events.length === 0 ? (
            <p className="fst-italic lead mb-4 text-center">
              No Event Has Been Registered
            </p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Image</th>
                  <th scope="col" className="text-wrap">Name</th>
                  <th scope="col" className="">Description</th>
                  <th scope="col" className="">Place</th>
                  <th scope="col" className="">Date & Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {props.events.map((event, index) => (
                  <tr key={event.id}>
                    <th scope="row">{index + 1}</th>
                    <td><img src={event.imageUrl} alt={event.name} height="40" /></td>
                    <td>{event.name}</td>
                    <td>{event.description}</td>
                    <td>{event.place}</td>
                    <td>{event.Date}, {event.Time}</td>
                    <td className="btn">
                      <i 
                        className="fas fa-trash text-danger"
                        onClick={() => deleteEvent(event.id)}
                      ></i>
                    </td>
                    <td className="btn">
                      <i 
                        className="fas fa-edit text-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          setSelectedEvent(event);
                          setForEdit(true)
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
        <FormModal 
          taskID={5} 
          addEvent={addEvent} 
          editEvent={editEvent}
          event={selectedEvent}
          forEdit={forEdit}
          setEditFalse={() => setForEdit(false)}
          refreshApp={props.refreshApp}
        />
    </>
  );
}

export default Events;