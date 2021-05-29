import React from 'react';
import logo from './star-wars-logo.png';
import './index.css';
import axios from "axios"
import Search from "@material-ui/icons/Search"
import Close from "@material-ui/icons/Close"
import Loader from "react-loader-spinner"
import IconButton from "@material-ui/core/IconButton"
import Person from '../Person';
import NotFound from '../NotFound';


function HomePage() {
  const [data,setData]=React.useState([])
  const [search_for,setSearch_for]=React.useState("")
  const [isLoading,setLoading]=React.useState(false)
  const [process,setProcess]=React.useState(false)


  // Taking Input
  const handleChange=(e)=>{
    setSearch_for(e.target.value)
  }


  //Here Fecthing Data and storing matched results in data 
  const handlePress=(e)=>{
    if(e.key=="Enter"||e.target.value==undefined){
      setLoading(true)
      axios("https://swapi.dev/api/people")
      .then(res=>res.data)
      .then(res=>{
        let fetch_data=res.results

        // Filtering the data
        var arr=fetch_data.filter((e)=>{
          var name=e.name;
          if(name.toUpperCase().indexOf(search_for.toUpperCase())>-1){
            return e.name
          }
        });
        setData(arr)
        setProcess(true)
      })
      .finally(()=>setLoading(false))
    }
  }


  // Clearing input Feild
  const handleClose=(e)=>{
    setSearch_for("")
  }


  return (
    <div>
      <div className="logo">
        <img src={logo} alt="Star Wars Logo" />
      </div>
       <div className="search-input">

         {/* Input Feild */}
        <input value={search_for}  placeholder="Search by name" 
        onKeyPress={handlePress} onChange={handleChange} />

        {/* Loading Indicator  and Search Icon */}
        {isLoading?
          <Loader type="Oval" color="yellow" height={20} width={20} className={"search_icon Loader"} />
          :<IconButton  className="search_icon"><Search className="search" value="search" onClick={handlePress}/></IconButton>}
        
        {/* Clearing Input Feild */}
        {search_for &&<IconButton className="cross_icon" > 
          <Close className="cross" onClick={handleClose}/>
          </IconButton>}

          {/* Passing data to Person Component */}
          {(data.length==0 && process)?<NotFound/>:
            data.map(e=><Person name={e.name} birth={e.birth_year} gender={e.gender}/>)}
      </div>
    </div>
  );
}

export default HomePage;
 