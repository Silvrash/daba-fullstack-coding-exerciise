import { Card } from "semantic-ui-react";
import styled from "styled-components";

interface MenuItemProps {
    title: string;
    value: React.ReactChild;
}
const MenuItem: React.FC<MenuItemProps> = ({ title, value }) => {
    return (
        <StyledContent extra className="menu-item">
            <div className="row">
                <div className="title">{title}</div>
                <div className="value">{value}</div>
            </div>
        </StyledContent>
    );
};

const StyledContent = styled(Card.Content)`
    .ui.button {
        height: 2rem;
    }

     .row {
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    .title {
        font-family: Noto Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 0.825rem;
        color: ${({ theme }) => theme.greyText};
    }

    .value {
        font-family: Noto Sans;
        font-style: normal;
        font-weight: 500;
        font-size: 0.9rem;
        color: ${({ theme }) => theme.darkText} !important;
    }
`;

export default MenuItem;
