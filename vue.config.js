module.exports = {
  publicPath: "/MichaelBookstoreTransact/",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "The Book Vault";
      return args;
    });
  }
};
