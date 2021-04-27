module.exports = {
    css: {
      loaderOptions: {
        less: {
          modifyVars: {
            'primary-color': '#0068B7',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
          },
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  };