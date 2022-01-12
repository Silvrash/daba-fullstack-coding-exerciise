import styled from "styled-components";

const FooterInfo = () => {
    return (
        <StyledDiv>
            <span>
                created by <span className="username">Silvrash</span>
            </span>

            <span>devChallenges.io</span>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    display: flex;
    justify-content: space-between;

    span {
        font-size: 0.825rem;
        color: ${({ theme }) => theme.darkText};
    }
    .username {
        text-decoration: underline;
        font-weight: 600;
    }
`;

export default FooterInfo;
