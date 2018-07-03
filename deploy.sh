#!/bin/bash
# Deploy common-lib to firebase

function deploy
{
  local version=$1

  cd projects/common-lib

  npm version $version

  cd ../..

  npm run package

  npm publish "dist/common-lib/canyaio-common-lib-$version.tgz" --access public

  npm install "@canyaio/common-lib@$version"

  ng build

  firebase deploy -P canya-common-library
}

deploy $1
