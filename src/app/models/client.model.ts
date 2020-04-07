import { ApiService } from 'src/app/services/api.service';
import { FunctionsService } from 'src/app/services/functions.service';

export class Client {
    public api: ApiService;
    public functions: FunctionsService;

    constructor() {}
}