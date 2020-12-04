#!/bin/bash
set -e
cd "$(dirname "$0")"
#cd app
cd ~/app

source .env.local

git checkout $APP_BRANCH
git fetch origin
git reset origin/$APP_BRANCH
git reset --hard
git clean -fd

rm -rf node_modules
yarn install

systemctl --user restart website_$APP_BRANCH.service

echo "deployment completed"
