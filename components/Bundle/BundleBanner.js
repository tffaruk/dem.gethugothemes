/* eslint-disable react/no-unescaped-entities */
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import common from "styles/common.module.scss";

const BundleBanner = ({
  banner: { title, subtitle, banner_image },
  button: { label, link, rel },
}) => {
  return (
    <section
      className={`pb-0 ${common.sectionSm} text-center ${common.bundleBanner}`}
    >
      <div className={`container ${common.container}`}>
        <div className="row">
          <div className="col-md-12 text-center mb-6">
            <h1
              className="mb-3"
              dangerouslySetInnerHTML={{ __html: marked.parseInline(title) }}
            />
            <p className={`${common.desc} mb-4`}>{subtitle}</p>

            <Link href={link}>
              <a ref={rel} className="btn btn-bundle">
                {label}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center ">
        <Image
          className="img-fluid pt-3"
          src={banner_image}
          alt="Bundle image"
          width={1800}
          height={470}
          placeholder="blur"
          blurDataURL={banner_image}
        />
      </div>
    </section>
  );
};

export default BundleBanner;
