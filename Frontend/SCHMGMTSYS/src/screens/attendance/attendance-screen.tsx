import { Spin, Table } from 'antd'
import React, { useState } from 'react'
import { AttendanceTable } from './components/table/table';
import { useAttendance } from '../../hooks/use-attendance';
import { CenteredContainer, ErrorDiv } from '../parents/themes/parents-styles';
import { useStudent } from '../../hooks/use-students';
import { AttendanceCard } from './components/card/attendance-card';

export const AttendanceScreen: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);
  const {
    students
  } = useStudent();
  const {
    error,
    loading,
    markedStudents
  } = useAttendance();
  const {
    countAbsent,
    countLate,
    countPresent
  } = useStudent();
  const columns = AttendanceTable();

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const filteredStudents = students.filter(student => {
    if (markedStudents.includes(student.id)) return false; 
    if (!filterStatus) return !student.isAttendance;
    return student.status === filterStatus;
  });

  const hasAttendanceData = students.some(student => student.isAttendance);
  const isSelectDisabled = !hasAttendanceData;

  return (
   <React.Fragment>
      <React.Fragment>
        <AttendanceCard
          countPresent={countPresent}
          countLate={countLate}
          countAbsent={countAbsent}
          isSelectDisabled={isSelectDisabled}
          handleFilterChange={handleFilterChange}
        />
      </React.Fragment>
      <React.Fragment>
        {
          loading ? (
            <CenteredContainer>
                <Spin size="large" />
            </CenteredContainer>
          ) : error ? (
            <ErrorDiv>{error}</ErrorDiv>
          ) : (
            <React.Fragment>
              <Table 
                columns={columns} 
                dataSource={filteredStudents} 
              />
            </React.Fragment>
          )
        }
      </React.Fragment>
   </React.Fragment>
  )
};
