import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Topbar } from '../Components/Topbar/Topbar';
import { Likertchoice } from '../Components/Likertchoice/Likertchoice';
import tweet_data from '../Data/tweet_data.json';

import './page.css';


export const Task2Page = (props) => {

    // get user id from previous page
    const location = useLocation();
    const { id } = location.state;

    // set the page number
    const [currentPageNum, setCurrentPageNum] = useState(9);
    const [answer, setAnswer] = useState(Array(tweet_data.length).fill(['', '', '']));
    
    function checkAllAnswered (answer) {
        const isAllAnswer = answer.every(item => item.every( itemofitem => itemofitem !== ''));
        return isAllAnswer;
    }

    function setIthAnswer (i, j, val) {
        setAnswer(prevAnswer => {
            const newAnswer = [...prevAnswer];
            newAnswer[i] = [...newAnswer[i]];
            newAnswer[i][j] = val;
            return newAnswer;
        });
    }

    function prev () {
        setCurrentPageNum(currentPageNum- 1);
    }

    function next () {
        setCurrentPageNum(currentPageNum + 1);
    }

    return(
        <>
            <Topbar id={id} currentState={4}/>
            <div className='page'>
                <div className='survey'>
                    {currentPageNum === 9 ?
                        <>
                            <div className='explaination'>
                            In <b>task2</b>, you will be rating the opinion alignment of each cognitive information processing step generated by the large language model as if they were seen tweets.
                            The LLM generates three key steps in cognitive information processing: <b>perception</b>, <b>cognition</b>, and <b>action</b>.
                            Your task is to assess the opinion alignment of these steps in relation to the given context. 
                            Please carefully read the instructions below to complete the ratings.
                            </div>
                            <div className='explainBox'>
                                <b>Definition for each cognitive information processing steps:</b>
                                <br/>
                                <b> • &nbsp;Perception:</b> perceptual process of extracting relevant information, perceiving tone, and sentiment. 
                                <br/>
                                <b> • &nbsp;Cognition:</b> Cognitive process to understand and interpret its meaning (e.g., analysis, evaluation)
                                <br/>
                                <b> • &nbsp;Action:</b> formulate response or reply to corresponding tweet 
                            </div>
                            <div className='explaination'>
                                For each cognitive information processing step (perception, cognition, and action), please rate the opinion alignment based on the given context.
                                This assessment will help us examine the alignment between LLM’s cognitive reasoning and your own perspectives.
                            </div>
                        </>
                    : 
                        <>
                            <div className='explaination'>
                            On a scale of 1 to 5, rate the level of agreement with the statement: 
                            <b>“The given statements accurately reflect the opinion of the group who support feminist movement/legalization of abortion”</b>
                            <br/>
                            1-Strongly Disagree, 2-Disagree, 3-Neutral, 4-Agree, 5-Strongly Agree
                            </div>
                            <div className='questionsContainer'>
                                {
                                    tweet_data.map((data, index) => (
                                        <div className='questionBox' key={index}>
                                            <div className='question'>
                                                <b>{index + 1}. Tweet: "</b>{data.Tweet}<b>"</b>
                                            </div>
                                            <div className='extraQuestionContainer'>
                                                <div className='question'>
                                                    <b>{index + 1}-a. Perception:</b> {data.perception}
                                                </div>
                                                <Likertchoice key={data.Tweet + 1} val={answer[index][0]} id={index * 3 + 1} setAnswer={(val) => setIthAnswer(index, 0, val)} labels={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}/>
                                                <div className='question'>
                                                    <b>{index + 1}-b. Cognition:</b> {data.cognition}
                                                </div>
                                                <Likertchoice key={data.Tweet + 2} val={answer[index][1]} id={index * 3 + 2} setAnswer={(val) => setIthAnswer(index, 1, val)} labels={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}/>
                                                <div className='question'>
                                                    <b>{index + 1}-c. Action:</b> {data.action}
                                                </div>
                                                <Likertchoice key={data.Tweet + 3} val={answer[index][2]} id={index * 3 + 3} setAnswer={(val) => setIthAnswer(index, 2, val)} labels={['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree']}/>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </>
                    }        
                    <div className='buttonContainer'>
                        {currentPageNum === 9 ? <div/> : <button className='prevBtn' onClick={prev}>Prev</button>}
                        {currentPageNum === 10 ? 
                            ( checkAllAnswered(answer) ?
                                <Link to='/post' state={{id: id}} className='nextBtn'>Next</Link> 
                                :
                                <button className='nextBtn disable'>Next</button>
                            )    
                            : <button className='nextBtn' onClick={next}>Next</button>}
                    </div>
                </div>
                <div className='footer'/>
            </div>
        </>
    )
}