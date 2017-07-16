import React from 'react'
import {Link} from 'react-router-dom';

import axios from 'axios';

import Svg from './common/Svg.jsx'
import Topiclink from './common/Topiclink.jsx'

export default class Coursepage extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
			"data" : false
		}
		this.selectChapter = (num) => {
			let newState = Object.assign({}, this.state);
			newState.chapterSelected = num;
			this.setState(newState);
		}
    }

    componentDidMount() {
        axios.get("https://api.myjson.com/bins/r7xib").then(res => {
            let newState = Object.assign({}, res.data);
            newState.data = true;
            this.setState(newState);
        });
    }

    render() {
        return (
        <div className="board row fullWidth">
    <div className="menu column large-3">
        <div className="navbar">
            Alogrithms
        </div>
        <ul className="sub-topics pipe">
            <li className="finished">
                <a href="/sub-topic" className="typeIcon finished text">What is not a data structure</a>
            </li>
            <li className="">
                <a href="/sub-topic" className="typeIcon active video">What is not a data structure</a>
            </li>
            <li className="finished">
                <a href="/sub-topic" className="typeIcon finished exercise">What is not a data structure</a>
            </li>
        </ul>
        <a href="/forum" className="forum-link">
            FORUM
        </a>
    </div>

    <div className="content column large-9">
        <div className="text">
            <p className="section-title">Basic Commands</p>
            <p className="para">The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men. Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children. And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers. And you will know My name is the Lord when I lay My vengeance upon thee.</p>
            <p className="para">You think water moves fast? You should see ice. It moves like it has a mind. Like it knows it killed the world once and got a taste for murder. After the avalanche, it took us a week to climb out. Now, I don't know exactly when we turned on each other, but I know that seven of us survived the slide... and only five made it out. Now we took an oath, that I'm breaking now. We said we'd say it was the snow that killed the other two, but it wasn't. Nature is lethal but it doesn't hold a candle to man.</p>
            <p className="para">Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p>
            <div className="nav row">
                <div className="column large-3 prev">
                    <a href="#">sub-topic 2</a>
                </div>
                <div className="column large-3 next">
                    <a href="#">sub-topic 4</a>
                </div>
            </div>
        </div>
    </div>
</div>
        )
    }

}