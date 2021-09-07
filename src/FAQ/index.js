import React, {useState} from "react";

import './style.css';

const FAQ = props => {
    const [answer, showAnswer] = useState("")
    const [activeQuestion, setActiveQuestion] = useState(null)
    return <div className="FAQ">
        <h1 className="title">
            Часто задаваемые вопросы
        </h1>
        <div className="body">
            <div className="questions">
                {props.questions.map((item, key) => (
                    <div key={key} className={`question ${activeQuestion===key? 'active': ''}`} onClick={()=>{
                        showAnswer(item.answer);
                        setActiveQuestion(key)
                    }}>
                        {item.question}
                    </div>
                ))}
            </div>
            <div className="answer" >
                <p>{answer}</p>
            </div>
        </div>
    </div>
};

export default FAQ;