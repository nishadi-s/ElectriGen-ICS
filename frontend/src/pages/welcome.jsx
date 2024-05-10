import React from "react";

const Welcome = () => {
  return (
    <div>
      <nav
        className="navbar navbar-light bg-light"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <a className="navbar-brand" href="#">
          <img
            src="header.png"
            alt="Header"
            style={{ width: "100px", height: "auto" }}
          />
        </a>
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={() => (window.location.href = "/new-login")}
        >
          Login
        </button>
      </nav>

      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="17870.jpg" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="26235.jpg" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="..." alt="Third slide" />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
};

export default Welcome;
