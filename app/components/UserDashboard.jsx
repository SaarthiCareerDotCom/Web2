import React from 'react';

import firebase from '../configuration/firebase-config';


var UserDashboard = React.createClass({
    render: function () {
        var userId = firebase.auth().currentUser;
        return (
            <div>welcom {userId.email}</div>
        );
    }
});

module.exports = UserDashboard;