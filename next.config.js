/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["upload.wikimedia.org", "s3-eu-west-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
