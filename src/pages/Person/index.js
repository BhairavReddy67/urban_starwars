import React from 'react';
import { useParams } from 'react-router';
import axios from "axios"
import './index.css';
import NotFound from '../NotFound';
function Person() {

  //get params from Link
  const {id}=useParams()
  console.log(id)
  const [data,setData]=React.useState({})
  const [isError,setError]=React.useState(false)

  //fecting person from particular API help of ID
  React.useEffect(() => {
    axios(`https://swapi.dev/api/people/${id}`)
    .then(res=>setData(res.data))
    .catch((e)=>setError(true));
  }, [])
  

  console.log(data)
  return (!isError?
    <div className="person">
      <h1>Nmae: {data.name}</h1>
      <p> Gender: {data.gender}</p>
      <p>Data Of Birth: {data.birth_year}</p>
      <p>Height: {data.height}</p>
      <p>Eye Color: {data.eye_color}</p>
      <p>Mass: {data.mass}</p>

      <hr/>
    </div>:<NotFound/>
  );
}

export default Person;
