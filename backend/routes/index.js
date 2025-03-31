import authRoutes from './auth.route.js';

export default function setupRoutes(app) {
    // auth routes
    app.use('/api/auth', authRoutes);

    // product routes
    // order routes
    // user routes
    // admin routes
    // payment routes
    // notification routes
    // review routes
    // category routes
    // brand routes
}
