import { Query } from "mongoose";
import { PaginationParamsDto } from "../dtos/paginationParams.dtos";

interface IPaginationModel<T> {
  paramsPagination: PaginationParamsDto;
  model: Query<T[], T, {}, T>;
}

/**
 * Esto toma un query de mongoose y retorna un resultado paginado, basado en el skip
 * o limit.
 * @param model - Query<T[], T, {}, T>
 * @param {paramsPagination}  - skip, limit
 *
 * Si en todo caso estos parametros son null se retorna una lista de todos los elementos.
 * En caso contrario se evalua que parametros llegan, se retorna una lista segun el skip y limit.
 * @returns Retorna una promesa con el resultado paginado.
 */

export const PaginationModel = async <T>({
  paramsPagination,
  model
}: IPaginationModel<T>): Promise<T[]> => {
  const { skip, limit } = paramsPagination;
  if (!skip && !limit) return await model;

  if (skip && limit) model.skip(Number(skip * limit)).limit(Number(limit));

  return await model;
};
