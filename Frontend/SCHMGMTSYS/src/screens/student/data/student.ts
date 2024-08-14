import moment from "moment"

export interface StudentData {
    id: number,
    firstName: string,
    lastName: string,
    dateOfBirth: moment.Moment,
    gender: string,
    address: string,
    email: string,
    phoneNumber: string,
    enrollmentDate: moment.Moment,
    parent_id: number
    parent: {
        id: number
    }
    classroom_id: number,
    classroom: {
        id: number
    }
}