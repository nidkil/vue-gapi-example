@echo off

echo -------- Switch to branch: gh-pages --------

git checkout deploy

echo -------- Build project --------

npm run build

echo -------- Changed directory from dist to docs --------

mv dist docs

echo -------- Add and commit build to branch: gh-pages --------

git add -A
git commit -m 'Deploy GitHub pages'
git push -u orgin master:gh-pages

echo -------- Switch to branch: master --------

git checkout master
