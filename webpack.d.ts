interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string;
  entry: any;
  externals?: any;
  output: any;
  mode?: string;
  module?: any;
  plugins?: Array<any>;
  resolve?: {
    extensions?: Array<string>;
  };
  devServer?: {
    contentBase?: string;
    port?: number;
    historyApiFallback?: {[key: string]: boolean} | boolean;
    hot?: boolean;
    inline?: boolean;
    proxy?: any;
    host?: string;
    stats?: string;
    quiet?: boolean;
    noInfo?: boolean;
    watchOptions?: any;
  };
  performance?: {
    hints?: boolean;
  }
  node?: {
    process?: boolean;
    global?: boolean;
    Buffer?: boolean;
    crypto?: boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean
    clearTimeout?: boolean;
    setTimeout?: boolean;
    __dirname?: boolean;
    __filename?: boolean;
  };
}