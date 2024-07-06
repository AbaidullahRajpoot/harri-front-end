import React from "react";

const TextArea = () => {
  return (
    <section className="about__text pt-115 pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-10  mb-20 ">
            <p className="text-center">At Zoel IT, we pride ourselves on being your trusted partner in the ever-evolving world of Information Technology.
              As an authorized online reseller of top-tier IT equipment and software brands, including industry giants like Cisco, HP, Dell,
              Juniper, Samsung, ViewSonic, VMware, Palo Alto, Microsoft, Adobe, and more, we bring you the best-in-className solutions to meet your business needs.</p>
            <p className="text-center">Our journey as a family-owned business began six years ago, driven by a passion for providing high-quality IT solutions to businesses of all sizes.
              Over the years, we have established ourselves as a reliable and customer-centric online destination for all your IT needs. Our commitment to excellence,
              coupled with our in-depth knowledge and understanding of the IT landscape, sets us apart as a leading authority in the industry.</p>
          </div>
        </div>
        {/* <div className="row mt-20">
          <div className="col-xl-4 col-lg-4">
            <div
              className="about__text-wrapper wow fadeInUp"
              data-wow-delay=".3s"
              data-wow-duration="1s"
            >
              <h3 className="about__text-title">
                It started with a <br /> bang now we are here.
              </h3>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div
              className="about__text wow fadeInUp"
              data-wow-delay=".6s"
              data-wow-duration="1s"
            >
              <p>
                Ut at maximus magna. Vestibulum interdum sapien in facilisis
                imperdiet. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Proin ac placerat
                risus. Nullam eget tortor felis. Nulla facilisi.Vestibulum
                mattis diam non luctus elementum. Cras sollicitudin, nisi in
                semper viverra, felis diam consequat mi, quis tincidunt ligula
              </p>

              <p>
                Nam nibh diam, varius quis lectus eget, laoreet cursus metus.
                morbi augue lectus, dapibus eget justo nec, consectetur auctor
                nis luctus neque.!
              </p>
            </div>
          </div>
        </div> */}
        <div className="row">
          <div className="col-xl-3 col-lg-3">
            <div className="about__text-wrapper wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
              <h1 style={{ color: "var(--tp-theme-1)" }}>Zoel-IT</h1><h2><em>IT For Life</em></h2>
            </div>
            <p>Whether you're a business looking for robust IT solutions or an individual seeking the latest technology, Zoel IT is here to redefine your IT experience.
              Our physical store and office in Pakistan have been a testament to our commitment, and now, we extend that commitment to the UK and Germany as we embark on this exciting new chapter.
              Join us on this journey, and let Zoel IT be your partner in shaping a future powered by technology.
            </p>
          </div>
          <div className="col-xl-9 col-lg-9">
            <div className="about__text wow fadeInUp" data-wow-delay=".6s" data-wow-duration="1s">
              <h3>What sets ZoelIT Apart?</h3>
              <h5>Authorized Reseller</h5>
              <p>As an authorized reseller of renowned IT brands, we ensure that our customers receive genuine and top-notch products. Our partnerships with industry leaders enable us to bring you the latest and most innovative technologies.</p>
              <h5>Extensive Product Range</h5><p>Explore a vast array of IT equipment and software, carefully curated to cater to the diverse requirements of businesses.
                Whether you need networking solutions, servers, laptops, software licenses, or any other IT essentials, Zoel IT is your one-stop destination.</p>
              <h5>Family-Owned Tradition</h5>
              <p>We take pride in our family-owned heritage, and it reflects in our personalized approach to customer service.
                At Zoel IT, you're not just a customer – you're part of our extended family. Your success is our success, and we are dedicated to ensuring your satisfaction.
              </p>
              <h5>Global Expansion</h5>
              <p>Zoel IT is excited to announce its foray into the UK and Germany markets.
                While we have been a trusted name in Pakistan, our online presence now extends to bring our top-notch products and services to the European market.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextArea;
