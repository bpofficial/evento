#!/usr/bin/env sh
BASE_PATH=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd)

# kill services
$BASE_PATH/scripts/stop-service.sh administration 4001
$BASE_PATH/scripts/stop-service.sh application 4002
$BASE_PATH/scripts/stop-service.sh authentication 4003
$BASE_PATH/scripts/stop-service.sh authorization 4004
# $BASE_PATH/scripts/stop-service.sh customisation
# $BASE_PATH/scripts/stop-service.sh integration
# $BASE_PATH/scripts/stop-service.sh notification
# $BASE_PATH/scripts/stop-service.sh organisation

# kill caddy
pgrep -f "caddy" | xargs kill
