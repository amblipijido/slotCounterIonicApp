import { TeamModel } from './team.model';

export interface DriverModel {
    id?: string;
    alias: string;
    email: string;
    name: string;
    surname: string;
    createdAt: Date;
    team?: TeamModel;
    birthDate: Date;
}
