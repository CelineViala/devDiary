const Joi = require('joi');

module.exports = Joi.object({
  content: Joi.string().min(3)
    .required()
    .messages({
      'any.required': 'Le contenu est un champ obligatoire',
      'string.empty': 'Le contenu doit être rempli',
      'string.base': 'Le contenu doit être de type texte',
      'string.min': 'Le contenu ne doit pas être vide',
    }),
  diary_entry_id: Joi.number().min(1),
});
