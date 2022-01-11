import { useHistory } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import styled from "styled-components";
import Constants from "../_shared/constants";

const Header: React.FC = () => {
    const history = useHistory();

    return (
        <StyledContent>
            <div className="profile menu-item">
                <div className="col">
                    <div className="title">Change Info</div>
                    <div className="caption">Changes will be reflected to every services</div>
                </div>
            </div>
        </StyledContent>
    );
};

const StyledContent = styled(Card.Content)`
    .profile .row {
        justify-content: space-between;
        align-items: center;
    }
    .profile.menu-item .title {
        font-family: Noto Sans;
        font-style: normal;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.darkText};
    }

    .profile.menu-item .caption {
        margin-top: 0.906rem;
        font-family: Noto Sans;
        font-weight: normal;
        font-size: 0.825rem;
        color: ${({ theme }) => theme.lighterText};
    }
`;

export default Header;
