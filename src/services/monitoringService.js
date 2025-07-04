const {catchGrpc} = require('../utils/catchGrpc');
const Action = require('../models/actionModel');
const Error = require('../models/errorModel');
const AppError = require('../utils/appError');

const ListActions = catchGrpc(async (call, callback) => {
    const { requestorRole } = call.request;
    if (requestorRole !== "Administrador") {
        return callback(AppError("Permission denied", 403));
    }
    const actions = await Action.find ({})
        .sort({ actionDate: -1 })
        .exec();
        callback(null, {
            status: 200,
            actions
        });
    }
);

const ListErrors = catchGrpc(async (call, callback) => {
    const { requestorRole } = call.request;
    if (requestorRole !== "Administrador") {
        return callback(AppError("Permission denied", 403));
    }
    const errors = await Error.find({})
        .sort({ errorDate: -1 })
        .exec();
    callback(null, {
        status: 200,
        errors
    });
});

const CreateAction = catchGrpc(async (call, callback) => {
    const { userId, URLMethod, userEmail, action } = call.request;
    const actionCreated = await Action.create({
        userId,
        URLMethod,
        userEmail,
        actionDate : new Date(),
        action
    });
    callback(null, { status: 200, action: actionCreated });
});

const CreateError = catchGrpc(async (call, callback) => {
    const { userId, userEmail, error } = call.request;
    const errorCreated = await Error.create({
        userId,
        userEmail,
        errorDate: new Date(),
        error
    });
    callback(null, { status: 200, error: errorCreated });
});

module.exports = {
    ListActions,
    ListErrors,
    CreateAction,
    CreateError
};
