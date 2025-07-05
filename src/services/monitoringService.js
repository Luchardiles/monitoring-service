const {catchGrpc} = require('../utils/catchGrpc');
const Action = require('../models/actionModel');
const Error = require('../models/errorModel');
const AppError = require('../utils/appError');
const { connectMongo, closeMongo } = require('../database/mongooseConfig');

const ListActions = catchGrpc(async (call, callback) => {
    const { requestorRole } = call.request;
    if (requestorRole !== "Administrador") {
        return callback(AppError("Permission denied", 403));
    }
    await connectMongo();
    const actions = await Action.find ({})
        .sort({ actionDate: -1 })
        .exec();
    await closeMongo();
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
    await connectMongo();
    const errors = await Error.find({})
        .sort({ errorDate: -1 })
        .exec();
    await closeMongo();
    callback(null, {
        status: 200,
        errors
    });
});

const CreateAction = catchGrpc(async (call, callback) => {
    const { userId, URLMethod, userEmail, action } = call.request;
    await connectMongo();
    const actionCreated = await Action.create({
        userId,
        URLMethod,
        userEmail,
        actionDate : new Date(),
        action
    });
    await closeMongo();
    callback(null, { status: 200, action: actionCreated });
});

const CreateError = catchGrpc(async (call, callback) => {
    const { userId, userEmail, error } = call.request;
    console.log("Creating error with userId:", userId, "userEmail:", userEmail, "error:", error);
    await connectMongo();
    const errorCreated = await Error.create({
        _id: null,
        userId: userId? userId : null,
        userEmail: userEmail? userEmail : null,
        errorDate: new Date(),
        error: error
    });
    console.log("Error created:", errorCreated);
    await closeMongo();
    callback(null, { status: 200, error: errorCreated });
});

module.exports = {
    ListActions,
    ListErrors,
    CreateAction,
    CreateError
};
