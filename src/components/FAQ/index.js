import React, {useEffect, useState} from "react";

import './style.css';

const FAQ = props => {
    const [answer, showAnswer] = useState(null)
    const [activeQuestion, setActiveQuestion] = useState(0)
    useEffect(()=>{
        if (props.questions){
            showAnswer(props.questions[0].answer)
        }
    },[props.questions])
    return <div className="FAQ">
        <h1 className="title">
            {props.header}
        </h1>
        <div className="body">
            <div className="questions">
                {props.questions ? props.questions.map((item, key) => (
                    <React.Fragment key={key}>
                        <div className={`question ${activeQuestion===key? 'active': ''}`} onClick={()=>{
                            showAnswer(item.answer);
                            setActiveQuestion(key);
                        }}>
                            {item.question}
                        </div>
                        <div className={`answer_mobile ${item.answer === answer ? "active" : ""}`} dangerouslySetInnerHTML={{__html: item.answer}}/>
                    </React.Fragment>
                )) : ""}
            </div>
            <div className="answer" >
                <p dangerouslySetInnerHTML={{__html: answer}} />
            </div>
        </div>
    </div>
};

export default FAQ;