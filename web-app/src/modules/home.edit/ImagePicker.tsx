import React from "react";
import { FormInputProps, Icon, Image } from "semantic-ui-react";
import styled from "styled-components";
import { showErrorMessage } from "../_shared/events";

interface IProps {
    name: string;
    value?: string;
    handleChange: FormInputProps["onChange"];
    error?: string;
    label?: string;
    setFieldValue?: (field: string, value: any) => void;
}

const ImagePicker: React.FC<IProps> = (props) => {
    const [mimeType, setMimeType] = React.useState<string>("");
    const imageFile = React.useRef<HTMLInputElement>(null);

    const onFileLoaded = (e: any) => {
        var match = /^data:(.*);base64,(.*)$/.exec(e.target.result);
        if (match === null) {
            // eslint-disable-next-line no-throw-literal
            showErrorMessage("Could not parse result");
            return;
        }

        var mimeType = match[1];
        var content = match[2];
        if (!props.handleChange) return;

        props.setFieldValue && props.setFieldValue("mimeType", mimeType);

        props.handleChange(e, {
            name: props.name,
            value: content,
        });

        setMimeType(mimeType);
    };

    const handleFileSelect = (e: any) => {
        var files = e.target!.files;
        if (files.length < 1) {
            return;
        }

        const file = files[0];
        const reader = new FileReader();
        reader.onload = onFileLoaded;
        reader.readAsDataURL(file);
    };

    let image = props.value;
    if (mimeType) image = `data:${mimeType};base64,${props.value}`;

    return (
        <StyledDiv onClick={() => imageFile.current?.click()}>
            <span className="photo">
                <span className="image">
                    <Image src={image || "https://via.placeholder.com/150"} size="tiny" rounded />
                    <StyledIcon name="camera" size="big" style={{color: 'white'}}/>
                </span>
                CHANGE PHOTO
            </span>
            <input
                type="file"
                ref={imageFile}
                onChange={handleFileSelect}
                style={{ display: "none" }}
            />
        </StyledDiv>
    );
};

const StyledIcon = styled(Icon)`
    margin: auto !important;
    position: absolute;
    left: 1.96rem;
    top: -0.2rem;
`;

const StyledDiv = styled.div`
    cursor: pointer;
    .image {
        position: relative;
    }
    .photo {
        color: ${({ theme }) => theme.darkText};
        font-size: 0.9rem;
    }

    input[type="file"] {
        appearance: none;
        width: 0px !important;
        height: 0px !important;
        visibility: hidden;
        border: none !important;
        display: none;
    }
`;

export default ImagePicker;
