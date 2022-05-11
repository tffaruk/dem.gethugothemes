/* eslint-disable react/no-unescaped-entities */
import common from "styles/common.module.scss";
import styles from "styles/service.module.scss";
import HubspotForm from "react-hubspot-form";

const ServiceContact = ({ frontmatter }) => {
  const { title, content, form_id, portal_id } = frontmatter.contact;
  return (
    <section
      id="get-a-quote"
      className={`${common.section} pb-5 overflow-hidden`}
    >
      <div className={`${common.container} container`}>
        <div className="row justify-content-center mb-5">
          <div className="col-xl-6 col-lg-10">
            <div className={`col-12 ${common.sectionTitle}`}>
              <div className={`${common.textCenter} text-center mb-5"`}>
                <h2 className={common.title}>{title}</h2>
                <p>{content}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-8 col-lg-10 mx-auto">
            <div
              className={`${common.contactForm} ${styles.serviceContactForm} ps-3 pe-2 px-sm-4 px-lg-5 py-4 py-lg-5 position-relative`}
            >
              <HubspotForm
                portalId={portal_id}
                region="na1"
                formId={form_id}
                loading={<div>Loading...</div>}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContact;
