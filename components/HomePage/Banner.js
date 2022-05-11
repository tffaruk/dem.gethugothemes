import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/banner.module.scss";

// homepage-banner
const Banner = ({
  bannerData: { title, subtitle, background_image, button },
}) => {
  return (
    <section className={`${styles.banner} ${styles.homepageBanner}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.block}>
          <div className="row justify-content-center text-center">
            <div className="col-xl-9">
              <h1
                className="mb-3 text-capitalize"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(title),
                }}
              ></h1>
            </div>
            <div className="col-xl-6 col-lg-8">
              <p
                className="text-lg"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(subtitle),
                }}
              ></p>
              {button.enable && (
                <Link href={button.link}>
                  <a
                    rel={button.rel}
                    className="btn btn-outline-primary text-capitalize"
                  >
                    {button.label}
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className={`text-center pt-3 mt-6 ${styles.bannerIllustration}`}>
          <Image
            className="Image-fluid"
            src={background_image}
            alt="banner"
            width={1238}
            height={588}
            priority
          />
        </div>
      </div>
      <div className={styles.floatingAssets}>
        <div className={styles.wave1}>
          <Image src="/images/wave-01.jpg" alt="O" layout="fill" />
        </div>
        <div className={styles.wave2}>
          <Image src="/images/wave-02.jpg" alt="O" layout="fill" />
        </div>
        <div className={styles.wave3}>
          <Image src="/images/wave-03.jpg" alt="O" layout="fill" />
        </div>
        <div className={styles.wave4}>
          <Image src="/images/wave-04.jpg" alt="O" layout="fill" />
        </div>

        <div className={styles.circles}>
          <span className={`${styles.circle1} `}></span>
          <span className={`${styles.circle2} ${styles.bgPrimary}`}></span>
          <span className={`${styles.circle3} ${styles.bgTertiary}`}></span>
          <span className={`${styles.circle4} ${styles.bgTertiary}`}></span>
          <span className={`${styles.circle5} ${styles.bgPrimary}`}></span>
          <span className={`${styles.circle6} ${styles.bgTertiary}`}></span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
