import React from "react";
import "./footer.css";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { ImWhatsapp } from "react-icons/im";

export default function Footer() {
  return (
    <footer className="footerStyle text-black py-4">
      <div className="container">
        <nav className="row">
          <p className="col-12 col-lg-3 text-reset text-uppercase d-flex justify-content-center justify-content-lg-start">
            CLAIRE
          </p>
          <ul className="col-lg-9 col-sm-12 list-unstyled d-flex justify-content-center justify-content-lg-end">
            <li className="font-weight-bold text-uppercase"></li>
            <li className="d-flex justify-content-between">
              <p href="https://www.facebook.com/" className="fs-5 m-2">
                <u>
                  <BsFacebook />
                  /CLAIRE
                </u>
              </p>
              <p href="https://www.instagram.com/" className="fs-5 m-2">
                <u>
                  <BsInstagram />
                  /CLAIRE
                </u>
              </p>
              <p href="https://web.whatsapp.com/" className="fs-5 m-2">
                <u>
                  <ImWhatsapp />
                  099741112
                </u>
              </p>
            </li>
          </ul>
          <hr className="lineaHr" />
          <p className="text-center fs-5">
            &copy; 2022 All Rights Reserved &reg; Claire & Co.
          </p>
        </nav>
      </div>
    </footer>
  );
}
