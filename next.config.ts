import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/app1.PNG", destination: "/images/app1.PNG", permanent: false },
      { source: "/app2.PNG", destination: "/images/app2.PNG", permanent: false },
      { source: "/app3.PNG", destination: "/images/app3.PNG", permanent: false },
      { source: "/app4.PNG", destination: "/images/app4.PNG", permanent: false },
      { source: "/logo1.svg", destination: "/logos/logo1.svg", permanent: false },
      { source: "/logo2.svg", destination: "/logos/logo2.svg", permanent: false },
      { source: "/logo3.svg", destination: "/logos/logo3.svg", permanent: false },
    ];
  },
};

export default nextConfig;
