/* eslint-disable react/no-unescaped-entities */
import styles from "styles/service.module.scss";
import common from "styles/common.module.scss";
import Link from "next/link";
const ServicePricing = ({ pricing: { priceing_card, title, button } }) => {
  return (
    <section id="packages" className={`${styles.ghtPricing} ${common.section}`}>
      <div className={` ${common.container} container`}>
        <div className="row justify-content-center text-center">
          <div className="col-xl-6 mb-2">
            <div className={`${common.sectionTitle} `}>
              <div className={`${common.textCenter} text-center`}>
                <h2 className={common.title}>{title}</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {priceing_card.map((pricing, i) => (
            <div className="col-xl-6 col-lg-12 mt-4" key={`pricing-${i}`}>
              <div className={`${styles.pricingItem} h-100`}>
                <h3 className={`${styles.title} ${common.title} mb-4`}>
                  {pricing.name}
                </h3>
                <p>{pricing.description}</p>

                <div className="d-flex align-items-center mt-4 mb-1">
                  <p className="flex-shrink-0 mb-0 me-3 font-weight-bold text-uppercase text-dark">
                    what's included
                  </p>
                  <hr
                    className={`flex-1 border-top ${common.borderDefault} w-100`}
                  />
                </div>

                {pricing.include.map((include, i) => (
                  <div
                    className="d-flex align-items-start mt-3"
                    key={`include-${i}`}
                  >
                    <div className="flex-shrink-0">
                      <svg
                        className={`me-2 mt-n1 text-primary ${common.textPrimary}`}
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="currentcolor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414.0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <p className="mb-0">{include}</p>
                  </div>
                ))}

                <Link href={pricing.button.link}>
                  <a className="mt-4 btn btn-sm btn-outline-primary">
                    {pricing.button.label}
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicePricing;
