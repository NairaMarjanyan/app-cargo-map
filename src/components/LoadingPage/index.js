import React from "react";
import "./index.scss";

const LoadingPage = () => {
    return (
        <div className="fb-loading-container">
            <div className="loading">
                <div className="arc" />
                <div className="arc" />
                <div className="arc" />
            </div>
        </div>
    );
};

export default LoadingPage;
