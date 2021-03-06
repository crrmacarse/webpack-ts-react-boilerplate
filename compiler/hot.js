import { join } from 'path';
import {
  entry, output, moduleResolver, rules, plugins,
} from './common';

const PORT = process.env.PORT || 3333;

const devServer = () => ({
  hot: true,
  contentBase: join(process.cwd(), '/dist'),
  writeToDisk: true,
  historyApiFallback: true,
  compress: true,
  port: PORT,
  overlay: {
    errors: true,
    warnings: true,
  },
});

export default {
  mode: 'development',
  devtool: 'source-map',
  entry,
  output,
  resolve: moduleResolver,
  module: {
    rules: [
      ...rules,
      {
        test: /\.(scss|css)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins,
  devServer: devServer(),
};
