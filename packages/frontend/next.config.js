module.exports = {
  reactStrictMode: true,
  env: {
    RELAYER_API: process.env.RELAYER_API || "http://localhost:8080/api/report"
  }
};
