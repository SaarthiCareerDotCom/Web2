import React from 'react'

export default class Coursepage extends React.Component{
    constructor(props) {
        super(props)
    }
    render(match) {
        return (
            <p>You must be here to meet {this.props.match.params.name}</p>
        )
    }
}