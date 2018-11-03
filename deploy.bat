@echo off

echo -------- Switch to branch: gh-pages --------

git checkout gh-pages

echo -------- Build project --------

npm run build

echo -------- Add and commit build to branch: gh-pages --------

git add -A
git commit -m 'Deploy GitHub pages'
git push -u orgin master:gh-pages

echo -------- Switch to branch: master --------

git checkout master
