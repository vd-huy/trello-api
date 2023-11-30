import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { boardService } from "~/services/boardService";

const createNew = async (req, res, next) => {
  try {
    // console.log("req.body:", req.body);

    // dieu huong sang tang service
    const createdBoard = await boardService.createNew(req.body);

    // throw new ApiError(StatusCodes.BAD_GATEWAY, "test error");

    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    next(error);
  }
};

export const boardController = {
  createNew,
};
