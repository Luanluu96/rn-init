#!/usr/bin/env bash
registry=$(npm config get registry)

npm config set registry https://registry.npmjs.org
who=$(npm whoami 2>/dev/null)

if [ -z $who ]; then
  echo "Login plz..."
  npm login
fi
echo "Who am i: $(npm whoami)"

echo "Begin publish..."
npm publish

npm config set registry ${registry}
