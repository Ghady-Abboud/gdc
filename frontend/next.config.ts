import AppPage from "./src/lib/routes/routes";

const nextConfig = {
  async redirects() {
    return [
      {
        source: AppPage.HOME,
        destination: AppPage.SIGNIN,
        permanent: true,
      },
      {
        source: AppPage.DASHBOARD,
        destination: AppPage.MYFILES,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
