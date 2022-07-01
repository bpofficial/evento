import { formatError, formatResponse } from '@evento/api-utils';
import { FormModel, ValidatorModel } from '@evento/models';
import { APIGatewayEvent } from 'aws-lambda';
import { ObjectId } from 'mongodb';
import { formDb } from '../../mongo';

export async function asyncFieldValidation(event: APIGatewayEvent) {
    // GET /api/v1/forms/:formId/validate?key=ABC&value=XYZ
    try {
        const formId = event.pathParameters?.formId;
        if (!formId) {
            return formatError('Not Found', 'Path does not exist', 404);
        }

        const key = event.queryStringParameters?.key;
        const value = event?.queryStringParameters?.value ?? null;

        if (!key) {
            return formatError(
                'Bad Request',
                `Expected at string in the 'key' query parameter field.`,
                400
            );
        }

        const db = await formDb();
        const rawform = await db.collections.Forms.findOne({
            _id: new ObjectId(formId),
        });
        if (!rawform) {
            return formatError('Not Found', 'Form not found', 404);
        }

        const form = FormModel.fromModel(rawform);
        const validators = form.getAsyncValidators();
        if (!validators.has(key)) {
            return formatResponse()(200); // Nothing to validate
        }

        const validatorId = validators.get(key);
        const rawValidator = await db.collections.Validators.findOne({
            _id: new ObjectId(validatorId),
        });
        if (!rawValidator) {
            return formatResponse()(200); // No validator
        }
        const validator = ValidatorModel.fromModel(rawValidator);
        const { code, ...result } = await validator.callValidator(key, value);

        return formatResponse(result)(code);
    } catch (error) {
        return formatError('Internal Server Error', null, 500);
    }
}
