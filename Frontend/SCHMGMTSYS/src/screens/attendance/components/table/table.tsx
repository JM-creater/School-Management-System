import { Space, Button } from "antd";
import { useAttendance } from "../../../../hooks/use-attendance";
import { StudentData } from "../../../student/data/student";
import { ABSENT, LATE, PRESENT } from "../../constant.ts/status";

export const AttendanceTable = () => {
    const {
        markStudentAbsentStatus,
        markStudentLateStatus,
        markStudentPresentStatus,
        markStudentAbsentAttendance,
        markStudentLateAttendance,
        markStudentPresentAttendance
    } = useAttendance();
    
    return [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record: StudentData) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => {
                            if (!record.isAttendance) {
                                markStudentPresentAttendance(record.id, PRESENT);
                                markStudentPresentStatus(record.id, PRESENT);
                            }
                        }}
                        disabled={record.isAttendance}
                    >
                        Present
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            if (!record.isAttendance) {
                                markStudentLateAttendance(record.id, LATE);
                                markStudentLateStatus(record.id, LATE);
                            }
                        }}
                        disabled={record.isAttendance}
                    >
                        Late
                    </Button>
                    <Button
                        type="link"
                        onClick={() => {
                            if (!record.isAttendance) {
                                markStudentAbsentAttendance(record.id, ABSENT);
                                markStudentAbsentStatus(record.id, ABSENT);
                            }
                        }}
                        disabled={record.isAttendance}
                    >
                        Absent
                    </Button>
                </Space>
            ),
        },
    ];
};
