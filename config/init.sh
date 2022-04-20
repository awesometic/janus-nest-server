#!/usr/bin/env bash

msg() {
  echo -E "/* $1 */"
}

GIT_PROJECT_URL="https://github.com/awesometic/janus-nest-server"
PROJ_PATH="/janus"

echo -e "Variables:
\\t- UID=${TARGET_UID}
\\t- GID=${TARGET_GID}
\\t- RUN_MODE=${RUN_MODE}"

if [[ ! "$(ls -A $PROJ_PATH)" ]]; then
  msg "The Janus project directory is empty. Will git clone the project..."

  cd / && git clone "$GIT_PROJECT_URL" "$PROJ_PATH" &
  [[ "$!" -gt 0 ]] && wait $!
  cd "$PROJ_PATH"
fi

if [[ ! -d "$PROJ_PATH"/node_modules ]]; then
  msg "Install dependencies..."

  cd "$PROJ_PATH" ; yarn install && npm install --no-package-lock --no-save @adminjs/express &
  [[ "$!" -gt 0 ]] && wait $!
  chown -R "$TARGET_UID":"$TARGET_GID" "$PROJ_PATH"
else
  msg "Node modules already exist in $PROJ_PATH/node_modules"
fi

msg "Start supervisord to start Janus server..."
supervisord -c /etc/supervisor/conf.d/supervisord.conf