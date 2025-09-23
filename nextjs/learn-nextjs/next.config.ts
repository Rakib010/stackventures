import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /*  images: {
     remotePatterns: [new URL('https://searchengineland.com/figz/wp-content/seloads/2020/03/code-SS_634574354-1920x1080-1.jpg')],
   }, */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },



};

export default nextConfig;
