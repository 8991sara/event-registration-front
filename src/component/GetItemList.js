// import React, { useEffect, useState } from "react";
// import Col from 'react-bootstrap/Col';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';


//  function GetItemList(userDetails = [{}]){

//   const [date, setDate] = useState(new Date());
//   const [load, setLoad] = useState(true);
//   const [data, setData] = useState([])
//     console.log(userDetails)
//     userDetails.forEach(item => {
//         item.name =  ' Test Name' + item.name
//         })
        
// //   return (
// //     <div>
// //       <h1 style={{ fontSize: 14 , color: "black" }}>{props.date}</h1>
// //     </div>
// //   );








// return(
//     <Container fluid  style={{padding: '10px 10px 10px 10px'}} >
//       <Row>
//     <ul>
//     <Col  >
//     <div cla>
//           {/* <h1 style={{ fontSize: 14 , color: "black" }}>{props.date}</h1> */}

//     </div>

//     </Col>
//     <h1 style={{ fontSize: 14 , color: "black" }}></h1>
//     {/* {props.dataa.map(home => <div>{home.name}</div>)} */}
//     </ul>
//     </Row>
//     </Container>
//     )






// };

// export default GetItemList;




import React from 'react'
//import { View, Text } from 'react-native';
export default function GetItemList({
userDetails = [{}]
}) {
    userDetails.forEach(item => 
        { item.summery_event =   item.summery_event}
        )
    return (
        <p>
        <p>Child 1</p>
        {
        userDetails.map(item => {
        return (
        <p>
        <p>{item.summery_event}</p>
        </p>
        )
        })
        }
        </p>
        )
        }
        