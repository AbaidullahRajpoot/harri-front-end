import React from "react";
import Link from "next/link";
import Image from "next/image";
// internal
import logo from '@assets/img/logo/logo-black.svg';
import payment from '@assets/img/footer/footer-payment.png';
import SocialLinks from "@components/social";
import CopyrightText from "./copyright-text";

// single widget
function SingleWidget({ col, col_2, col_3, title, contents }) {
  return (
    <div
      className={`col-xxl-${col} col-xl-${col} col-lg-3 col-md-${col_2} col-sm-6"`}
    >
      <div className={`footer__widget mb-50 footer-col-11-${col_3}`}>
        <h3 className="footer__widget-title">{title}</h3>
        <div className="footer__widget-content">
          <ul>
            {contents.map((l, i) => (
              <li key={i}>
                <Link href={`/${l.url}`}>{l.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <>
      <footer>
        <div
          className="footer__area footer__style-4"
          data-bg-color="purple-bg"
        >
          <div className="footer__top">
            <div className="container">
              <div className="row">
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget footer__widget-11 mb-50 footer-col-11-1">
                    <div className="footer__logo">
                      <Link href="/">
                        <Image src={logo} alt="logo" />
                      </Link>
                    </div>

                    <div className="footer__widget-content">
                      <div className="footer__info">
                        <p>
                          The home and elements needed to create beautiful
                          products.
                        </p>
                        <div className="footer__social footer__social-11">
                          <SocialLinks/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <SingleWidget
                  col="2"
                  col_2="4"
                  col_3="2"
                  title="Company"
                  contents={[
                    { url: "about", title: "About us" },
                    { url: "#", title: "Careers" },
                    { url: "#", title: "Store Locations" },
                    { url: "#", title: "Our Blog" },
                    { url: "#", title: "Reviews" },
                  ]}
                />
                <SingleWidget
                  col="3"
                  col_2="3"
                  col_3="3"
                  title="Shop"
                  contents={[ 
                    { url: "shop", title: "Game & Video" },
                    { url: "shop", title: "Phone &Tablets" },
                    { url: "shop", title: "Computers & Laptop" },
                    { url: "shop", title: "Sport Watches" },
                    { url: "shop", title: "Discounts" },
                  ]}
                />
                <SingleWidget
                  col="1"
                  col_2="3"
                  col_3="4"
                  title="Support"
                  contents={[
                    { url: "faq", title: "FAQs" },
                    { url: "policy", title: "Privacy & Policy" },
                    { url: "terms", title: "Terms & Conditions" },
                    { url: "contact", title: "Contact us" },
                  ]}
                />

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-5 col-sm-6">
                  <div className="footer__widget mb-50 footer-col-11-5">
                    <h3 className="footer__widget-title">Talk To Us</h3>

                    <div className="footer__widget-content">
                      <p className="footer__text">
                        Find a location nearest you. See{" "}
                        <a href="#">Our Stores</a>
                      </p>
                      <div className="footer__contact">
                        <div className="footer__contact-call">
                      
                            <p style={{marginBottom:0}}>UK Phone Number</p>
                            <span>+44 749637 9004</span><br></br>
                            <p style={{marginBottom:0}}>UK Landline</p>
                            <span>+44 161 791 5621</span><br></br>
                            <p style={{marginBottom:0}}>Pakistan Phone Number</p>
                            <span>+92 3007404044</span><br></br>
                       
                        </div>
                        <div className="footer__contact-mail">
                        <p style={{marginBottom:0}}>Email</p>
                          <span>
                            <a style={{color:"#fff"}} href="mailto:support@harry.com">
                            info@zoelit.com
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom">
            <div className="container">
              <div className="footer__bottom-inner">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="footer__copyright">
                      <CopyrightText />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="footer__payment text-sm-end">
                      <Image src={payment} alt="payment" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
