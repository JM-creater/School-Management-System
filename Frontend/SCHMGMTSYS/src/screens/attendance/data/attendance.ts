export interface AttendanceData {
    id: number;                 // Unique identifier for the attendance record
    student: {
      id: number;
    };        
    status: string; 
    isAttendance: boolean;    
}