@echo off

echo -------- Switch to branch: master --------

git checkout master

echo -------- Build project --------

npm run build
