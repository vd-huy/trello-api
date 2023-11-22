import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCodition = Joi.object({
    tittle: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    console.log(req.body);

    // kiem tra du lieu
    //chỉ định { abortEarly: false } trường hợp có nhiều lỗi validation  thì trả về tất cả lỗi
    await correctCodition.validateAsync(req.body, { abortEarly: false });

    //validate du lieu xong xuoi hop le thi cho request di tiep sang controller
    next();
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
