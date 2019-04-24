import React from 'react';

interface Props {
    className?: string;
}

const AddCircle = ({ className }: Props) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
    >
        <title>Plusstegn</title>
        <path d="M19.646,3.384C17.478,1.207,14.594,0.006,11.499,0C5.17,0,0.012,5.148,0,11.477c-0.006,3.072,1.184,5.962,3.352,8.139	c2.168,2.176,5.053,3.378,8.126,3.384H11.5c6.328,0,11.487-5.149,11.499-11.479C23.005,8.45,21.814,5.56,19.646,3.384z M11.5,22.5	L11.5,22.5L11.5,22.5L11.5,22.5z M17.5,12L17.5,12H12v5.5c0,0.276-0.225,0.5-0.5,0.5c-0.276,0-0.5-0.224-0.5-0.5V12H5.5	c-0.276-0.001-0.501-0.224-0.5-0.5C5,11.225,5.224,11,5.5,11l0,0H11V5.5C11,5.224,11.224,5,11.5,5C11.775,5,12,5.224,12,5.5V11h5.5	c0.275,0,0.501,0.224,0.5,0.5C18,11.776,17.776,12,17.5,12z" />
    </svg>
);

export default AddCircle;
