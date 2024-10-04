import { Constants } from "../constants.js";

/** success created */
export const successCreated = (res, msg) => {
  const dataRes = {
    status: 1,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

/** success response with data */
export const SuccessResponse = (res, msg, data) => {
  const dataRes = {
    status: 1,
    message: msg,
    data: data,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

export const NoDataEmptyResponse = (res, msg, data) => {
  const dataRes = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};
export const EmptyResponse = (res, msg, data) => {
  const dataRes = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

/** empty response with data */
export const ErrorEmptyResponse = (res, msg) => {
  const dataRes = {
    status: 0,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

/** success response with data count */
export const SuccessResponseWithCount = (res, msg, data, totRec) => {
  const dataRes = {
    status: 1,
    message: msg,
    totalRecords: totRec,
    data: data,
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

/** error code */
export const ErrorResponse = (res, msg) => {
  const dataRes = {
    status: 0,
    message: msg,
  };
  return res.status(Constants.ERROR_CODES.FAIL_CODE).json(dataRes);
};

/** not found code */
export const ErrorResWithSuccess = (res, msg) => {
  const dataRes = {
    status: 0,
    message: msg,
    data: [],
  };
  return res.status(Constants.ERROR_CODES.SUCCESS_CODE).json(dataRes);
};

/** not found code */
export const notFoundResponse = (res, msg) => {
  const dataRes = {
    status: 0,
    message: msg,
    data: [],
  };
  return res.status(Constants.ERROR_CODES.NOT_FOUND_CODE).json(dataRes);
};

/** not found code */
export const validationErrorWithData = (res, msg, data) => {
  const dataRes = {
    status: 0,
    message: msg,
    data: data,
  };
  return res.status(Constants.ERROR_CODES.REQUIRE_PARAMETER).json(dataRes);
};

