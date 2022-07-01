#!/usr/bin/env bash

msg() {
    echo -E "[Janus Docker]: $1"
}

msg "Starting Janus Docker..."

export DB_HOST_NAME=janus-mariadb
export DB_HOST_PORT=33061
export DB_SYNCHRONIZE=true

msg "Running in development mode..."

yarn start:debug &

[[ "$!" -gt 0 ]] && wait $!