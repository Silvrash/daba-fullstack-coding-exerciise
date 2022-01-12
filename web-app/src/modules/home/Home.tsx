import { Children } from "react";
import { Card, Image } from "semantic-ui-react";
import styled from "styled-components";
import Logo from "../_shared/assets/logo.png";
import { FooterInfo } from "../_shared/components";
import { useCurrentUser } from "../_shared/hooks";
import MenuItem from "./MenuItem";
import ProfileMenuItem from "./ProfileMenuItem";
import UserAvatar from "./UserAvatar";

const Home: React.FC = () => {
    const { currentUser } = useCurrentUser();

    const data = [
        {
            title: "PROFILE",
            value: (
                <Image
                    rounded
                    size="tiny"
                    style={{ objectFit: "cover", width: "4rem", height: "4rem" }}
                    src={currentUser?.photo || "https://via.placeholder.com/150"}
                />
            ),
        },
        { title: "NAME", value: currentUser?.name ?? "N/A" },
        { title: "BIO", value: currentUser?.bio ?? "N/A" },
        { title: "PHONE", value: currentUser?.phone ?? "N/A" },
        { title: "EMAIL", value: currentUser?.email ?? "N/A" },
        { title: "PASSWORD", value: "************" },
    ];

    return (
        <StyledDiv>
            <div className="row header">
                <div className="row">
                    <img src={Logo} alt="logo" className="logo" />
                    <div className="logoText"> devchallenges</div>
                </div>
                <UserAvatar />
            </div>

            <div className="page-title">Personal Info</div>
            <div className="page-caption">Basic info, like your name and photo</div>

            <div className="wrapper">
                <Card>
                    <ProfileMenuItem />

                    {Children.toArray(
                        data.map((item) => <MenuItem title={item.title} value={item.value} />)
                    )}
                </Card>
                <FooterInfo />
            </div>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    background: ${({ theme }) => theme.background};
    width: 100%;
    height: 100%;
    padding: 2rem 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .wrapper {
        width: 40%;
    }

    .ui.card {
        background: transparent;
        min-width: 25rem;
        width: 100%;
        border-radius: 0.5rem;
        padding: 0.5rem 0;
    }

    .ui.button {
        border-radius: 0.7rem;
    }

    .ui.card .content {
        padding: 1.5rem 2rem;
    }

    .row {
        display: flex;
    }

    .col {
        display: flex;
        flex-direction: column;
    }

    .user {
        width: 1.5rem !important;
        height: 1.5rem !important;
    }

    .page-title {
        font-family: Noto Sans;
        font-style: normal;
        font-size: 2rem;
        margin-top: 2rem;
        color: ${({ theme }) => theme.darkText};
    }

    .page-caption {
        margin-top: 0.906rem;
        font-family: Noto Sans;
        font-weight: normal;
        font-size: 0.825rem;
        color: ${({ theme }) => theme.lighterText};
    }

    .page-caption {
        font-weight: 300;
        font-size: 0.85rem;
        margin-bottom: 1.5rem;
        color: ${({ theme }) => theme.darkText};
    }

    .header {
        width: 100%;
        justify-content: space-between;
    }

    .logo {
        width: 2.304rem;
        height: 1.304rem;
        object-fit: contain;
    }
    .logoText {
        margin-left: 0.5rem;
        font-weight: 600;
        font-size: 1rem;
    }

    @media screen and (max-width: 981px) {
        padding: 2rem 2rem;

        .ui.card {
            width: 100%;
        }
    }
`;

export default Home;
