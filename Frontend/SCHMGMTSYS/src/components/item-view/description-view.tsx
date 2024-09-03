import { fontWeightText, marginBottomStyles } from "../../screens/dashboard/themes/dashboard-styles";
import { DescriptionItemProps } from "../../screens/parents/data/parents";

export const DescriptionItem = (props: DescriptionItemProps) => {
    const { title, content } = props;

    return (
      <div className="site-description-item-profile-wrapper" style={marginBottomStyles}>
        <p className="site-description-item-profile-p-label" style={fontWeightText}>{title}:</p>
        {content}
      </div>
    )
  };