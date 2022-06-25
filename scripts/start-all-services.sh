#!/usr/bin/env sh
BASE_PATH=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd)

$BASE_PATH/scripts/start-service.sh administration
$BASE_PATH/scripts/start-service.sh application
$BASE_PATH/scripts/start-service.sh authentication
$BASE_PATH/scripts/start-service.sh authorization

$BASE_PATH/scripts/start-caddy.sh

# $BASE_PATH/scripts/start-service.sh customisation
# $BASE_PATH/scripts/start-service.sh integration
# $BASE_PATH/scripts/start-service.sh notification
# $BASE_PATH/scripts/start-service.sh organisation
