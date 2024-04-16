import React from "react";
import bg001 from "../pages/img/bg001.jpg";
import logo1 from "../pages/img/logo1.png";

const Home = () => {
  return (
      <div className="container-fluid" style={{ backgroundImage: `url(${bg001})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: "absolute", top: 80 }}>
            <img src={logo1}  className="logo" width="220" height="42" alt="Company Logo"></img>
        </div>
        <div className="row justify-content-center">
          <div className="col-3">
            <div class="card" style={{ width: "18rem", background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)", }}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Supplier Management</h5>
                
                <a href="#" class="btn btn-primary">
                  Start
                </a>
              </div>
            </div>
          </div>
          {/* Repeat this card block for the remaining cards */}
          {/* Card 2 */}
          <div className="col-3">
            <div class="card" style={{ width: "18rem" ,  background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)" ,
              marginBottom: "20px", }}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Production Management</h5>
                
                <a href="#" class="btn btn-primary">
                  Start
                </a>
              </div>
            </div>
          </div>
          {/* Repeat this card block for the remaining cards */}
          {/* Card 3 */}

          <div className="col-3">
            <div class="card" style={{ width: "18rem",  background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)", }}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Distributor Management</h5>
                
                <a href="#" class="btn btn-primary">
                  Start
                </a>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-3">
            <div class="card" style={{ width: "18rem" ,  background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",}}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Expot Managemant</h5>
                
                <a href="/SalesDashboard" class="btn btn-primary">
                  Start
                </a>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="col-3">
            <div class="card" style={{ width: "18rem",  background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)", }}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Employee Salary Management</h5>
                
                <a href="#" class="btn btn-primary">
                  Start
                </a>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="col-3">
            <div class="card" style={{ width: "18rem",  background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",
              margin: "10 0px", }}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Donation Project Management</h5>
                
                <a href="#" class="btn btn-primary">
                  Start
                </a>
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div className="col-3">
            <div class="card" style={{ width: "18rem" ,  background: "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(10px)",}}>
              <img src="..." class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Showroom Sales Managemant</h5>
                
                <a href="#" class="btn btn-primary">
                  Start
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
  );
};

export default Home;
