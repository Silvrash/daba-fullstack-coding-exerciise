import { useMemo } from "react";
import { Dropdown, DropdownItemProps, Image } from "semantic-ui-react";
import { useCurrentUser, useTheme } from "../_shared/hooks";

const UserAvatar = () => {
    const { currentUser, logOut } = useCurrentUser();

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
                key: "logOut",
                text: "Log out",
                value: "logOut",
                icon: "sign in",
                onClick: logOut,
            },
        ],
        [logOut]
    );

    return (
        <Dropdown
            className="user-avatar"
            inline
            trigger={
                <>
                    <Image
                        src={
                            currentUser?.photo ||
                            "https://react.semantic-ui.com/images/wireframe/square-image.png"
                        }
                        rounded
                        className="user"
                        size="mini"
                        floated="left"
                        style={{ objectFit: "cover" }}
                    />
                    <span>{currentUser?.name ?? currentUser?.email}</span>
                </>
            }
            options={options}
            value=""
        />
    );
};

export default UserAvatar;
