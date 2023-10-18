import React, { useState, useEffect } from "react";
import MiniNavbar from "../components/MiniNavbar";
import { db } from "../firebase/config";
import { collection, doc, deleteDoc } from "firebase/firestore";
import "../About.css";

function Messages(props) {
  const [messages, setMessages] = useState(props.messages);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setMessages(props.messages);
  }, [props.messages]);

  // DELETE A MESSAGE
  const deleteMessage = async (messageId) => {
    try {
      // Delete the message from Firebase Firestore
      await deleteDoc(doc(db, "messages", messageId));
      // Update the messages state by removing the deleted message
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message.id !== messageId)
      );
      alert("Message deleted");
      props.refreshApp()
    } catch (error) {
      console.error(`COULD NOT DELETE SERVICE: ${error.message}`);
      alert(`COULD NOT DELETE SERVICE: ${error.message}`);
    }
  };

  return (
    <>
      <MiniNavbar location="Dashboard/Messages" location_url="/dashboard/messages" />
      <section id="team">
        <div className="container-lg py-5">
          <div className="d-flex justify-content-between flex-wrap mb-5">
            <h3 className="blue-text">Complete List of All Messages</h3>
          </div>
          {props.messages.length === 0 ? (
            <p className="fst-italic lead mb-4 text-center">
              No Message Has Been Registered
            </p>
          ) : (
            <div className="table-responsive table-responsive-sm table-responsive-md">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col" className="text-wrap">Title</th>
                    <th scope="col" className="text-wrap">Name</th>
                    <th scope="col" className="text-wrap">Email</th>
                    <th scope="col" className="text-wrap">Tel</th>
                    <th scope="col" className="">Message</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {props.messages.map((message, index) => (
                    <tr key={message.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{message.title}</td>
                      <td>{message.name}</td>
                      <td>{message.email}</td>
                      <td>{message.phone}</td>
                      <td>{message.message}</td>
                      <td className="btn">
                        <i 
                          className="fas fa-trash text-danger"
                          onClick={() => deleteMessage(message.id)}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Messages;