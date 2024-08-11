import styled from "styled-components";

export const marginBottomStyles: React.CSSProperties = {
    marginBottom: 12
}

export const spaceBetweenStyles: React.CSSProperties = {
    justifyContent: 'space-around'
}

export const pieStyles: React.CSSProperties = {
    position: 'relative',
    height: '40vh', 
    width: '80vw'
}

export const buttonWidthStyles: React.CSSProperties = {
    width: '180px',
    padding: '18px'
}


// * styled components

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
