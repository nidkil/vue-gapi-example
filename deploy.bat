@echo off

echo -------- Changed directory from dist to docs --------

rm -rf docs
mv dist docs

echo -------- Add and commit build to branch: gh-pages --------

git add -A
git commit -m "Deploy GitHub pages"
git push -u origin master
