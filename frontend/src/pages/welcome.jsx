import React from "react";

const Welcome = () => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Index - Arsha Bootstrap Template</title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />

        {/* Favicons */}
        <link rel="icon" href="assets/img/favicon.png" />
        <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png" />

        {/* Fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        {/* Vendor CSS Files */}
        <link
          href="assets/vendor/bootstrap/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
          rel="stylesheet"
        />
        <link href="assets/vendor/aos/aos.css" rel="stylesheet" />
        <link
          href="assets/vendor/glightbox/css/glightbox.min.css"
          rel="stylesheet"
        />
        <link
          href="assets/vendor/swiper/swiper-bundle.min.css"
          rel="stylesheet"
        />

        {/* Main CSS File */}
        <link href="assets/css/main.css" rel="stylesheet" />

        {/* Template Information */}
        {/* ======================================================= */}
        {/* * Template Name: Arsha */}
        {/* * Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/ */}
        {/* * Updated: May 04 2024 with Bootstrap v5.3.3 */}
        {/* * Author: BootstrapMade.com */}
        {/* * License: https://bootstrapmade.com/license/ */}
        {/* ======================================================== */}
      </head>

      <body className="index-page">
        <header
          id="header"
          className="header d-flex align-items-center fixed-top"
        >
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <a
              href="index.html"
              className="logo d-flex align-items-center me-auto"
            >
              <h1 className="sitename">Arsha</h1>
            </a>
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <a href="index.html#hero" className="">
                    Home
                  </a>
                </li>
                <li>
                  <a href="index.html#about">About</a>
                </li>
                <li>
                  <a href="index.html#services">Services</a>
                </li>
                <li>
                  <a href="index.html#portfolio">Portfolio</a>
                </li>
                <li>
                  <a href="index.html#team">Team</a>
                </li>
                <li>
                  <a href="index.html#pricing">Pricing</a>
                </li>
                <li className="dropdown">
                  <a href="#">
                    <span>Dropdown</span>
                    <i className="bi bi-chevron-down toggle-dropdown"></i>
                  </a>
                  <ul>
                    <li>
                      <a href="#">Dropdown 1</a>
                    </li>
                    <li className="dropdown">
                      <a href="#">
                        <span>Deep Dropdown</span>
                        <i className="bi bi-chevron-down toggle-dropdown"></i>
                      </a>
                      <ul>
                        <li>
                          <a href="#">Deep Dropdown 1</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 2</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 3</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 4</a>
                        </li>
                        <li>
                          <a href="#">Deep Dropdown 5</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">Dropdown 2</a>
                    </li>
                    <li>
                      <a href="#">Dropdown 3</a>
                    </li>
                    <li>
                      <a href="#">Dropdown 4</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="index.html#contact">Contact</a>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>
            <a className="btn-getstarted" href="index.html#about">
              Get Started
            </a>
          </div>
        </header>

        <main className="main">
          <section id="hero" className="hero section">
            <div className="container">
              <div className="row gy-4">
                <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                  <h1 className="">Better Solutions For Your Business</h1>
                  <p className="">
                    We are team of talented designers making websites with
                    Bootstrap
                  </p>
                  <div className="d-flex">
                    <a href="#about" className="btn-get-started">
                      Get Started
                    </a>
                    <a
                      href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                      className="glightbox btn-watch-video d-flex align-items-center"
                    >
                      <i className="bi bi-play-circle"></i>
                      <span>Watch Video</span>
                    </a>
                  </div>
                </div>
                <div className="col-lg-6 order-1 order-lg-2 hero-img">
                  <img
                    src="assets/img/hero-img.png"
                    className="img-fluid animated"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </section>

          {/* More sections go here */}

          <footer id="footer" className="footer">
            {/* Footer content goes here */}
          </footer>
        </main>

        <a
          href="#"
          id="scroll-top"
          className="scroll-top d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-arrow-up-short"></i>
        </a>

        <div id="preloader"></div>

        {/* Vendor JS Files */}
        <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="assets/vendor/php-email-form/validate.js"></script>
        <script src="assets/vendor/aos/aos.js"></script>
        <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
        <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
        <script src="assets/vendor/waypoints/noframework.waypoints.js"></script>
        <script src="assets/vendor/imagesloaded/imagesloaded.pkgd.min.js"></script>
        <script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>

        {/* Main JS File */}
        <script src="assets/js/main.js"></script>
      </body>
    </html>
  );
};

export default Welcome;
