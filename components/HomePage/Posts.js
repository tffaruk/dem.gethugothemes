import Products from "components/Products";
import Link from "next/link";
import styles from "../../styles/products.module.scss";
import common from "../../styles/common.module.scss";

const Posts = ({ products, productIndex }) => {
  const { posts } = products;
  const { title, subtitle, button } = productIndex.frontmatter;
  return (
    <section
      id="products"
      className={`${common.section} ${styles.handpickedProducts}`}
    >
      <div className={`container ${common.container}`}>
        <div className="row">
          <div className={`col-md-12 ${common.sectionTitle}`}>
            <div className={`${common.textCenter} pb-6 text-center `}>
              <h2 className={common.title}>{title}</h2>
              <p>{subtitle}</p>
            </div>
          </div>
        </div>

        <Products products={posts.slice(0, 12)} />

        <div className="row">
          <div className="col-md-12">
            <div className="text-center mt-4">
              {button.enable && (
                <Link href={button.link}>
                  <a rel={button.rel} className="btn btn-outline-primary">
                    {button.label}
                  </a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;
