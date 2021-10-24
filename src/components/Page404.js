import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Page404 = props => {

    let markets = useQuery().get('markets').split(',');

    useEffect(()=>{
        props.loader(false)
    }, [props.loader]);

    return <div className="page404" style={{"zIndex": 100, "opacity": 1}}>
        <div className="content" >
            <img src="/logotype.svg" alt=""/>
            <div>
                <h1>404</h1>
                <p>Запрашиваемая страница не найдена!</p>
            </div>
            <div className="links">
                {markets.map((item,key)=>(
                    <Link key={key} to={`/${item}`} onClick={()=>props.loader(true)}>{item}</Link>
                ))}
            </div>
        </div>
    </div>
};

export default Page404;