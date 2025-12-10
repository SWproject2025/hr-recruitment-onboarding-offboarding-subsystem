import { PayrollConfigurationService } from '../../payroll-configuration.service';
import { CreateCompanyWideSettingDto } from '../../dtos/createCompanyWideSetting.dto';
import { UpdateCompanyWideSettingDto } from '../../dtos/updateCompanyWideSetting.dto';
export declare class CompanyWideSettingsController {
    private service;
    constructor(service: PayrollConfigurationService);
    update(id: string, updateCompanyWideSettingDto: UpdateCompanyWideSettingDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("../../models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("../../models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    get(): Promise<import("../../models/CompanyWideSettings.schema").CompanyWideSettings[]>;
    getOne(id: string): Promise<import("../../models/CompanyWideSettings.schema").CompanyWideSettings>;
    create(createCompanyWideSettingDto: CreateCompanyWideSettingDto, id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("../../models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, {}> & import("mongoose").Document<unknown, {}, import("../../models/CompanyWideSettings.schema").CompanyWideSettings, {}, {}> & import("../../models/CompanyWideSettings.schema").CompanyWideSettings & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
