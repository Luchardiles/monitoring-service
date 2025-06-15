const { Server } = require("@grpc/grpc-js");
const { grpcErrorHandler } = require("./middlewares/grpcErrorHandlerMiddleware");
const loadProto = require("./utils/loadProto");
const monitoringService = require("./services/monitoringService");

const server = new Server();
const proto = loadProto("monitoring");
server.addService(proto.Monitoring.service, monitoringService);

// Inicializa manejo global de errores y consumidores de RabbitMQ
grpcErrorHandler(server);

module.exports = server;