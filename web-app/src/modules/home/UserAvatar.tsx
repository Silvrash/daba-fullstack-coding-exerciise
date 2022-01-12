import { useMemo } from "react";
import { Dropdown, DropdownItemProps, Image } from "semantic-ui-react";
import styled from "styled-components";
import { useCurrentUser, useTheme } from "../_shared/hooks";

const UserAvatar = () => {
    const { currentUser, logOut } = useCurrentUser();
    const { updateTheme } = useTheme();

    const options: DropdownItemProps[] = useMemo(
        () => [
            {
                key: "profile",
                text: "My Profile",
                value: "profile",
                icon: "user circle",
            },
            {
                key: "group-chat",
                text: "Group Chat",
                value: "group",
                icon: "group",
            },
            {
                key: "light-theme",
                text: "Light Theme",
                value: "light-theme",
                icon: "sun",
                onClick: () => updateTheme("light"),
            },
            {
                key: "dark-theme",
                text: "Dark Theme",
                value: "dark-theme",
                icon: "moon",
                onClick: () => updateTheme("dark"),
            },
            {
                key: "device-theme",
                text: "Device Theme",
                value: "device-theme",
                icon: "laptop",
                onClick: () => updateTheme("device"),
            },
            {
                key: "logOut",
                text: "Log out",
                value: "logOut",
                icon: "sign in",
                onClick: logOut,
            },
        ],
        [logOut, updateTheme]
    );

    return (
        <Dropdown
            className="user-avatar"
            inline
            trigger={
                <StyledDiv>
                    <Image
                        src={
                            currentUser?.photo ||
                            "https://react.semantic-ui.com/images/wireframe/square-image.png"
                        }
                        rounded
                        className="user"
                        size="mini"
                        floated="left"
                        style={{ objectFit: "cover", width: "4rem", height: "4rem" }}
                    />
                    <span>{currentUser?.name ?? currentUser?.email}</span>
                </StyledDiv>
            }
            options={options}
            value=""
        />
    );
};

const StyledDiv = styled.span`
    @media screen and (max-width: 981px) {
        .ui.floated.image,
        .ui.floated.images {
            margin-right: unset;
            margin-bottom: unset;
        }
        .ui.inline.dropdown {
            display: flex;
        }
        span {
            display: none;
        }
    }
`;

export default UserAvatar;
