const Joi = require('joi');

module.exports = Joi.object({
  title: Joi.string().min(1)
    .required()
    .messages({
      'any.required': 'Le titre est un champ obligatoire',
      'string.empty': 'Le titre doit être rempli',
      'string.base': 'Le titre doit être de type texte',
      'string.min': 'Le titre ne doit pas être vide',
    }),
  date: Joi.date()
    .messages({
      'any.required': 'La date  est un champ obligatoire',
      'string.empty': 'La date doit être remplie',
      'date.base': 'Veuillez entrer une date valide',

    }),
  context: Joi.string().allow(null)
    .messages({
      'string.base': 'Le format du champ contexte est invalide',
    }),
  fixed: Joi.boolean().allow(null),
  categoryId: Joi.number().integer().min(1).required()
    .messages({
      'integer.base': 'Erreur format catégorie',
    }),
  paragraphs: Joi.array().items({
    content: Joi.string().required().min(1)
      .messages({
        'string.min': 'Le contenu du paragraphe ne doit pas être vide',
      }),
    important: Joi.boolean(),
  }),
  links: Joi.array().items({
    address: Joi.string().uri().required(),
  }),
  keywords: Joi.array().items({
    label: Joi.string().required(),
  }),
  captures: Joi.array().items({
    path: Joi.string().required(),
  }),
});
