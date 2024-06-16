/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React,{ useState, useEffect} from 'react';
import { useParams } from'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const {id} = useParams();
     
       async function fetchUser(){
         const response = await axios.get(`http://localhost:5000/student/${id}`)
         
            if(response){
                console.log(response)
                setData(response.data.student.name)}
            }
       fetchUser();
        
    
  return (
    <div> Dashboard | {data}</div>
    )
  }

export default Dashboard