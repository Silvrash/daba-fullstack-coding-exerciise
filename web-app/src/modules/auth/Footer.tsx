import { Button } from "semantic-ui-react";
import styled from "styled-components";

interface FooterProps {
    membershipText: string;
    linkText: string;
    handleLink: () => void;
}
const Footer: React.FC<FooterProps> = ({ membershipText, linkText, handleLink }) => {
    return (
        <StyledDiv>
            <div className="or">or continue with these social profile</div>

            <div className="btn-group">
                <Button basic color="grey" size="small" circular icon="google" />
                <Button basic color="grey" size="small" circular icon="facebook" />
                <Button basic color="grey" size="small" circular icon="twitter" />
                <Button basic color="grey" size="small" circular icon="github" />
            </div>

            <div className="or">
                {membershipText}
                <a onClick={handleLink}>{linkText}</a>
            </div>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    .btn-group {
        display: flex;
        justify-content: space-between;
        width: 80%;
        margin: 1.5rem auto;
    }

    .or {
        font-family: Noto Sans;
        font-style: normal;
        font-weight: normal;
        font-size: 0.865rem;
        text-align: center;
        margin-top: 1.938rem;
        color: ${({ theme }) => theme.lighterText};
    }

    a {
        margin-left: 0.3rem;
    }
`;

export default Footer;
