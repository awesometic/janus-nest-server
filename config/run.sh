#!/usr/bin/env bash

msg() {
    echo -E "[Janus Docker]: $1"
}

msg "Starting Janus Docker..."

export DATABASE_HOST="janus-mariadb"
export DATABASE_TYPEORM_SYNC=true

msg "Running in development mode..."

yarn start:debug &

[[ "$!" -gt 0 ]] && wait $!