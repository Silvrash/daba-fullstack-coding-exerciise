import { useHistory } from "react-router-dom";
import { Button, Card, Form, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import UserAvatar from "../home/UserAvatar";
import Logo from "../_shared/assets/logo.png";
import Constants from "../_shared/constants";
import { useCurrentUser } from "../_shared/hooks";
import Header from "./Header";
import { useEditProfile } from "./hooks/useEditProfile";
import ImagePicker from "./ImagePicker";

const Edit: React.FC = () => {
    const { currentUser } = useCurrentUser();
    const history = useHistory();
    const state = useEditProfile();

    return (
        <StyledDiv>
            <div className="row header">
                <div className="row">
                    <img src={Logo} alt="logo" className="logo" />
                    <div className="logoText"> devchallenges</div>
                </div>
                <UserAvatar />
            </div>

            <div className="wrapper">
                <div
                    className="row back-btn"
                    onClick={() => history.replace(Constants.ROUTES.home)}
                >
                    <Icon name={"left chevron" as any} />
                    Back
                </div>
                <Card>
                    <Header />

                    <Card.Content>
                        <ImagePicker
                            name="photo"
                            value={state.photo ?? ""}
                            handleChange={state.handleChange}
                            error={state.getError("photo")}
                        />
                        <Form onSubmit={state.handleSubmit}>
                            <Form.Input
                                name="name"
                                label="Name"
                                placeholder="Enter your name..."
                                value={state.name}
                                onChange={state.handleChange}
                                error={state.getError("name")}
                            />

                            <Form.TextArea
                                name="bio"
                                label="Bio"
                                placeholder="Enter your bio..."
                                value={state.bio ?? ""}
                                onChange={state.handleChange}
                                error={state.getError("bio")}
                            />

                            <Form.Input
                                name="phone"
                                label="Phone"
                                placeholder="Enter your phone..."
                                value={state.phone}
                                onChange={state.handleChange}
                                error={state.getError("phone")}
                            />

                            <Form.Input
                                name="email"
                                label="Email"
                                placeholder="Enter your email..."
                                value={state.email}
                                onChange={state.handleChange}
                                error={state.getError("email")}
                            />

                            <Form.Input
                                name="password"
                                label="Password"
                                placeholder="Enter your new password..."
                                type="password"
                                value={state.password}
                                onChange={state.handleChange}
                                error={state.getError("password")}
                            />

                            <Button
                                color="blue"
                                type="submit"
                                loading={state.isSubmitting}
                                disabled={state.isSubmitting}
                            >
                                Save
                            </Button>
                        </Form>
                    </Card.Content>
                </Card>
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

    .back-btn {
        color: #2d9cdb;
        cursor: pointer;
    }

    form {
        margin-top: 1rem;
    }

    .photo img {
        margin-right: 1rem;
    }

    .wrapper {
        width: 40%;
        min-width: 25rem;
    }

    .ui.card {
        width: 100%;
        background: transparent;
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
`;

export default Edit;
