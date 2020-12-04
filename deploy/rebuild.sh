#!/bin/bash
set -e
cd ~/app
cp .env.local .env.production
#npm install
#gatsby clean # ensure we wipe out the .cache to avoid issues
gatsby build --prefix-paths

echo "Site built!"
