const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  typescript: {
    enableTypeChecking: true,
  },
};
