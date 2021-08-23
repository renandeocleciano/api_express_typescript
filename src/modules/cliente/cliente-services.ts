const clienteEntities = require('../../entities/cliente');
import Helpers from '../../core/helpers/common';

export class ClienteServices {
    constructor() {
    }

    addCliente(cliente: any) {
        return clienteEntities.create(cliente);
    }

    getById(id: string) {
        return clienteEntities.findOne({ _id : id }).exec();
    }

    getAll() {
        return clienteEntities.find({}).exec();
    }

    getAllOverdue() {
        return clienteEntities.find({ titulos: { $elemMatch: { status: 1 }}}).exec();
    }

    getAllLastMonth() {
        return clienteEntities
            .find({ dateEntry : { $gte: Helpers.cutOff() } })
            .sort({ dateEntry: -1})
            .exec();
    }
}