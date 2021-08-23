import { BaseRouterModule, ModuleEndPointMap } from "../../core/router/base-router-module";
import ResponseHandlers from '../../core/handlers/response-handlers';
import { Request, Response } from 'express';
import { ClienteServices } from './cliente-services';

export class ClienteRouterModule extends BaseRouterModule {
    
    constructor() {
        super('cliente');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            get: [
                {
                    endPoint: `${ this.getUrlBase() }/find`,
                    callback: this.find,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/list`,
                    callback: this.list,
                    isProtected: true
                },
                {
                    endPoint: `${ this.getUrlBase() }/overdue`,
                    callback: this.overdue,
                    isProtected: true
                }
            ]
        }
    };

    async find(req: Request, res: Response) {
        const { id } = req.query;
        try {
            const c = await new ClienteServices().getById(id);
            ResponseHandlers.onSuccess(res, c);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao obter os dados do cliente', 'no-infoCliente');
        }
    }

    async list(req: Request, res: Response) {
        try {
            const c = await new ClienteServices().getAll();
            ResponseHandlers.onSuccess(res, c);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao obter a listagem de clientes', 'no-infoCliente');
        }
    }

    async overdue(req: Request, res: Response) {
        try {
            const c = await new ClienteServices().getAllOverdue();
            ResponseHandlers.onSuccess(res, c);
        } catch (error) {
            return ResponseHandlers.onError(res, 'Erro ao obter a listagem de clientes', 'no-infoCliente');
        }
    }

}