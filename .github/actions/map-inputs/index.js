//@ts-check
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const buildAndroid = core.getInput('android');
  const buildIos = core.getInput('ios');
  const distributeTest = core.getInput('test');
  const publishRelease = core.getInput('release');

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
      lane: 'app_center_release_all'
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