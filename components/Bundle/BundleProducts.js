import Products from "components/Products";
import common from "styles/common.module.scss";
import { marked } from "marked";

const BundleProducts = ({ products, title }) => {
  return (
    <section className={`${common.section} ${common.bundleCategory}`}>
      <div className={`container ${common.container}`}>
        <div className="row mb-5 py-5">
          <div className="col-md-12">
            <h2
              className="text-center"
              dangerouslySetInnerHTML={{ __html: marked.parseInline(title) }}
            />
          </div>
        </div>
        <Products products={products} />
      </div>
    </section>
  );
};

export default BundleProducts;
