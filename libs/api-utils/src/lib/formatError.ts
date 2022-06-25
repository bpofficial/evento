export function formatError(
    error: string,
    error_description: string,
    http_status = 500,
    error_code = http_status
) {
    return {
        error: true,
        statusCode: http_status,
        body: JSON.stringify({
            error: error.endsWith('Error') ? error.replace('Error', '') : error,
            error_description,
            error_code: error_code,
        }),
    };
}
