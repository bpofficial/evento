BASE_PATH=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)

rm -rf $BASE_PATH/../logs

$BASE_PATH/start-service.sh api-billing-commands
# $BASE_PATH/start-service.sh api-billing-queries
# $BASE_PATH/start-service.sh api-forms-commands
$BASE_PATH/start-service.sh api-forms-queries
# $BASE_PATH/start-service.sh api-hooks-commands
# $BASE_PATH/start-service.sh api-hooks-queries
$BASE_PATH/start-service.sh ui-ssr fg
