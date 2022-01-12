import { Button, Card, Form, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Footer from "../auth/Footer";
import Logo from "../_shared/assets/logo.png";
import { FooterInfo } from "../_shared/components";
import { useLogin } from "./hooks/useLogin";

const LogIn: React.FC = () => {
    const state = useLogin();

    return (
        <StyledDiv>
            <div className="wrapper">
                <Card>
                    <Card.Content>
                        <div className="row">
                            <img src={Logo} alt="logo" className="logo" />
                            <div className="logoText"> devchallenges</div>
                        </div>
                        <div className="title">Login</div>

                        <Form onSubmit={state.handleSubmit} autoComplete="none">
                            <Form.Input
                                name="email"
                                value={state.email}
                                onChange={state.handleChange}
                                error={state.getError("email")}
                                icon={<Icon name="mail" color="grey" />}
                                iconPosition="left"
                                placeholder="Email"
                            />
                            <Form.Input
                                name="password"
                                value={state.password}
                                onChange={state.handleChange}
                                placeholder="Password"
                                icon={<Icon name="lock" color="grey" />}
                                iconPosition="left"
                                error={state.getError("password")}
                                autoComplete="new-password"
                                type="password"
                            />

                            <Button
                                fluid
                                color="blue"
                                type="submit"
                                loading={state.isSubmitting}
                                disabled={state.isSubmitting}
                            >
                                Start coding now
                            </Button>
                        </Form>
                        <Footer
                            membershipText="Don't have an account yet?"
                            linkText="Register"
                            handleLink={state.toSignUp}
                        />
                    </Card.Content>
                </Card>
                <FooterInfo />
            </div>
        </StyledDiv>
    );
};

const StyledDiv = styled.div`
    display: flex;
    background: ${({ theme }) => theme.background};
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;

    .row {
        display: flex;
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

    .wrapper {
        width: 25.125rem;
    }

    .ui.card {
        background: transparent;
        width: 100%;
        padding: 1rem 2rem;
        border-radius: 1rem;
    }

    .ui.form {
        margin-top: 2rem;
    }

    .title {
        font-family: Noto Sans;
        font-weight: 600;
        font-size: 1rem;
        margin-top: 1rem;
    }

    .caption {
        margin-top: 0.906rem;
        font-family: Noto Sans;
        font-weight: normal;
        font-size: 0.95rem;
    }

    .ui.form .field .ui.input input,
    .ui.form .fields .field .ui.input input {
        background: transparent;
        border: 1px solid #bdbdbd;
        box-sizing: border-box;
        border-radius: 0.5rem;
        color: ${({ theme }) => theme.darkText};
    }

    input::placeholder {
        color: grey !important;
    }

    .ui.blue.button {
        font-family: Noto Sans;
        font-weight: 600;
        font-size: 0.95rem;
    }
`;
export default LogIn;
