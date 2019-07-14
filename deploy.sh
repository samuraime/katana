#!/bin/bash

# the script need a BUILD_NUMBER as argument
# deploy.sh and process.json are filled manually

export CIRCLE_TOKEN=''

#curl https://circleci.com/api/v1.1/project/:vcs-type/:username/:project/$build_number/artifacts?circle-token=$CIRCLE_TOKEN \
curl https://circleci.com/api/v1.1/project/github/samuraime/katana/$1/artifacts?circle-token=$CIRCLE_TOKEN \
   | grep -o 'https://[^"]*' \
   | tr -d \" \
   | sed -e "s/$/?circle-token=$CIRCLE_TOKEN/" \
   #| wget -v -i - 
   | wget -O dist.tar -v -i -

tar -xf dist.tar -C ./

pm2 restart /www/katana/process.json
