import { getAllData, getRegulerPage, getSingleFile } from "@/lib/pages";
import BlogSinglePage from "Layouts/BlogSinglePage";
import Contact from "components/Contact";
import Bundle from "Layouts/Bundle";
import { Regular } from "Layouts/Regular";
import Service from "Layouts/Service";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
const RegulerPage = ({
  serviceData,
  testimonial,
  showcase,
  filterPost,
  slug,
  products,
  bundleData,
  contactData,
  blogs,
  mdxSource,
}) => {
  return (
    <>
      {slug == "services" ? (
        <Service
          serviceData={serviceData}
          testimonial={testimonial}
          showcase={showcase}
          slug={slug}
        />
      ) : slug == bundleData.frontmatter.layout ? (
        <Bundle products={products.posts} bundleData={bundleData} slug={slug} />
      ) : slug == "contact" ? (
        <Contact contactData={contactData} slug={slug} />
      ) : blogs.length > 0 ? (
        <BlogSinglePage blog={blogs[0]} slug={slug} mdxSource={mdxSource} />
      ) : (
        <Regular filterPost={filterPost} slug={slug} />
      )}
    </>
  );
};

export default RegulerPage;

export async function getStaticPaths() {
  const regulerPages = getRegulerPage("content");

  const paths = regulerPages.map((d) => ({
    params: {
      regulerPage: d.slug,
    },
  }));

  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params }) => {
  const { regulerPage } = params;
  const regulerPages = getRegulerPage("content");
  const regulerPost = regulerPages.filter((p) => !p.frontmatter.layout);
  const filterPost = regulerPost.filter((data) => data.slug === regulerPage);

  // servicePage
  const servicePage = regulerPages.filter(
    (p) => p.frontmatter.layout == "service"
  );
  const serviceData = servicePage[0];
  // testimonial data
  const testimonial = getSingleFile("content/testimonial.md");
  const testimonialData = testimonial.frontmatter;
  // showcase data
  const showcase = getSingleFile("content/showcase.md");
  const showcaseData = showcase.frontmatter;
  // bundle data

  const allProducts = getAllData("content/products", false);
  const bundleData = getSingleFile("content/bundle.md");
  // contact page data
  const contactPage = regulerPages.filter(
    (p) => p.frontmatter.layout == "contact"
  );
  const contactData = contactPage[0];
  // blog page data
  const blogPage = regulerPages.filter((p) => p.frontmatter.layout === "post");
  const blog = blogPage.filter((data) =>
    data.slug === regulerPage ? data.slug == regulerPage : null
  );
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeSlug],
    },
  };
  const mdxSource = await serialize(blog.length && blog[0].content, options);

  return {
    props: {
      serviceData: serviceData,
      filterPost: filterPost,
      testimonial: testimonialData,
      showcase: showcaseData,
      slug: regulerPage,
      products: allProducts,
      bundleData: bundleData,
      contactData: contactData,
      mdxSource: mdxSource,
      blogs: blog,
    },
  };
};
