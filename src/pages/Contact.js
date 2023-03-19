import React, { useRef } from "react";
import emailjs from 'emailjs-com';




  const Contact = () => {
    const form = useRef();
    
    const [formStatus, setFormStatus] = React.useState('Send')




    const sendEmail = (e) => {
      e.preventDefault();

      const { name, email, message } = e.target.elements
      let conFom = {
        name: name.value,
        email: email.value,
        message: message.value,
      }
      console.log("form ---->",conFom)
      emailjs.send('', '', conFom, '')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };






    return (
      <div className="container mt-5">
        <h2 className="mb-3">Contact Me</h2>
        <form ref={form} id="myForm" onSubmit={sendEmail}>
          <div className="mb-3">
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <input className="form-control" type="text" id="name" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input className="form-control" type="email" id="email" required />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="message">
              Message
            </label>
            <textarea className="form-control" id="message" required />
          </div>
          <button className="btn btn-danger" type="submit">
            {formStatus}
          </button>
        </form>

      </div>
    )
  }
  export default Contact;
  