import React from 'react';
import _ from 'lodash';
import { getToken } from '../SpotifyPlayer/Utils/Permissions';
export default class RedirectPage extends React.Component {
    componentDidMount() {
        const { history, location } = this.props;
        try {
        if (_.isEmpty(location.hash)) {
            return history.push('/dashboard');
        }
        const accessToken = getToken(location.hash);
        const refreshToken = getToken(accessToken.refresh_token);
        localStorage.setItem('params', JSON.stringify(accessToken));
        localStorage.setItem('refresh_token', refreshToken)
        history.push('/dashboard');
        } catch (error) {
        history.push('/');
        }
    }
    render() {
        return null;
    }
}