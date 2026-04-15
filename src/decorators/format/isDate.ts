import { createPatternDecorator } from '../factory.js';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// later switch with ajv-format directly
export const IsDate = createPatternDecorator(
	dateRegex,
	'The property is not a valid date.'
);