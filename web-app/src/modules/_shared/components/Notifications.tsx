/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { animated, config, useSpring } from "react-spring";
import { Message } from "semantic-ui-react";
import styled from "styled-components";
import K from "../constants";
import { useEventEmitter } from "../emitter";

export interface NotificationOptions {
    header?: string;
    text?: string;
    callback?: Function;
    refresh?: Function;
    info?: boolean;
    error?: boolean;
    disableAutoClose?: boolean;
}

export const Notifications: React.FC = () => {
    const [params, setParams] = React.useState<Partial<NotificationOptions>>({});
    const { header, error, info, text, callback, disableAutoClose } = params;

    const eventEmitter = useEventEmitter<NotificationOptions>();

    const styles = useSpring({
        right: text ? "3rem" : "0rem",
        top: text ? "3rem" : "-10rem",
        config: config.wobbly,
    });

    function onNewDataEmitted(data: NotificationOptions) {
        setParams(data);
    }

    eventEmitter.useSubscription(K.EVENTS.SHOW_NOTIFICATION, onNewDataEmitted);

    useEffect(() => {
        if (!text) return;
    }, [text]);

    useEffect(() => {
        let timer: any;
        if (text && !error && !disableAutoClose) {
            timer = setTimeout(() => {
                onClose();
            }, 10000);
        }
        return () => timer && clearTimeout(timer);
    }, [text]);

    function onClose() {
        setParams({});
        callback && callback();
    }

    return (
        <StyledMessage
            id="infoBox"
            floating
            info={info}
            style={styles}
            visible
            negative={error}
            icon={error ? "warning" : "info"}
            header={header || (error ? "Error" : "Info")}
            content={text}
            onDismiss={onClose}
        />
    );
};

const StyledMessage = styled(animated(Message))<{ visible: boolean }>`
    display: ${(props) => (props.visible ? "flex" : "none")} !important;
    width: 33rem !important;
    position: absolute !important;
    right: 3rem;
    top: 3rem;
    z-index: 9999 !important;
    .ui.icon.message > .content {
        width: 89%;
    }

    @media only screen and (max-width: 976px) {
        width: 91% !important;
        right: 1rem;
        left: 1rem;
    }
    @keyframes bounce-in-top {
        0% {
            transform: translateY(-31.25rem);
            animation-timing-function: ease-in;
            opacity: 0;
        }
        38% {
            transform: translateY(0);
            animation-timing-function: ease-out;
            opacity: 1;
        }
        55% {
            transform: translateY(-4.063rem);
            animation-timing-function: ease-in;
        }
        72% {
            transform: translateY(0);
            animation-timing-function: ease-out;
        }
        81% {
            transform: translateY(-1.75rem);
            animation-timing-function: ease-in;
        }
        90% {
            transform: translateY(0);
            animation-timing-function: ease-out;
        }
        95% {
            transform: translateY(-0.5rem);
            animation-timing-function: ease-in;
        }
        100% {
            transform: translateY(0);
            animation-timing-function: ease-out;
        }
    }
    @keyframes slide-out-right {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(62.5rem);
            opacity: 0;
        }
    }
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default Notifications;
