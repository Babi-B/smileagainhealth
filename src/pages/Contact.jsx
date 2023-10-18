import React, { useEffect, useState } from "react";
import MiniNavbar from "../components/MiniNavbar";
import "../Contact.css"
import Timetable from "../components/Timetable";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

function Contact() {
    const [messages, setMessages] = useState("");
    const [name, setName] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    const messageCollectionRef = collection(db, "messages")

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

    
      // ADD A MESSAGE
    const addMessage = async () => {
        try {
            const docRef = await addDoc(messageCollectionRef, {
                title, 
                name, 
                email, 
                phone, 
                message,
            })
            
            const newMessage = {
            title, 
            name, 
            email, 
            phone, 
            message,
            id: docRef.id, 
            };

        setMessage([...messages, newMessage]);
        console.log("MESSAGE ADDED")
        } catch (error) {
        console.error(`COULD NOT ADD MESSAGE. Error Message: ${error}`);
        }
    };

    return (
        <>
            <MiniNavbar location="Contact" location_url="/contact" />
            {/* <!-- Contact Section --> */}
            <section id="contact" className="bg-gray">
                <div className="container-lg p-5 ">
                    <div className="row justify-content-center text-center">
                        <div className="col-sm-8 col-md-4 col-lg-4 contact-ite d-flex flex-column py-2 justify-content-center bg-white mb-3">
                            <h5 className="blue-text mb-3">Our Location</h5>
                            <div>
                                <i className="fas fa-map-marker-alt me-2 filter-green"></i>
                                <p className="text-muted d-inline">Newtown, Limbe, Southwest Region, Cameroon</p>
                            </div>
                        </div>&nbsp;
                        <div className="col-sm-8 col-md-4 col-lg-4 contact-item d-flex flex-column py-2 justify-content-center bg-white mb-3">
                            <h5 className="blue-text mb-3 ">Contact Info</h5>
                            <div className="mb-2">
                                <i className="fas fa-phone me-2 filter-green"></i>
                                <p className="text-muted d-inline">+237-620-777-290</p>
                            </div>
                            <div className="mb-2">
                            <a href="https://wa.me/+237671752479" className="me-4 text-reset text-decoration-none" target="_blank"><i className="fab fa-whatsapp me-2 filter-green filter-green"></i>
                                <p className="text-muted d-inline">+237-671-752-479</p>
                            </a>
                            </div>
                            <div className="">
                                <i className="fas fa-envelope me-2 filter-green"></i>
                                <p className="text-muted d-inline">sacfu@gmail.com</p>
                            </div>
                        </div>&nbsp;
                        <div className="col-sm-8 col-md-4 col-lg-4 contact-item d-flex flex-column py-2 justify-content-center bg-white mb-3">
                            <h5 className="blue-text mb-3">Working Time</h5>
                            <div>
                                <i className="fas fa-solid fa-clock me-2 filter-green"></i>
                                <p className="text-muted d-inline">24/7 Daily</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- SOCIAL LINKS --> */}
            <div className="container-lg my-5">
                <h3 className="blue-text ">Stay Connected</h3>
                <div className="custom-hr mb-5"></div>
                {/* <!-- the icons --> */}
                <div className="text-center">
                <a href="" target="_blank" className="me-4 text-reset">
                    <i className="fab fa-facebook fs-1 filter-green"></i>
                </a>
                <a href="https://www.instagram.com/smileagain_cameroon?igshid=ZGUzMzM3NWJiOQ" target="_blank" className="me-4 text-reset">
                    <i className="fab fa-instagram fs-1 filter-green"></i>
                </a>
                <a href="https://wa.me/+237671752479" className="me-4 text-reset" target="_blank">
                    <i className="fab fa-whatsapp fs-1 filter-green"></i>
                </a>
                </div>
            </div>

            <Timetable />

            {/* <!-- Leave A Message --> */}
    <section id="contact-form">
        <div className="container-lg py-5">
            <h3 className="blue-text ">Leave A Message</h3>
            <div className="custom-hr mb-5"></div>
            <p className="mb-5">Thank you for visiting our site! We value your involvement and feedback. Whether you're interested in volunteering, seeking online consultations, or have any suggestions, we're here for you. Together, let's make a difference in healthcare.</p>
            <div className="row justify-content-center">
                <div className="col-8">
                <div className="form-group">
                        <label htmlFor="title" className="d-none">Message Title</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="title" 
                            placeholder="Your message title*" 
                            onChange={(e) => {
                                setTitle(e.target.value);
                              }}
                            required />
                      </div>
                    <div className="form-group">
                        <label htmlFor="name" className="d-none">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            placeholder="Your name*" 
                            onChange={(e) => {
                                setName(e.target.value);
                              }}
                            required />
                      </div>
                    <div className="form-group mt-3">
                      <label htmlFor="email" className="d-none">Email address</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="Your email*" 
                        onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        required />
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="email" className="d-none">Phone number</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="phone" 
                        placeholder="Your phone number" 
                        onChange={(e) => {
                            setPhone(e.target.value);
                          }}
                        required/>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="msge" className="d-none">Message</label>
                      <textarea 
                        className="form-control"
                         id="msge" 
                         rows="3" 
                         placeholder="Message*"
                         onChange={(e) => {
                            setMessage(e.target.value);
                          }}
                        required></textarea>
                    </div>
                    <button 
                        className="btn btn-info mt-3 text-white w-100"
                        onClick={addMessage}
                        >SEND 
                        <i className="fas fa-paper-plane ms-2"></i>
                        </button>
                  </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default Contact