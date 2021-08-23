import { AuthRouterModule } from './auth/auth-router';
import { ClienteRouterModule } from './cliente/cliente-router';
import { UserRouterModule } from './user/user-router';

export interface FeaturedModuleRouter {
    moduleName: any;
    parser: string;
}

export class ModulesRouterMapper {
    
    public registeredModules: Array<FeaturedModuleRouter> = [
        {
            moduleName: AuthRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: ClienteRouterModule,
            parser: 'getRoutesFromModules'
        },
        {
            moduleName: UserRouterModule,
            parser: 'getRoutesFromModules'
        }
    ];
}