import * as Joi from 'joi';

const ValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'testing'),
  port: Joi.number().default(3000),
  redisPort: Joi.number().default(6379),

});

export default ValidationSchema;
