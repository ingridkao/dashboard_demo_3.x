
const webpack = require('webpack')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/dashboard_demo_3.x/'
    : '/',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                mapboxgl: 'mapbox-gl',
            }),
        ],
    },
    devServer: {
        port: 1234
    },
    pwa: {
        iconPaths: {
            faviconSVG: null,
            favicon32: null,
            favicon16: null,
            appleTouchIcon: null,
            maskIcon: null,
            msTileImage: null
        },
        manifestOptions: {
            name: "城市運營聯合儀表板",
            short_name: "儀表板",
            start_url: "./",
            display: "standalone",
            theme_color: "#000000",
            icons: []
        }
    }
}