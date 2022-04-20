#!/usr/bin/env bash

msg() {
  echo -E "/* $1 */"
}

msg "Will run this Node service as $RUN_MODE mode..."

if [[ "$RUN_MODE" == "development" ]]; then
  yarn start:dev &
elif [[ "$RUN_MODE" == "production" ]]; then
  msg "Build current sources..."
  yarn build
  yarn start:prod &
elif [[ "$RUN_MODE" != "production" ]] && [[ "$RUN_MODE" != "development" ]]; then
  msg "This "$RUN_MODE" mode is unknown as a default Node.js service mode. You should do know what you do."
  yarn "$RUN_MODE" &
fi
[[ "$!" -gt 0 ]] && wait $!