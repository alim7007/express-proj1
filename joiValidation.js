const baseJoi = require('joi')

// Check for validation of htmls
const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi = baseJoi.extend(extension)

const joiValidation = (data, route) => {
    let schema
    switch(route) {
    case '/register':
        schema = Joi.object({
        name:Joi.string().min(3).required(),
        email:Joi.string().min(3).required().email(),
        password:Joi.string().min(2).required(),
    })
        break;
    case '/login':
        schema = Joi.object({
        email:Joi.string().min(3).required().email(),
        password:Joi.string().min(2).required(),
    })
        break;
    default:
        // code block
    }
    return schema.validate(data)
}

module.exports = joiValidation