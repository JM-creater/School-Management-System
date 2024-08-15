import { Space } from "antd";
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
            <a onClick={() => {
                    markStudentPresentAttendance(record.id, PRESENT);
                    markStudentPresentStatus(record.id, PRESENT);
                }}
            >
                Present
            </a>
            <a onClick={() => {
                    markStudentLateAttendance(record.id, LATE);
                    markStudentLateStatus(record.id, LATE);
                }}
            >
                Late
            </a>
            <a onClick={() => { 
                    markStudentAbsentAttendance(record.id, ABSENT);
                    markStudentAbsentStatus(record.id, ABSENT);
                }}
            >
                Absent
            </a>
        </Space>
      ),
    },
  ];
}