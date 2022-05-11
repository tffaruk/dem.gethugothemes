import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";
import banner from "styles/banner.module.scss";
import styles from "styles/service.module.scss";

const ServiceShowcase = ({ showcase: { title, projects, content } }) => {
  return (
    <section className={`${common.section} pb-0`}>
      <div className={`container ${common.container}`}>
        <div className="row justify-content-center">
          <div className={`col-xl-6 col-lg-10 ${common.sectionTitle}`}>
            <div className={` ${common.textCenter} text-center mb-5`}>
              <h2 className={common.title}>{title}</h2>
              <p>{content}</p>
            </div>
          </div>
        </div>
        <div
          className={`row ${banner.scrollableWrapper} flex-wrap justify-center`}
        >
          {projects.map((website, i) => (
            <div className="col-sm-6 col-lg-3 col-12 mb-4" key={`website-${i}`}>
              <div className={`${banner.item} card border-0`}>
                <Image
                  src={website.image}
                  alt={website.name}
                  height={300}
                  width={350}
                />
                <div className={`${styles.block} mt-4`}>
                  <div className={styles.showcaseContent}>
                    <h4 className={`${common.title} mb-2`}>{website.name}</h4>
                    <p className="text-muted mb-3">{website.subtitle}</p>
                    <p className={styles.content}>{website.description}</p>
                    <Link href={website.website}>
                      <a
                        target="_blank"
                        className="font-weight-bold stretched-link btn btn-sm btn-outline-primary"
                        rel={website.rel}
                      >
                        Live Preview
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
