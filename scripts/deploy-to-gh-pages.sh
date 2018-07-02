#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit

rm -rf public
mkdir public

# config
# git config --global user.email "jschuler@redhat.com"
# git config --global user.name "Joachim Schuler"
git config user.name $GIT_USER_NAME
git config user.email $GIT_USER_EMAIL

# build (CHANGE THIS)
cp -R packages/patternfly-3/_site/. public/

echo "*** Deploy to Github Pages"

# deploy
cd public
git init
git add .
git commit -m "Deploy to Github Pages"
# git push --force --quiet "https://${AUTH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages > /dev/null 2>&1
git push --force "https://$AUTH_TOKEN@github.com/$TRAVIS_REPO_SLUG.git" master:gh-pages
