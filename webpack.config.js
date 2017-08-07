var path = require('path');

module.exports = {
 entry: './ts/app/app.ts',
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       use: 'awesome-typescript-loader',
       exclude: /node_modules/
     }
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"],
   modules: [
     path.resolve(__dirname, 'ts'),
     'node_modules'
   ]
 },
 output: {
   filename: 'js/bundle.js',
   path: __dirname
 },
 devtool: "source-map"
};