/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    domains: [
      "upload.wikimedia.org",
      "s3-eu-west-1.amazonaws.com",
      "codelynx.dev",
      "w7.pngwing.com",
    ],
  },
};

module.exports = nextConfig;
