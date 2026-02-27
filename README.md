# AJV Decorators

**A class-validator-like experience that compiles down to blazing-fast pure JSON schemas for AJV.**

`ajv-decorators` is a lightweight library designed to bridge the gap between elegant Object-Oriented code readability and extreme runtime performance. 

---

## The Problem It Solves

When building Node.js applications, you often face a dilemma for data validation:
1. **Raw JSON Schemas (AJV)**: They are incredibly fast (the fastest available), but writing and maintaining massive JSON objects by hand is tedious, error-prone, and hard to read.
2. **class-validator**: It offers an amazing Developer Experience (DX) using TypeScript classes and decorators, but it is notoriously slow and adds significant overhead at runtime.

**`ajv-decorators` gives you the best of both worlds.** You define your Data Transfer Objects (DTOs) using clean, highly readable classes and decorators. Then, our generator compiles them into standard, highly optimized JSON schemas that AJV can consume.

---

## Installation

```bash
npm install ajv-decorators reflect-metadata
# Make sure you also have ajv installed in your project
npm install ajv

```

*Note: You must enable `experimentalDecorators` and `emitDecoratorMetadata` in your `tsconfig.json`.*

## Quick Start

Here is how you can define a schema using decorators and generate the AJV-compatible JSON object:

```typescript
import Ajv from 'ajv';
import { 
  IsString, 
  MinLength, 
  IsRequired, 
  IsInt, 
  Minimum, 
  generateSchema 
} from 'ajv-decorators';

// 1. Define your DTO using clean decorators
class UserDto {
  @IsString()
  @MinLength(3)
  @IsRequired()
  username: string;

  @IsInt()
  @Minimum(18)
  age: number;
}

// 2. Generate the pure JSON Schema
const userSchema = generateSchema(UserDto);

/* userSchema now holds a pure JSON object:
{
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    age: { type: 'integer', minimum: 18 }
  },
  required: ['username']
}
*/

// 3. Compile and validate with AJV at full speed
const ajv = new Ajv();
const validate = ajv.compile(userSchema);

const isValid = validate({ username: 'Alex', age: 25 });

```

## Available Decorators

The library includes a comprehensive set of decorators that map directly to JSON Schema keywords:

* **Common**: `@IsRequired()`, `@IsEnum()`, `@IsNullable()`
* **Strings**: `@IsString()`, `@MinLength()`, `@MaxLength()`
* **Numbers**: `@IsNumber()`, `@IsInt()`, `@Minimum()`, `@Maximum()`, `@ExclusiveMinimum()`, `@ExclusiveMaximum()`
* **Booleans**: `@IsBoolean()`
* **Arrays**: `@IsArray()`, `@MinItems()`, `@MaxItems()`, `@UniqueItems()`
* **Objects / Nested DTOs**: `@IsObject()`, `@MinProperties()`, `@MaxProperties()`, `@AdditionalProperties()`
* **Formats**: `@IsEmail()`, `@IsRange()`

## Custom Validators

Need to validate something specific? You can easily create your own custom decorators and register them with AJV:

```typescript
import { createCustomValidator, registerValidators } from 'ajv-decorators';

// Create a custom decorator
export const IsStrongPassword = createCustomValidator<string>(
  'is-strong-password', // the AJV keyword
  (value) => typeof value === 'string' && value.length > 8 && /[A-Z]/.test(value),
  'The password is not strong enough.'
);

// Apply it to your DTO
class RegisterDto {
  @IsStrongPassword()
  password: string;
}

// Don't forget to register your custom keywords with your AJV instance!
const ajv = new Ajv();
registerValidators(ajv);

```

## Perfect match for Fastify

If you are a Fastify user, `ajv-decorators` pairs incredibly well with **[fastify-oop-decorators](https://www.google.com/search?q=https://github.com/WaRtr0/fastify-oop-decorators)**. You can build your entire application architecture and DTOs using elegant classes, while feeding Fastify the pure JSON schemas it needs to keep its routing and validation insanely fast.

## Contributing

Contributions, issues, and feature requests are welcome!
If this library helps you write cleaner, faster code, please consider leaving a star (⭐).
