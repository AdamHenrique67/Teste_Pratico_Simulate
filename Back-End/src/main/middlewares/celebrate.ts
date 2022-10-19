import { celebrate, Joi, Segments } from 'celebrate';

export const validationReq =  celebrate({
  [Segments.BODY]: {
    registro: Joi.string().required().messages({
      'string.empty': 'O campo registro é obrigatório!',
      'any.required': 'O campo registro é obrigatório!'
    }),
    quantidadeBeneficiarios: Joi.number().min(1).required(),
    pessoas: Joi.array().items(
      Joi.object().keys({
        id: Joi.number().messages({
          'string.empty': 'O campo id é obrigatório para cada Pessoa!',
          'any.required': 'O campo id é obrigatório!'
        }),
        nome: Joi.string().required().messages({
          'string.empty': 'O campo nome é obrigatório!',
          'any.required': 'O campo nome é obrigatório!'
        }),
        idade: Joi.number().min(0).required().messages({
          'number.min': 'A idade deve ser maior ou igual a zero',
          'any.required': 'O campo idade é obrigatório!'
        }),
    })).min(1).required().messages({
      'array.min': 'É necessário informar pelo menos uma pessoa',
      'any.required': 'O campo pessoas é obrigatório!'
    }),
  },
})