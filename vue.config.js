const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports ={
    publicPath:"./",
    lintOnSave:false,
    filenameHashing:false,
    productionSourceMap:false,
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, './node_modules/libpag/lib/libpag.wasm'),
                    to: './js',
                },
            ]),
        ],
    },
}
