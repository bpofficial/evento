#!/usr/bin/env sh

PID_FILE="/tmp/$1.pid"
PID="-1"

if test -f "$PID_FILE"; then
    PID=$(cat $PID_FILE)
fi

echo "Stopping service: $1"
PORT="$2"

{
    if [[ "$PID" != "-1" ]]; then
        kill "$PID" > /dev/null 2>&1
    fi
} || {
    pgrep -f "$1" | xargs kill > /dev/null 2>&1
}

sudo lsof -i :"$2" -sTCP:LISTEN | awk 'NR > 1 {print $2}' | xargs kill -15

rm $PID_FILE > /dev/null 2>&1
