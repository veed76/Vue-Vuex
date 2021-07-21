const path = require('path')
module.exports = {
    module: {
        rules: [
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            fiber: require('fibers'),
                            indentedSyntax: false
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.vue'],
            alias: {
            '@': path.resolve(__dirname, './src'),
             vue$: 'vue/dist/vue.runtime.esm.js'
        }
    },
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
}
