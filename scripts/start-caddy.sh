BASE_PATH=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && cd ../ && pwd)
LOGS_PATH="$BASE_PATH/logs/caddy"

mkdir -p $LOGS_PATH

echo "Running the caddy service"
$(which caddy) run > "$LOGS_PATH/run.log" 2>&1 &
