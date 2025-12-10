import { HolidayType } from '../models/enums';
export declare class CreateHolidayDto {
    type: HolidayType;
    startDate: Date;
    endDate?: Date;
    name?: string;
    active?: boolean;
}
