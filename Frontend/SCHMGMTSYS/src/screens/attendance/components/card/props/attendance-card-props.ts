export interface AttendanceCardProps {
    countPresent: number;
    countLate: number;
    countAbsent: number;
    isSelectDisabled: boolean;
    handleFilterChange: (
        value: string
    ) => void;
};