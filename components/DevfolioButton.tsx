"use client";
import React from "react";

const DevfolioButton = () => {
	React.useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://apply.devfolio.co/v2/sdk.js";
		script.async = true;
		script.defer = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);

	return (
		<div
			className="apply-button"
			data-hackathon-slug="hackandpitch"
			data-button-theme="dark-inverted"
		></div>
	);
};

export default DevfolioButton;