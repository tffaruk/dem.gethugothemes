import { strip } from "@/lib/utils";
import BundleBanner from "components/Bundle/BundleBanner";
import BundleCta from "components/Bundle/BundleCta";
import BundleFaq from "components/Bundle/BundleFaq";
import BundleProducts from "components/Bundle/BundleProducts";
import Layout from "components/Layouts/Layout";

const Bundle = ({ products, bundleData: { frontmatter, content } }) => {
  const {
    faq,
    banner,
    call_to_action,
    button,
    description,
    title,
    meta_title,
    products_title,
    noindex,
    image,
  } = frontmatter;
  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description ? description : strip(content.slice(0, 120))}
      image={image}
      noindex={noindex}
    >
      <BundleBanner banner={banner} button={button} />
      <BundleProducts products={products} title={products_title} />
      <BundleFaq faq={faq} />
      <BundleCta call_to_action={call_to_action} button={button} />
    </Layout>
  );
};

export default Bundle;
