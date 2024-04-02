import React from "react";

const SalesFeedback = () =>{
    return(
        <div>
            <h1>Sales Feedback</h1>
        
        <div>
            <form>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter Customer name" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Phone</label>
                <input type="tel" className="form-control" id="exampleInputPassword1" placeholder="Enter Customers' phone" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleTextarea" className="form-label">Description</label>
                <textarea className="form-control" id="exampleTextarea" rows="3" placeholder="Enter description"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
    );
};

export default SalesFeedback;
