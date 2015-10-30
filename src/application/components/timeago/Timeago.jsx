import moment from 'moment';

export default function Timeago({date}) {
    return <span>{moment(date).fromNow()}</span>;
}
