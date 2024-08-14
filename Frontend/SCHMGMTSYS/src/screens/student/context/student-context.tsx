import { createContext, useState } from "react";
import { StudentContextTypes } from "../types/student-types";
import { StudentProps } from "./props/student-props";
import { StudentData } from "../data/student";

export const StudentContext = createContext<StudentContextTypes | null>(null);

export const StudentProvider: React.FC<StudentProps> = ({ children }) => {

    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    

    const handleValue = {
        students,
        loading,
        error
    };

    return (
        <StudentContext.Provider value={handleValue}>
            {children}
        </StudentContext.Provider>
    )
}