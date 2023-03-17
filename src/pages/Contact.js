import React, { useRef } from "react";
import emailjs from 'emailjs-com';




  const Contact = () => {
    const form = useRef();
    
    const [formStatus, setFormStatus] = React.useState('Send')




    const sendEmail = (e) => {
      e.preventDefault();
      console.log(form)

      emailjs.sendForm('service_3oe1jtd', 'template_7jto17m', form.current, 'Cxm_8ytwILPferSdb')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };











    return (
      <div className="container mt-5">
        <h2 className="mb-3">React Contact Form Component Example</h2>
        <form ref={form}  onSubmit={sendEmail}>
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
  