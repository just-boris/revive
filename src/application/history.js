import createHistory from 'history/lib/createHashHistory';
import useAnchorScroll from './util/useAnchorScroll';

export default function createAppHistory(options) {
    return useAnchorScroll(createHistory)(Object.assign({queryKey: false}, options))
}
