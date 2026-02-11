import * as model from "../models/dueno.model";

export const listDuenos = async () => {
  return model.getAllDuenos();
};
