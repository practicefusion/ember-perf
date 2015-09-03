import instanceInitializer from '../instance-initializers/<%= dasherizedModuleName %>';

var EMBER_VERSION_REGEX = /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:(?:\-(alpha|beta)\.([0-9]+)(?:\.([0-9]+))?)?)?(?:\+(canary))?(?:\.([0-9abcdef]+))?(?:\-([A-Za-z0-9\.\-]+))?(?:\+([A-Za-z0-9\.\-]+))?$/;

/**
 * VERSION_INFO[i] is as follows:
 *
 * 0  complete version string
 * 1  major version
 * 2  minor version
 * 3  trivial version
 * 4  pre-release type (optional: "alpha" or "beta" or undefined for stable releases)
 * 5  pre-release version (optional)
 * 6  pre-release sub-version (optional)
 * 7  canary (optional: "canary", or undefined for stable releases)
 * 8  SHA (optional)
 */
var VERSION_INFO = EMBER_VERSION_REGEX.exec(Ember.VERSION);


export function initialize() {
  const application = arguments[1] || arguments[0];
  const registry = !!arguments[1] ? arguments[0] : application.registry;

  var isPre111 = parseInt(VERSION_INFO[1], 10) < 2 && parseInt(VERSION_INFO[2], 10) < 12;
  const container = application.__container__;
  if (isPre111) {
    // For versions before 1.12.0, we have to call the instanceInitializer
    instanceInitializer.initialize(registry, application);
  }
}

export default {
  name: '<%= dasherizedModuleName %>',
  initialize: initialize,
  after: 'ember-perf-setup'
};