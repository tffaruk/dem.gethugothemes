import Image from "next/image";
import styles from "styles/service.module.scss";
import common from "styles/common.module.scss";

const ServiceFeatures = ({ features }) => {
  return (
    <section className={styles.ghtFeatures}>
      <div className={`${common.container} container`}>
        <div className={styles.featuresBlock}>
          <div className={`row justify-content-center ${styles.row}`}>
            {features.map((feature, i) => (
              <div className="col-lg-4 col-md-6" key={`feature-${i}`}>
                <div className={styles.block}>
                  <h4 className="mb-3 h5">{feature.name}</h4>
                  <p className="mb-0">{feature.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.shapeStart}>
            <Image
              width={46}
              height={79}
              src="/images/services/shape-s1.png"
              alt="shape-left"
            />
          </div>
          <div className={styles.shapeEnd}>
            <Image
              width={69}
              height={54}
              src="/images/services/shape-s2.png"
              alt="shape-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
