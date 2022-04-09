import { Request, Response, NextFunction } from 'express';

export const validateRequiredData = (req: Request, res: Response, next: NextFunction) => {
  //saber que ruta esta llamando
  const currentRoute = req.path

  // campos requeridos por cada ruta
  const requiredFields = {
    '/auth/register': ['email', 'nickname', 'password', 'sexo', 'name'],
  }

  const requiredFieldsArray = requiredFields[currentRoute] || []

  const isRequired = requiredFieldsArray.find(field => !req.body[field])

  if (isRequired)
    return res.status(400).json({
      status: 'error',
      message: `The field '${isRequired}' is required.`,
    })
  else next()

};