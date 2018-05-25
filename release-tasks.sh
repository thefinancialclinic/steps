#!/bin/bash

# See: https://github.com/twopoint718/heroku-buildpack-sqitch

set -e            # fail fast
set -o pipefail   # do not ignore exit codes when piping output

sqitch deploy --target heroku_db # set by 'heroku-buildpack-sqitch'
