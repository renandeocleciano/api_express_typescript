import { BaseRouterModule, ModuleEndPointMap } from "../../core/router/base-router-module";
import ResponseHandlers from '../../core/handlers/response-handlers';
import { Request, Response } from 'express';
import { UserServices } from './user-services';
import UserValidators from '../../core/validator/user-validator';

export class UserRouterModule extends BaseRouterModule {
    
    constructor() {
        super('user');
    }

    protected MODULES_ENDPOINT_MAP: ModuleEndPointMap = {
        [this.moduleName]: {
            get: [
                {
                    endPoint: `${ this.getUrlBase() }/find`,
                    callback: this.find,
                    isProtected: true
                }
            ],
            post: [
                {
                    endPoint: `${ this.getUrlBase() }/add`,
                    callback: this.add,
                    isProtected: false
                }
            ]
        }
    };

    async find(req: Request, res: Response) {
        const { id } = req.body;
        var result = UserValidators.getUserValidate(req.body);
        if(result.success){
            try {
                const user = await new UserServices().getById(id);
                ResponseHandlers.onSuccess(res, user);
            } catch (error) {
                return ResponseHandlers.onError(res, 'Erro ao obter os dados do usuário', 'no-infoUser');
            }
        }else{
            return ResponseHandlers.onError(res, result.response.errorMessage, 'no-userId');
        }
    }

    async add(req: Request, res: Response) {
        var result = UserValidators.addUserValidate(req.body);
        if(result.success) {
            try {
                const user = await new UserServices().addUser(req.body);
                ResponseHandlers.onSuccess(res, user);
            } catch (error) {
                return ResponseHandlers.onError(res, 'Erro ao cadastrar os dados do usuário', 'no-infoUser');
            }
        }else {
            return ResponseHandlers.onError(res, result.response.errorMessage, 'add-user');
        }
    }
}