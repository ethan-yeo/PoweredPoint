import React, { useState } from 'react';

const Loader = ({ children }) => {
    const defaultText = "GPT-Vision is generating an answer, please wait...";
    const mySpinnerStyle = {
        height: '10vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div className="pb-5" id="loader">
            <div style={mySpinnerStyle}>
                <div className="spinner-border" role="status"></div>
            </div>
            <div className="mx-auto text-center">
                <b>{children || defaultText}</b>
            </div>
        </div>
    );
};

export default Loader;
