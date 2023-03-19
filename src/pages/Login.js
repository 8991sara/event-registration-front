import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axiosBaseURL from '../httpCommon';
import jwt_decode from "jwt-decode";
import Home from "./Home";
import toast, { Toaster } from 'react-hot-toast';




function App() {
  const [justifyActive, setJustifyActive] = useState('tab1');
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState(null)
  const notify = () => toast('Here is your toast.');
  const handleCloseToast = () => setShowToast(false);
  const handleShowToast = () => setShowToast(true);
  const [showToast, setShowToast] = useState(false);


    if (localStorage.getItem('access-token') !== null) {
        const accessToken = JSON.parse(localStorage.getItem('access-token'));
        //console.log(`token is ${accessToken}`);
        //console.log(`token is avalible`);
      
        try {
          if (jwt_decode(accessToken).exp < Date.now() / 1000) {
            //console.log(`token is expired`);
            //return <Login />;
            localStorage.clear();
          }else{
            //console.log('token is valid');
            return <Home />;
            //localStorage.clear();
          } 
          } catch (e) {
            //window.location = "/login";
            localStorage.clear();
            console.log(e)
          }
          
      
        
      } else {
        console.log(`token not found`);
      }


  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    ///alert(`The name you entered was: ${email} and ${pass}`);
    axiosBaseURL.post('api/token/', {
        email: `${email}`,
        password: `${pass}`,
    })
    .then(response => {
        if (response.status === 200) {
        //console.log(response.status)
        localStorage.setItem('access-token', JSON.stringify(response.data.access));
        localStorage.setItem('refresh-token', JSON.stringify(response.data.refresh));
        const notify = () => toast.success("successfully login !",{
          style: {
            borderRadius: '10px',
            minWidth: '500px',
        },
        duration: 5000

        });
        notify()
        window.location = "/";
        }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("error.response.data -- > ",error.response.data);
        console.log("error.response.status -- > ",error.response.status);
        console.log("error.response.headers -- > ",error.response.headers);
        if(error.response.data.detail){
          const notify = () => toast.error(error.response.data.detail,{
            style: {
              borderRadius: '10px',

              minWidth: '500px',
          },
          duration: 5000
  
          });
          notify()
        }
        }else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        const notify = () => toast("somting wrong...\n\n please try again or call with admin site",{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',      
            minWidth: '500px',
        },

        });
        notify()
        
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        const notify = () => toast("somting wrong...\n\n please try again or call with admin site",{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',      
            minWidth: '500px',
        },

        });
        notify()
      }
      console.log(error.config);

    });
    
  }



  const handleSignup = (event) => {
    event.preventDefault();
    //alert(`The name you entered was: ${email} and ${pass} and ${name} and ${lastname}`);
    axiosBaseURL.post('api/auth/users/', {
        email: `${email}`,
        password: `${pass}`,
        first_name: `${name}`,
        last_name: `${lastname}`
    })
    .then(response => {
      if (response.status === 201) {
        const notify = () => toast.success("your account created  ",{
          style: {
            borderRadius: '10px',
            minWidth: '500px',
        },
        duration: 5000

        });
        notify()
        handleJustifyClick('tab1')

      }
      

    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log("error.response.data -- > ",error.response.data);
        // console.log("error.response.status -- > ",error.response.status);
        // console.log("error.response.headers -- > ",error.response.headers);
        if(error.response.data.email){
          const notify = () => toast.error(error.response.data.email,{
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff', 
              minWidth: '500px',
          },
          duration: 5000
  
          });
          notify()
        }else if(error.response.data.password){
        const notify = () => toast(error.response.data.password,{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',      
            minWidth: '500px',
        },

        });
        notify()}
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        const notify = () => toast("somting wrong...\n\n please try again or call with admin site",{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',      
            minWidth: '500px',
        },

        });
        notify()
        
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        const notify = () => toast("somting wrong...\n\n please try again or call with admin site",{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',      
            minWidth: '500px',
        },

        });
        notify()
      }
      console.log(error.config);
      // const notify = () => toast("somting wrong...\n\n please try again or call with admin site",{
      //   style: {
      //     borderRadius: '10px',
      //     background: '#333',
      //     color: '#fff',      
      //     minWidth: '500px',
      // },

      // });
      // notify()
    });
    
  }



  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-75">
      <Toaster />
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink  style={{backgroundColor:"#3D444C" , color:'white'}} onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink  style={{backgroundColor:"#3D444C" , color:'white'}} onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>

        <MDBTabsPane  show={justifyActive === 'tab1'}>

          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="lg"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
          <form onSubmit={handleSubmit}>
            <MDBInput   wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={pass} onChange={(e) => setPass(e.target.value)}/>

            <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn type="submit"  className="mb-4 w-100" style={{backgroundColor:"#3D444C"}} >Sign in</MDBBtn>
          </form>
          <p className="text-center">Not a member? <a href="#!">Register</a></p>

        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === 'tab2'}>

          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="lg"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="lg"/>
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
          <form onSubmit={handleSignup}>
          <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='LastName' id='form1' type='text' value={lastname} onChange={(e) => setLastname(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' value={pass} onChange={(e) => setPass(e.target.value)}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" style={{backgroundColor:"#3D444C"}}>Sign up</MDBBtn>
          </form>

        </MDBTabsPane>

      </MDBTabsContent>

    </MDBContainer>
  );
}

export default App;