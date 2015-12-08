import './styles.css';
import {Component} from 'react';
import bem from 'b_';
import Input from '../input/Input.jsx';
import Timeago from '../timeago/Timeago.jsx';
import Button from '../button/Button.jsx';

const b = bem.with('projects-error');

class TookenControl extends Component {

    updateToken() {
        this.props.onSetToken(this.refs.input.getVal());
    }

    render() {
        return (<div className={b('token')}>
           <Input ref="input" val={this.props.token} />
           {' '}
           <Button text="Save token" onClick={this.updateToken.bind(this)} />
       </div>);
    }
}

export default function ProjectsError({limitExceeded, badToken, limitResetTime, token, className, onRetry, onSetToken}) {
    function getLimitExceededMessage() {
        return (<p>
            {'Limit exceeded, reset '}
            <Timeago date={limitResetTime} />{'. '}
        </p>);
    }
    const showToken = limitExceeded || badToken;
    return (<div className={className}>
        {limitExceeded && getLimitExceededMessage()}
        {badToken && <p>Provided token is invalid!</p>}
        {showToken && <p>You can add token <a href="https://github.com/settings/tokens">from here</a> and extend rate limit</p>}
        {showToken && <TookenControl onSetToken={onSetToken} token={token} />}
        {!showToken && <p>Unknown error</p>}
        <Button text="Try again" onClick={onRetry} className={b('retry')} />
    </div>);
}
