#!/usr/bin/env bash

APP="$1"
OPT="$2"
BASE_PATH=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd)
echo "$BASE_PATH"

SERVICE_PATH="$BASE_PATH/apps/$APP"
LOGS_PATH="$BASE_PATH/logs/$APP"

mkdir -p $LOGS_PATH

PID_FILE="/tmp/$APP"
if test -f "$PID_FILE"; then
    echo "Service apps/$APP already running."
    exit 0
fi

echo "Running the service at apps/$APP"
cd "$SERVICE_PATH" || exit

if [ "$OPT" = "fg" ]; then
    $(which sls) offline start --stage dev --noPrependStageInUrl
else
    $(which sls) offline start --stage dev --noPrependStageInUrl > "$LOGS_PATH/dev.log" 2>&1 &
echo $! > "/tmp/$APP.pid"
fi
