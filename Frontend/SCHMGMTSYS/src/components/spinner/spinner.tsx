import { observer } from "mobx-react-lite"
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface SpinnerProps {
    isLoading?: boolean;
}

export const Spinner = observer(({ isLoading }: SpinnerProps) => {
    const isSpinning = isLoading;
    
    return isSpinning ? (
        <React.Fragment>
            <ClipLoader size={50} color="blue" loading={isSpinning} />
        </React.Fragment>
    ) : (
        <></>
    )
});
