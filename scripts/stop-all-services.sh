#!/usr/bin/env sh
BASE_PATH=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd)

# kill services
$BASE_PATH/scripts/stop-service.sh api-billing-commands 4001
$BASE_PATH/scripts/stop-service.sh api-billing-queries 4002
$BASE_PATH/scripts/stop-service.sh api-forms-commands 4003
$BASE_PATH/scripts/stop-service.sh api-forms-queries 4004
$BASE_PATH/scripts/stop-service.sh api-hooks-commands 4005
$BASE_PATH/scripts/stop-service.sh api-hooks-queries 4006

# kill caddy
pgrep -f "caddy" | xargs kill
