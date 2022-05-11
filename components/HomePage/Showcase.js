import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";
import styles from "styles/banner.module.scss";
const Showcase = ({ showcase: { title, content, projects } }) => {
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
        <div className={`row ${styles.scrollableWrapper}`}>
          {projects.map((website, i) => (
            <div
              className="col-xl-3 col-lg-4 col-sm-6 col-8"
              key={`website-${i}`}
            >
              <div className={styles.item}>
                <Link href={website.website}>
                  <a target="_blank" className="d-block" rel={website.rel}>
                    <Image
                      src={website.image}
                      alt="showcase image"
                      width="360"
                      height="270"
                      placeholder="blur"
                      blurDataURL={website.image}
                    />
                    <div className={styles.block}>
                      <h5 className="mb-1">{website.name}</h5>
                      <p className="text-muted mb-0">{website.subtitle}</p>
                    </div>
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

export default Showcase;
