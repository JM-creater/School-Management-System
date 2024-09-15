import { observer } from "mobx-react-lite"
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { SpinnerProps } from "../../configs/props";
import * as styles from "./style";

export const Spinner = observer((props: SpinnerProps) => {
    const { isLoading } = props;
    return (
        <React.Fragment>
            <div style={styles.overlayStyle}>
                <ClipLoader 
                    size={100} 
                    color="blue" 
                    loading={isLoading} 
                />
            </div>
        </React.Fragment>
    )
});
