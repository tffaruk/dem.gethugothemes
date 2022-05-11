import { MDXRemote } from "next-mdx-remote";
import styles from "styles/singleDownload.module.scss";
import { Align } from "components/MdxComponents";
const components = { Align };
const ProductDescription = ({ mdxSource }) => {
  return (
    <div
      className={`${styles.productDescription} mt-5`}
      // dangerouslySetInnerHTML={{ __html: marked.parse(post[0].content) }}
    >
      <MDXRemote {...mdxSource} components={components} />
    </div>
  );
};

export default ProductDescription;
