const {catchGrpc} = require('../utils/catchGrpc');
const Action = require('../models/actionModel');
const Error = require('../models/errorModel');
const AppError = require('../utils/appError');

const ListActions = catchGrpc(async (call, callback) => {
    const actions = await Action.find ({})
        .sort({ actionDate: -1 })
        .exec();
        callback(null, {
            actions
        });
    }
);

const ListErrors = catchGrpc(async (call, callback) => {
    const errors = await Error.find({})
        .sort({ errorDate: -1 })
        .exec();
    callback(null, {
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
    callback(null, actionCreated);
});

const CreateError = catchGrpc(async (call, callback) => {
    const { userId, userEmail, error } = call.request;
    const errorCreated = await Error.create({
        userId,
        userEmail,
        errorDate: new Date(),
        error
    });
    callback(null, errorCreated);
});

module.exports = {
    ListActions,
    ListErrors,
    CreateAction,
    CreateError
};
