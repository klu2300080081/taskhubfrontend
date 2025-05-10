import React, { useState } from "react";
import"./home.css";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

function CreateProject() {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    type: "-",
    status: "-",
    review: "-",
    description:"",
    manager:{
        "id":1, 
    "gender":"Male",
    "dob":"06-10-2005",
    "password":"sameer150",
    "company":"Apple",
    "contact":"+9123456",
    "email":"sameer@gmail.com",
    "name":"sameer",
    "username":"sameer150",
    "address":"Vijayawada"
  }
});


  const [msg,setMsg]=useState("")
  const[err,setErr]=useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log(formData.description,formData.type,formData.review,formData.status)
      const response = await axios.post(`${config.url}/admin/createproject`,formData)
      setMsg(response.data)
      setErr("")
      setFormData(
        {
    type: "",
    status: "",
    review: "",
   description:"",
    manager:{
        "id":1, 
    "gender":"Male",
    "dob":"06-10-2005",
    "password":"sameer150",
    "company":"Apple",
    "contact":"+9123456",
    "email":"sameer@gmail.com",
    "name":"sameer",
    "username":"sameer150",
    "address":"Vijayawada"
  }
})
    navigate('/projects')  
    }
    catch(err){
        console.log(err.message)
        setMsg("")
        setErr(err.message)
    }

    
  };

  return (
    <>
    <div className="create-project-container">
      <h2 >Create Project</h2>
      {
            msg?
            <p style={{textAlign: "center",color:"green",fontWeight:"bolder"}}>{msg}</p>:
            <p style={{textAlign: "center",color:"red",fontWeight:"bolder"}}>{err}</p>
      }
      <form onSubmit={handleSubmit}>
        <label>Project Type:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Software">Software</option>
          <option value="Marketing">Marketing</option>
          <option value="Research">Research</option>
        </select>

        <div>
        <label>Project Title:</label>
        <input type="text" />
        </div>

        <div>
        <label>Description:</label>
        <input type = "text" name= "description" value={formData.description} onChange={handleChange}/>
        </div>

       

       <div>
       <label className="date-input">
          Deadline <input type="date"  /> 
        </label>
       </div>


       <div>
       <label>Priority:</label>
        <select name="priority">
          <option value="">Select</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
       </div>

        <button type="submit" >Create</button>
      </form>
    </div>
    </>
  );
}

export default CreateProject;
