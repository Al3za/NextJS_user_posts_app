import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // this config will help us debugging better.
  devIndicators: {
    position: "top-right", // the position of the N in all pages we render, 
    // and where we gets the warning if there are errors
  },
  logging: { //
    fetches: {
      fullUrl: true, // when we fetch something in our pages, we ll get some logs in the terminal to identify important info
      // like if a page is saved in cache or not (cache skip)
    },
  },
};

export default nextConfig;
