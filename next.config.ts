import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fivessnew.s3-hn-2.cloud.cmctelecom.vn', 's3-hn-2.cloud.cmctelecom.vn'], // ✅ thêm host vào đây
  },
};

export default nextConfig;
