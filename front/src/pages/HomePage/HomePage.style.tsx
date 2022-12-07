import { COLORS } from "constants/colors";
import styled, { keyframes } from "styled-components";

export const MainPageStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: fit-content;
    padding-bottom: 100px;
    overflow: visible;
`;

export const ContentStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 1340px;
    padding: 20px 0;

    h1 {
        color: #ffffff99;
        font-size: 80px;
    }

    h3 {
        color: #525252;
    }
`;

export const ProductsStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 420px);
    gap: 16px;
`;

export const TableStyled = styled.div`
    display: flex;
    gap: 40px;
    width: 100%;
    margin-top: 60px;
    overflow: visible;
`;
const rotateAnimation = keyframes`
0%{
transform: rotate(0deg) scale(1, 1);
}

50%{
    transform: rotate(180deg) scale(1.5, 1.5);

}

to {
    transform: rotate(360deg) scale(1, 1);
}
`;

export const BannerStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${COLORS.BorderColor};
    border-radius: 200px;
    width: 360px;
    height: 100%;
    max-height: 500px;
    font-style: italic;

    font-size: 40px;
    color: #ff2e51;
    text-align: center;

    background-color: yellow;

    animation: ${rotateAnimation} infinite 6s linear;
`;

export const NothingStyled = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.TextGrey};
    font-size: 20px;
    font-weight: 300;
`;

export const RightContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
`;
