import React, { Component } from 'react';
import HeaderChangeAvatar from '../common/header/HeaderChangeAvatar';
import ContentChangeAvatar from '../common/content/ContentChangeAvatar';

class ChangeAvatar extends Component {
    render() {
        return (
            <div className="center w-100" style={{flexDirection: 'column'}}>
                <HeaderChangeAvatar/>
                <ContentChangeAvatar/>
            </div>
        );
    }
}

export default ChangeAvatar;