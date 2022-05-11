import Image from "next/image";
import styles from "styles/service.module.scss";
import common from "styles/common.module.scss";
const ServiceBanner = ({ serviceBanner: { title, subtitle, image } }) => {
  return (
    <section className={styles.ghtBanner}>
      <div className={`${common.container} container`}>
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6 col-md-10">
            <h1 className="title text-capitalize h2 mb-3">{title}</h1>
            <p className="subtitle mb-5">{subtitle}</p>
            <a href="#packages" className="btn btn-lg btn-primary">
              Check Out Our Packages
            </a>
          </div>
          <div className="col-lg-5 mt-5 mt-lg-0 d-none d-lg-block">
            <div className="row justify-content-center">
              <div className="col-lg-9">
                <Image
                  width={397}
                  height={374}
                  src={image}
                  alt="banner-illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
