import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal
import shape from "@assets/img/shape/offcanvas-shape-1.png";
import logo from "../../../../public/assets/img/users/user.svg";
import MobileMenus from "./mobile-menus";
import SocialLinks from "@components/social";
import { useSelector } from "react-redux";


const OffCanvas = ({ isOffCanvasOpen, setIsOffCanvasOpen }) => {
  const { user: userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  return (
    <React.Fragment>
      <div
        className={`offcanvas__area offcanvas__area-1 ${isOffCanvasOpen ? "offcanvas-opened" : ""
          }`}
      >
        <div className="offcanvas__wrapper">
          <div className="offcanvas__shape">
            <Image className="offcanvas__shape-1" src={shape} alt="shape" />
          </div>
          <div className="offcanvas__close">
            <button
              onClick={() => setIsOffCanvasOpen(false)}
              className="offcanvas__close-btn offcanvas-close-btn"
            >
              <i className="fa-regular fa-xmark"></i>
            </button>
          </div>
          <div className="offcanvas__content">
            <div className="offcanvas__top mb-40 d-flex justify-content-center align-items-center">
              <div className="offcanvas__logo logo">

                {userInfo?.imageURL ? (
                  <li>
                    <Link href="/user-dashboard">
                      <Image
                        className="Profile"
                        src={userInfo.imageURL}
                        alt="user img"
                        width={35}
                        height={35}
                        style={{
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </Link>
                  </li>
                ) : userInfo?.name ? (
                  <li>
                    <Link href="/user-dashboard">
                      <h2 className="text-uppercase tp-user-login-avater-responsive" >
                        {userInfo.name[0]}
                      </h2>
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link href="/login">
                      <Image className="Profile" src={logo} alt="logo" />
                    </Link>
                  </li>
                )}
              </div>
            </div>
            <div className="mobile-menu-3 fix mb-40 menu-counter mean-container d-lg-none">
              <div className="mean-bar">
                {/* MobileMenus start*/}
                <MobileMenus />
                {/* MobileMenus end*/}
              </div>
            </div>
            {/* <div className="offcanvas__btn">
              <a href="#" className="tp-btn-offcanvas">
                Getting Started <i className="fa-regular fa-chevron-right"></i>
              </a>
            </div> */}
            <div className="offcanvas__social">
              <h3 className="offcanvas__social-title">Follow :</h3>
              <SocialLinks />
            </div>
            <div className="offcanvas__contact">
              <p className="offcanvas__contact-call">
                <a href="tel:+964-742-44-763">+92 3007404044</a>
              </p>
              <p className="offcanvas__contact-mail">
                <a href="mailto:info@harry.com">info@zoelit.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* overlay */}
      <div
        onClick={() => setIsOffCanvasOpen(false)}
        className={`body-overlay ${isOffCanvasOpen ? "opened" : ""}`}
      ></div>
      {/* overlay */}
    </React.Fragment>
  );
};

export default OffCanvas;
