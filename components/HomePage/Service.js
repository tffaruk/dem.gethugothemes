import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";
const Service = ({ services }) => {
  return (
    <section className={`${common.section} pt-0`}>
      <div className={`container ${common.container}`}>
        {services.map((service, i) => (
          <div
            key={`service-${i}`}
            className={
              i % 2 != 0
                ? `bg-white ${common.shadow} ${common.roundedLg} ${common.section}`
                : common.sectionSm
            }
          >
            <div
              className={"row justify-content-center align-items-center "}
              key={i}
            >
              <div
                className={`col-xl-5 col-10 mb-5 mb-xl-0 text-center ${
                  i % 2 != 0 ? "order-0 order-xl-1" : "order-0"
                }`}
              >
                <Image
                  className="Image-fluid"
                  src={service.image}
                  alt="service-image"
                  width="370"
                  height="281"
                  placeholder="blur"
                  blurDataURL={service.image}
                />
              </div>
              <div className={`col-xl-5 col-lg-10 order-1 order-xl-0`}>
                <div
                  className={`${common.sectionTitle} pl-5 ps-5 ps-lg-0 ${common.textCenter} ${common.textXlStart} `}
                >
                  <h2
                    className={`${common.title} mb-3`}
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(service.title),
                    }}
                  />
                  <p className="mb-4">{service.content}</p>
                  {service.button.enable &&
                    (service.button.link === "assistant" ? (
                      <a
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => Assistant("open")}
                      >
                        {service.button.label}
                      </a>
                    ) : (
                      <Link href={service.button.link}>
                        <a
                          rel={service.button.rel}
                          className="btn btn-sm btn-outline-primary"
                        >
                          {service.button.label}
                        </a>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
