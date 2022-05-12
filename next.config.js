/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = {
  images: {
    domains: ["demo.gethugothemes.com"],
    minimumCacheTTL: 60, //In seconds
  },
  pageExtensions: ["js", "jsx", "md", "mdx"],
  nextConfig,
  async redirects() {
    return [
      {
        source: "/500",
        destination: "/",
        permanent: true,
      },
    ];
  },
};
