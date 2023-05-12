#!/usr/bin/env bash
set -euo pipefail

echo "build"
(cd packages/gestalt && yarn build)
(cd packages/gestalt-datepicker && yarn build)

echo "eslint"
yarn eslint .

echo "prettier"
yarn prettier --check .

echo "stylelint"
yarn stylelint "**/*.css"

echo "jest"
yarn jest --coverage

echo "a11y:validate"
yarn a11y:validate

echo "svgIcons:validate"
yarn svgIcons:validate

echo "flow"
yarn flow check --max-warnings 0

echo "CSS: flow types"
yarn run flow-generate:css

echo "CSS: variables"
yarn run css:validate

echo "Shell check"
yarn run lint:sh

FILES=$(git diff --name-only -- '*.flow')
if [[ "$FILES" ]]
then
  echo "CSS Flow types need to be updated."
  echo "Run \`yarn run flow-generate:css\` and commit your changes."
  echo "----"
  echo "Following files require changes:"
  git diff -- '*.flow'
  exit 1
fi

YARN_LOCK_CHANGES=$(git diff master...HEAD --name-only -- 'yarn.lock')
if [[ "$YARN_LOCK_CHANGES" ]]
then
  echo "👀 yarn.lock has changes. If you didn't mean to, revert your changes"
fi

PACKAGE_JSON_CHANGES=$(git diff master...HEAD --name-only -- 'package.json')
if [[ "$PACKAGE_JSON_CHANGES" ]]
then
  echo "👀 package.json has changes. If you didn't mean to, revert your changes"
fi

DIST_GESTALT_CHANGES=$(git diff master...HEAD --name-only -- 'packages/gestalt/dist')
if [[ "$DIST_GESTALT_CHANGES" ]]
then
  echo "👀 packages/gestalt/dist has changes. If you didn't mean to, revert your changes"
fi


echo "👌 Looks good to me!"
echo "📑 Done!"
