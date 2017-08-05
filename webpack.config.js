module.exports = {
 entry: './ts/app/app.ts',
 module: {
   rules: [
     {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/
     }
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
 output: {
   filename: 'js/bundle.js',
   path: __dirname
 },
 devtool: "source-map"
};