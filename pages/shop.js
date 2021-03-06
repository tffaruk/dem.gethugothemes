import { getAllCategory } from "@/lib/category";
import { getAllData, getSingleFile } from "@/lib/pages";
import Layout from "components/Layouts/Layout";
import Products from "components/Products";
import { useState, useEffect, useMemo } from "react";
import styles from "../styles/products.module.scss";
import common from "styles/common.module.scss";
import { sortByWeight, sortByDate } from "@/lib/utils";

const Shop = ({ products, categories, indexData }) => {
  const [productData, setProductData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  // filter product by weight
  const filterByWeight = products.posts.filter(
    (product) => product.frontmatter.weight > 0
  );

  const productsByDate = sortByDate(products.posts);

  const productsByWeight = sortByWeight(filterByWeight);

  const filterWeightProducts = productsByDate.filter(
    (product) => !productsByWeight.includes(product)
  );
  const allProducts = [...productsByWeight, ...filterWeightProducts];

  console.log(allProducts.length);
  const filterData = (e, index) => {
    setEditIndex((editIndex) => (editIndex === index ? index : index));

    setIsActive(!isActive);
    const categoryProduct = allProducts.filter((product) =>
      product.category.includes(e)
    );

    if (e == "All Themes") {
      setIsActive(false);
      setProductData(allProducts);
    } else if (e != "All Themes") {
      setIsActive(true);
      setProductData(categoryProduct);
    } else {
      setProductData(allProducts);
    }
  };

  useEffect(() => {
    setProductData(allProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      title={indexData.frontmatter.title}
      meta_title={indexData.frontmatter.title}
      image={indexData.frontmatter.title}
      description={indexData.frontmatter.description}
    >
      <section className={`${styles.products} pt-6`}>
        <div className={`${common.container} container`}>
          <div className="row">
            <div className="col-md-12 text-center">
              <div className={`${common.sectionTitle} mb-5 pb-3 `}>
                <div className={`${common.textCenter} text-center`}>
                  <h1 className={common.title}>Shop</h1>
                </div>
              </div>
              <div className={`list-inline ${styles.filterControls} mb-6`}>
                <button
                  data-filter="all"
                  className={`list-inline-item ${
                    !isActive ? styles.active : ""
                  }`}
                  value="All Themes"
                  onClick={(e) => filterData(e.target.value)}
                >
                  All Themes<span>{allProducts.length}</span>
                </button>
                {categories.map((cat, i) => (
                  <button
                    data-filter="all"
                    className={`list-inline-item ${
                      editIndex == i ? styles.active : ""
                    }`}
                    key={i}
                    value={cat}
                    onClick={(e) => filterData(e.target.value, i)}
                  >
                    {cat}
                    <span>
                      {
                        allProducts.filter((category) =>
                          category.frontmatter.categories.includes(cat)
                        ).length
                      }
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <Products products={productData} />
        </div>
      </section>
    </Layout>
  );
};

export default Shop;
export const getStaticProps = () => {
  const allProducts = getAllData("content/products", false);
  const allCategories = getAllCategory("content/products");
  const indexData = getSingleFile("content/products/_index.md");

  return {
    props: {
      products: allProducts,
      categories: allCategories,
      indexData: indexData,
    },
  };
};
