const nextConfig = {
  images: {
    domains: [
      "drive.google.com",     // for Google Drive images
      "localhost",            // for /upload image paths during dev
      "lh3.googleusercontent.com", // optional Google profile images
      "images.unsplash.com",  // optional common CDN
      'res.cloudinary.com'
    ],
  },
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback ??= {};
      config.resolve.fallback.fs = false;
      config.resolve.fallback.module = false;
    }
    return config;
  },
};

module.exports = nextConfig;
