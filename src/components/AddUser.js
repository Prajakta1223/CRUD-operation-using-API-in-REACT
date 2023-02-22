import React, { useState ,useEffect} from "react";
import axios from 'axios';
import "./style.css";
import { Form, FormGroup, Input, Button ,Table } from "reactstrap";


const AddUser = () => {
let[myData,setMyData]=useState([]);
let[inputdata,setInputdata]=useState({})
const[index,setindex]=useState();
const[isUpdate,setisUpdate]=useState(false);
//const[id,setId]=useState();

// for change the text in input field
 const changeHandler=(e)=>
 {
    setInputdata({
        ...inputdata,
        [e.target.name]:e.target.value,
        //id:new Date().getTime.toString()
    })  
 }  
 
 //Add the User
 const btnHandler=(e)=>
 {
      //  let obj=new Object();
      var obj = Object.create(null);
       obj.name=document.getElementById('name').value;
       obj.email=document.getElementById('email').value;
       obj.mobile_number=document.getElementById('number').value;
       obj.Status=document.getElementById('selected-status').value;
       obj.user_type=document.getElementById('selected-user').value;
       console.log(obj);
      
       axios({
        method:"post",
        url:'http://localhost:3000/users/addUser',
        data:obj,
      })
      .then(function(response){
        console.log(response.data);
        
      })
      .catch(function(err){
          console.log(err);
      })
      
    window.location.reload(false);
     
}
// edit the user
 const EditHandler=(ind)=>{
  axios.get(`http://localhost:3000/users/oneUserRecord/${ind}`)
  .then(function (response) {
  
      console.log(response);
      document.getElementById('name').value=response.data.name;
       document.getElementById('email').value=response.data.email;
       document.getElementById('number').value=response.data.mobile_number;
       document.getElementById('selected-status').value=response.data.Status;
       document.getElementById('selected-user').value=response.data.user_type;
       setisUpdate(true);
       setindex(ind);

  })
  .catch(function (error)
   {
    console.log(error);
  })
 
 }

 //update the user
  const newUpdateUser=()=>
  {
    //alert(index);
    var obj = Object.create(null);
    obj.name=document.getElementById('name').value;
    obj.email=document.getElementById('email').value;
    obj.mobile_number=document.getElementById('number').value;
    obj.Status=document.getElementById('selected-status').value;
    obj.user_type=document.getElementById('selected-user').value;
    console.log(obj);
    
     axios({
      method:"patch",
      url:(`http://localhost:3000/users/update/`+index),
      data:obj,
    })
    .then(function(response){
      displayAlluser();
      alert("User Updated Successfully....!");
      
    })
    .catch(function(err){
        console.log(err);
    })

    window.location.reload(false);


  }

// display All Users
  const displayAlluser=()=>{
    axios.get("http://localhost:3000/users/display")
    .then((res)=>{
       setMyData(res.data);
       console.log(res.data);
    })
  }

 useEffect(()=>
  {
     displayAlluser();
},[]);

//for delete the user
const deleteHandler=(ind)=>
 {
    alert("Are you want to delete User Record..!");
    axios({
        method:"delete",
        url:(`http://localhost:3000/users/delete/${ind}`)
      })
      .then(function(response)
      {
        displayAlluser();
     })
      .catch(function(err){
          console.log(err);
      })
 }

  //-----------------------------------------------------------------------------------------

  return (
    <Form className="form" id="frm">
            <div className="centre"> 
                <FormGroup>
                    <Input type="text" placeholder="UserName" value={inputdata.username} name="username" id="name" onChange={changeHandler} required></Input>
                </FormGroup> 
                <FormGroup> <Input type="text" placeholder="Email" name="email" value={inputdata.email}  id="email" onChange={changeHandler} required ></Input></FormGroup> {' '}
                <FormGroup> <Input type="text" placeholder="Mobile Number" name="mobileno" value={inputdata.mobileno}required id="number"onChange={changeHandler} ></Input></FormGroup> 
                <FormGroup> <Input type="select" name="select_status" value={inputdata.select_status}  id="selected-status" required onChange={changeHandler} >
                    <option>Status</option>
                    <option>Active</option>
                    <option>InActive</option>
                </Input></FormGroup>
            </div>

                   
                    <FormGroup> 
                        <Input type="select" name="select_user" required id="selected-user" value={inputdata.select_user} onChange={changeHandler} >
                            <option>Usertype</option>
                            <option>Admin</option>
                            <option>Staff</option>
                        </Input>
                    </FormGroup>
                    
                    <Button  onClick={!isUpdate?btnHandler:newUpdateUser} className="btn"  id="btn">{!isUpdate ? 'Add User':'Update User'}</Button>
                    <div style={{ borderTop: "1px solid black ", marginLeft: '20px', marginRight: '20px' ,marginTop: '20px'}}></div>
                    <Table  className="table table-striped">
                    <thead>
                    <tr>
                    <th>Sr No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>MobileNo</th>
                    <th>Status</th>
                    <th>Usertype</th>
                    <th>Action</th>
                    </tr>
                    </thead>
                     {myData.map((info,ind)=>{
                              return(
                                  <>
                                  <tbody>
                                      <tr key={ind} >
                                        <td>{ind+1}</td>
                                        <td>{info.name}</td>
                                        <td>{info.email}</td>
                                        <td>{info.mobile_number}</td>
                                         <td>{info.Status}</td>
                                         <td>{info.user_type}</td>
                                         <td><button type="button" onClick={()=>EditHandler(info._id)}className="btn btn-success">Edit</button> | < button type="button" className="btn btn-danger" onClick={()=>deleteHandler(info._id)}>Delete</button></td>
                                        </tr> 
                                       </tbody>
                                       </>
                                    )
                                 }
                                )
                               
                         } 
            </Table>

      </Form> 
      
);
}

export default AddUser;
