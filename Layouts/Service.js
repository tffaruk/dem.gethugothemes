import Testimonial from "components/HomePage/Testimonial";
import ServiceContact from "components/Service/ServiceContact";
import SerrviceProcess from "components/Service/SerrviceProcess";
import ServiceBanner from "components/Service/ServiceBanner";
import ServiceFeatures from "components/Service/ServiceFeatures";
import ServicePricing from "components/Service/ServicePricing";
import ServiceShowcase from "components/Service/ServiceShowcase";
import Layout from "components/Layouts/Layout";
import { strip } from "@/lib/utils";

const Service = ({
  serviceData: { frontmatter, content },
  testimonial: { serviceTitle, user },
  showcase,
}) => {
  const {
    banner,
    features,
    process,
    pricing,
    description,
    image,
    title,
    meta_title,
    noindex,
  } = frontmatter;
  return (
    <Layout
      title={title}
      meta_title={meta_title}
      description={description ? description : strip(content.slice(0, 120))}
      image={image}
      noindex={noindex}
    >
      <ServiceBanner serviceBanner={banner} />
      <ServiceFeatures features={features} />
      <SerrviceProcess process={process} />
      <ServicePricing pricing={pricing} />
      <Testimonial user={user} serviceTitle={serviceTitle} />
      <ServiceShowcase showcase={showcase} />
      <ServiceContact frontmatter={frontmatter} />
    </Layout>
  );
};

export default Service;
