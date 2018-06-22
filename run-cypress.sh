#!/bin/bash

is_running() {
  echo "Waiting for server..."
  $(npm bin)/wait-on http://localhost:$PORT --timeout 5000 &>/dev/null
  return $?
}

start() {
  echo "Starting server..."
  pushd apps/api
  node .build/index.js &
  popd
  is_running
}

echo -e "🌲 Preparing to run cypress...\n"
echo "Environment variables..."

echo -e "- \$CI       -> $CI"
echo -e "- \$NODE_ENV -> $NODE_ENV"
echo -e "- \$API_URL  -> $API_URL"
echo -e "- \$PORT     -> $PORT\n"

is_running || start
$(npm bin)/cypress install
$(npm bin)/cypress run --env configFile=ci
