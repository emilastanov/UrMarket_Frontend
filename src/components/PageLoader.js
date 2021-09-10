import React from "react";



const PageLoader = props => (
    <div className="pageLoader" style={props.state ? {"opacity": 1, "zIndex": 100} : {"opacity": 0, "zIndex": -100}}>
        <div className="loader">
            <img style={{display: "block", margin: "0 0 0 -15px"}} src="https://res.cloudinary.com/urmarket-online/image/upload/v1630921659/logotype.svg" alt=""/>
            <div>
                <img style={{display: "block", margin: "0 auto"}} src="/loader.svg" alt="" height={15}/>
            </div>
        </div>
    </div>
);

export default PageLoader;