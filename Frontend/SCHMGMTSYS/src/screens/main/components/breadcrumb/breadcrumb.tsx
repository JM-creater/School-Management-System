import { Breadcrumb } from "antd";
import { breadcrumbStyle } from "../../themes/main-styles";
import React from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { useItemMenu } from "../../../../hooks/use-item-menu";

export const BreadcrumbComponent: React.FC = () => {

  const { selectedKeyMenu, handleClickBreadCrumb } = useItemMenu();

  return (
    <Breadcrumb 
      style={breadcrumbStyle}
      separator="/"
      items={[
        {
          onClick: () => handleClickBreadCrumb('1'),
          title: (
            <React.Fragment>
              <DashboardOutlined />
              <span className="breadcrumb-item-nav">Dashboard</span>
            </React.Fragment>
          )
        },
        ...(selectedKeyMenu === '2' ? [{
          onClick: () => handleClickBreadCrumb('2'),
          title: <span className="breadcrumb-item-nav">Students</span>,
        }] : []),
        ...(selectedKeyMenu === '3' ? [{
          onClick: () => handleClickBreadCrumb('3'),
          title: <span className="breadcrumb-item-nav">Faculty</span>,
        }] : []),
        ...(selectedKeyMenu === '4' ? [{
          onClick: () => handleClickBreadCrumb('4'),
          title: <span className="breadcrumb-item-nav">Course</span>,
        }] : []),
        ...(selectedKeyMenu === '5' ? [{
          onClick: () => handleClickBreadCrumb('5'),
          title: <span className="breadcrumb-item-nav">Class</span>,
        }] : []),
        ...(selectedKeyMenu === '6' ? [{
          onClick: () => handleClickBreadCrumb('6'),
          title: <span className="breadcrumb-item-nav">Attendance</span>,
        }] : []),
        ...(selectedKeyMenu === '7' ? [{
          onClick: () => handleClickBreadCrumb('7'),
          title: <span className="breadcrumb-item-nav">Parents</span>,
        }] : []),
      ]}
    />
  );
};
