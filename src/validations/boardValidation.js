import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCodition = Joi.object({
    tittle: Joi.string().required().min(3).max(50).trim().strict().message({
      "any. required": "Title is required ",
      "string. empty": "Title is not allowed to be empty ",
      "string.min": "Title length must be at least 3 characters long ",
      "string.max":
        "Title length must be less than or equal to 5 characters tong  ",
      "string. trim": "Title must not have leading or trailing whitespace  ",
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });

  try {
    console.log(req.body);

    // kiem tra du lieu
    //chỉ định { abortEarly: false } trường hợp có nhiều lỗi validation  thì trả về tất cả lỗi
    await correctCodition.validateAsync(req.body, { abortEarly: false });

    //validation du lieu hop le thi cho request di tiep sang Controller
    next();
  } catch (error) {
    const errorMessage = new Error(error).message;
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
