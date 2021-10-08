import React, {useEffect, useState} from "react";



const PageLoader = props => {
    const [opacity, setOpacity] = useState(0)
    useEffect(()=>{
        if (props.state) {
            setTimeout(()=>{
                setOpacity(1)
            }, 10)
        } else {
            setTimeout(()=>{
                setOpacity(0)
            },10)
        }
    },[props.state])
    return <div className="pageLoader" style={props.state ? {"zIndex": 100, "opacity": opacity} : {"opacity": opacity, "zIndex": -100}}>
        <div className="loader">
            <img style={{display: "block", margin: "0 0 0 -15px"}} src="/logotype.svg" alt=""/>
            <div>
                <img style={{display: "block", margin: "0 auto"}} src="/loader.svg" alt="" height={15}/>
            </div>
        </div>
    </div>
};

export default PageLoader;