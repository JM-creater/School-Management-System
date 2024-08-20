import moment from "moment";

export interface TeacherData {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    dateOfBirth: moment.Moment;
    employmentDate: moment.Moment;
    address: string;
    classroom_id: number,
    classroom: {
        id: number;
    };
};