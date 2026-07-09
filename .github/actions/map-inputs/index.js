//@ts-check
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const buildAndroid = core.getBooleanInput('android');
  const buildIos = core.getBooleanInput('ios');
  const distributeTest = core.getBooleanInput('test');
  const publishRelease = core.getBooleanInput('release');

  console.log({ buildAndroid, buildIos, distributeTest, publishRelease });

  if (!buildAndroid && !buildIos) {
    throw new Error('No platform selected, exiting');
  }

  if (!distributeTest && !publishRelease) {
    throw new Error('No release type selected, exiting');
  }

  const platforms = [];
  const types = [];

  if (buildAndroid) {
    platforms.push('android');
  }

  if (buildIos) {
    platforms.push('ios');
  }

  if (distributeTest) {
    types.push({
      type: 'test',
      lane: 'firebase_distribution_release_all'
    });
  }

  if (publishRelease) {
    types.push({
      type: 'release',
      lane: 'store_release'
    });
  }

  console.log({ platforms, types });

  core.setOutput('platforms', platforms);
  core.setOutput('types', types);
} catch (error) {
  core.setFailed(error.message);
}