import Image from "next/image";
import Link from "next/link";
import styles from "../styles/products.module.scss";

const Products = ({ products, search, setModalIsOpen }) => {
  return (
    <div className="row gx-4 gx-lg-5 justify-content-center">
      {products.map((product, i) => (
        <div
          className={`col-lg-4 col-md-6 ${styles.productGridItem}`}
          key={`product-${i}`}
        >
          <div className={`${styles.productItem}`}>
            <div className={styles.productThumb}>
              <Link href={`/products/${product.slug}`}>
                <a onClick={() => search && setModalIsOpen(false)}>
                  <Image
                    width="640"
                    height="480"
                    src={product.frontmatter.image}
                    alt={`${product.frontmatter.title} thumbnail`}
                    placeholder="blur"
                    blurDataURL={product.frontmatter.image}
                    priority
                  />
                </a>
              </Link>
            </div>

            <div className={`${styles.productContent} text-center`}>
              <h3>
                <Link href={`/products/${product.slug}`} passHref>
                  <a>{product.frontmatter.title}</a>
                </Link>
              </h3>
              <p className="mb-0">{!search && product.frontmatter.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
