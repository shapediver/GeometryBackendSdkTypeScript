#!/usr/bin/env bash
# This script overwrites the default script and is called by the Publish command of the Python
# maintain CLI tool.
#
# This script updates the version in the Configuration.ts file of the SDK package.

root=$(git rev-parse --show-toplevel)
targetName='@shapediver/sdk.geometry-api-sdk-v2'

# Extract the new version from the target package.
version=$(
  node -pe "
    const components = JSON.parse('${3}');
    const component = components.find(c => c.component.name === '${targetName}');
    component ? component.new_version : ''
  "
)

test -n "$version" || {
  echo "Package '$targetName' not found in components list - skipping version updates." >&2
  exit 0
}

# Update sdk version number.
config="${root}/packages/sdk.geometry-api-sdk-v2/src/configuration.ts"
sed -i "s/sdkVersion = '.*'/sdkVersion = '${version}'/" "${config}"
git add "${config}"
