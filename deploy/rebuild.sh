#!/bin/bash
set -e
cd ~/app
cp .env.local .env.production
source .env.local

#npm install
#gatsby clean # ensure we wipe out the .cache to avoid issues

rm -rf node_modules
SHARP_IGNORE_GLOBAL_LIBVIPS=true
yarn install

gatsby build --prefix-paths --no-color

find /tmp/ -user $(whoami) -exec rm -fr {} \; 2>/dev/null

echo "Site built!"
