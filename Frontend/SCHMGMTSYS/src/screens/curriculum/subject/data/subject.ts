export interface SubjectData {
    id: number,
    name: string,
    code: string,
    credits: number,
    teacher_id: number,
    teacher: {
        id: number
    }
}