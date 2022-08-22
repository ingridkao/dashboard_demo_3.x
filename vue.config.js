
const webpack = require('webpack')
const BASE_URL = process.env.VUE_APP_BASE_URL
const WEB_TITLE = process.env.VUE_APP_WEB_TITLE

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? `${BASE_URL}/`
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
            name: WEB_TITLE,
            short_name: "城市運營儀表板",
            start_url: "./",
            display: "standalone",
            theme_color: "#000000",
            icons: []
        }
    }
}