import React, {useState} from "react";
import axios from "axios";
import SalesNavbar from "../components/SalesNavbar";

const SalesFeedback = () =>{
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [message, setMessage] = useState("");

    function sendData(e){
        //alert("Feedback successfully submited!");

        const newFeedback ={
            name,
            phone,
            message
        }

        axios.post("http://localhost:4000/sfeedback/addf", newFeedback)
       .then(()=>{
        alert("Feedback successfully submited!");
       })
       .catch((err)=>{
        alert(err);
       })

    }

    return(
        <SalesNavbar>
        <div>
            <h1>Sales Feedback</h1>
        
        <div>
            <form onSubmit={sendData}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Fernando B A P" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="phone" placeholder="07x xxxxxxx" 
                onChange={(e)=>{
                    setPhone(e.target.value);
                }}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea className="form-control" id="description" rows="3" placeholder="Feedback message" 
                onChange={(e)=>{
                    setMessage(e.target.value);
                }}
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    </SalesNavbar>
    );
};

export default SalesFeedback;
