import { marked } from "marked";
import Link from "next/link";
import config from "../../config/config.json";
import styles from "styles/singleDownload.module.scss";
import { kebabCase } from "@/lib/slugger";

const ProductCard = ({ singleProduct }) => {
  const { bundle } = config;
  const { title, price, demo, download, github } = singleProduct[0].frontmatter;

  return (
    <div className={`${styles.productSidebar} card d-none d-lg-block`}>
      <div className={styles.cardBody}>
        <h1 className={`${styles.productHeader} text-center`}>{title}</h1>
        <h2
          className={`text-center primary-color ${styles.productPrice}`}
        >{`$${price}.00`}</h2>

        <ul className={`list-inline mt-3 mb-0 ${styles.productButtons}`}>
          <li>
            <Link
              href={
                demo
                  ? demo
                  : `https://demo.gethugothemes.com/${kebabCase(title)}/site/`
              }
            >
              <a
                target="_blank"
                className={`btn btn-outline-primary mb-3`}
                rel="noreferrer"
              >
                Live Preview
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={`https://account.gethugothemes.com/checkout?edd_action=add_to_cart&download_id=${download}&edd_options%5Bprice_id%5D=1`}
            >
              <a target="_blank" className={`btn btn-primary`} rel="noreferrer">
                Buy Now
              </a>
            </Link>
          </li>
          {github && (
            <li className="mt-3">
              <Link href={github}>
                <a
                  target="_blank"
                  className={`btn btn-lg btn-github`}
                  rel="noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="me-2"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Grab it from Github
                </a>
              </Link>
            </li>
          )}
        </ul>
        <p className={`${styles.lineText} text-center mt-4`}>
          <span>OR</span>
        </p>
        <div
          className={`${styles.bundleOffer} ${styles.bundleOfferBox} text-center`}
        >
          <Link href="/bundle/">
            <a className="d-block stretched-link text-white">
              <h4>{bundle.title}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(bundle.subtitle),
                }}
              ></p>
              <span className="font-weight-bold text-white d-block">
                {bundle.label}
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
