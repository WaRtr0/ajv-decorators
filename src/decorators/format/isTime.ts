import { createPatternDecorator } from '../factory.js';

const timeRegex = /^\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/i;

// later switch with ajv-format directly

export const IsTime = createPatternDecorator(
	timeRegex,
	'The property is not a valid time.'
);