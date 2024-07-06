import React from "react";
// internal
import { Play } from "@svg/index";
import faq_bg from "@assets/img/faq/faq-img.jpg";
import SingleFaq from "@components/faq/single-faq";
import VideoModal from "@components/common/modals/modal-video";
import useModal from "@hooks/use-modal";

const faq_items = [
  {
    id: "about-one",
    title: "What makes Zoel IT a reliable choice for IT solutions?",
    show: true,
    desc: "Zoel IT is committed to delivering high-quality IT equipment and software. Our dedication ensures that you receive products meeting the most stringent standards, providing long-term reliability for your business.",
    parent: "faqaccordion",
  },
  {
    id: "about-two",
    title: "How diverse is Zoel IT's product range?",
    desc: "Zoel IT offers a wide array of IT solutions, including networking solutions from industry giants like Cisco, hardware innovations from HP and Dell, software expertise from Microsoft and Adobe, and collaborative displays from ViewSonic.",
    parent: "faqaccordion",
  },
  {
    id: "about-three",
    title: "How does Zoel IT ensure authenticity in its products?",
    desc: "As an authorized online reseller, Zoel IT brings you genuine and certified products from trusted industry names. When you choose Zoel IT, you invest in authentic IT solutions that power your business efficiently.",
    parent: "faqaccordion",
  },
];

const AboutFaqs = () => {
  const { isVideoOpen, setIsVideoOpen } = useModal();
  return (
    <React.Fragment>
      <section className="faq__area p-relative">
        <div
          className="faq__video"
          style={{ backgroundImage: `url(${faq_bg.src})` }}
        >
          <div className="faq__video-btn">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => setIsVideoOpen(true)}
              className="tp-pulse-border popup-video"
            >
              <Play />
            </a>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row justify-content-end">
            <div className="col-xxl-7 col-xl-7 col-lg-7">
              <div className="faq__wrapper-2 faq__gradient-border faq__style-2 tp-accordion pl-160">
                <div className="faq__title-wrapper">
                  <span className="faq__title-pre">
                   Get in touch with us to see how
                  </span>
                  <h3 className="faq__title">
                  `Discover Our Commitment to Excellence
                  </h3>
                </div>
                <div className="accordion" id="faqaccordion">
                  {faq_items.map((item) => (
                    <SingleFaq key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoModal
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"FWrz3bT-YoE"}
      />
      {/* video modal end */}
    </React.Fragment>
  );
};

export default AboutFaqs;
