import { marked } from "marked";
import Image from "next/image";
import styles from "../../styles/banner.module.scss";
import common from "../../styles/common.module.scss";

const Features = ({ featureData }) => {
  const { title, subtitle, fun_facts, feature_item } = featureData;

  return (
    <section className={common.section}>
      <div className={`container ${common.container}`}>
        <div
          className={`${common.shadow} ${common.roundedLg} py-5 px-3 px-sm-5`}
        >
          <div className="row align-items-center">
            <div className="col-lg-4">
              <div className="pr-3">
                <div className={`mb-5 ${common.sectionTitle}`}>
                  <h2
                    className={common.title}
                    dangerouslySetInnerHTML={{
                      __html: marked.parseInline(title),
                    }}
                  ></h2>
                  <p>{subtitle}</p>
                </div>
                <div className={styles.aboutInfoBox}>
                  {fun_facts.map((facts, i) => (
                    <div key={`facts-${i}`} className={`${facts.style}`}>
                      <h2 className="h3 lh-1">
                        {facts.number} <span>{facts.name}</span>
                      </h2>
                      <p className="mb-0 font-weight-bold text-dark">
                        {facts.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-lg-8 border-left border-md-0">
              <div className="pl-0 ps-lg-5 mt-4 mt-lg-0 pt-4">
                <div className="row gy-5">
                  {feature_item.map((feature, i) => (
                    <div className="col-md-4 col-sm-6" key={`feature-${i}`}>
                      <Image src={feature.icon} alt="" width="50" height="50" />
                      <h5 className="font-weight-bold mb-2 mt-3">
                        {feature.name}
                      </h5>
                      <p className="mb-0 text-justify">{feature.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
