export interface MenuItemContextType {
    handleChangeHeader: (item: number) => void;
    renderHeader: () => JSX.Element | null;
    handleClickBreadCrumb: (item: string) => void;
    handleChangeKey: (e: { key: string }) => void;
    renderContent: () => JSX.Element | null;
    selectedKeyMenu: string;
}