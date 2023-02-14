module.exports = {
  experimental: {
    appDir: true
  },
  images: {},
  reactStrictMode: true,
  transpilePackages: ["ui"],
  redirects() {
    return [
      {
        destination: "https://browser-apps.vercel.app/chatgpthing",
        permanent: false,
        source: `/`
      }
    ]
  }
}
