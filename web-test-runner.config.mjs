export default {
  files: 'test/**/*.test.js',
  // files: 'test/navigation/*.test.js',
  // files: 'test/elements/ApiServerSelectorElement.test.js',
  // files: 'test/elements/SE-12957.test.js',
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: 600000,
    },
  },
	browserStartTimeout: 20000,
	testsStartTimeout: 20000,
	testsFinishTimeout: 600000,
};
