import { Request, Response, NextFunction } from "express";

export const validateRequiredData = (req: Request, res: Response, next: NextFunction) => {
  //saber que ruta esta llamando
  const currentRoute = req.path;
  // campos requeridos por cada ruta
  const requiredFields = {
    "/auth/register": ["email", "nickname", "password", "sexo", "name"]
  };

  const requiredFieldsArray = requiredFields[currentRoute] || [];

  const isRequired = requiredFieldsArray.find((field: string) => !req.body[field]);

  if (isRequired) {
    res.send({
      status: "error",
      message: `The field ${isRequired} is required.`
    });
  } else {
    next();
  }
};
