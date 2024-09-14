import { 
    DashboardOutlined, 
    FileMarkdownOutlined, 
    FileOutlined, 
    GroupOutlined, 
    UnorderedListOutlined, 
    UserAddOutlined, 
    UsergroupAddOutlined 
} from '@ant-design/icons';
import { 
    ATTENDANCE_ITEM, 
    CLASS_ITEM, 
    COURSE_ITEM, 
    CURRICULUM_ITEM, 
    DASHBOARD_ITEM, 
    FACULTY_ITEM, 
    FIVE_ITEM, 
    FOUR_ITEM, 
    ONE_ITEM, 
    PARENTS_ITEM, 
    SEVEN_ITEM, 
    SIX_ITEM, 
    STUDENT_ITEM, 
    SUB1_ITEM, 
    THREE_ITEM, 
    TWO_ITEM 
} from '../../../../configs';
import { MenuItem } from '../../../../configs/interface';

export function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: () => void
) : MenuItem {
    return {
        key,
        icon,
        children,
        label,
        onClick
    }
};

export const items: MenuItem[] = [
    getItem(DASHBOARD_ITEM, ONE_ITEM, <DashboardOutlined />),
    getItem(STUDENT_ITEM, TWO_ITEM, <UserAddOutlined />),
    getItem(FACULTY_ITEM, THREE_ITEM, <UserAddOutlined />),
    getItem(CURRICULUM_ITEM, SUB1_ITEM, <GroupOutlined />, [
        getItem(COURSE_ITEM, FOUR_ITEM, <FileOutlined />),
        getItem(CLASS_ITEM, FIVE_ITEM, <UnorderedListOutlined />)
    ]),
    getItem(ATTENDANCE_ITEM, SIX_ITEM, <FileMarkdownOutlined />),
    getItem(PARENTS_ITEM, SEVEN_ITEM, <UsergroupAddOutlined />)
];