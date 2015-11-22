export default function useAnchorScroll(createHistory) {
    function scrollToId(id) {
        const elem = document.getElementById(id);
        if(elem) {
            elem.scrollIntoView();
        }
    }

    return (options) => {
        const history = createHistory(options);
        var scrollTaskTimeout;
        var lastHash;

        history.listen(({hash}) => {
            if(lastHash != hash) {
                clearTimeout(scrollTaskTimeout);
                const anchor = hash.substring(1);
                if(anchor) {
                    scrollTaskTimeout = setTimeout(() => scrollToId(anchor));
                }
                lastHash = hash;
            }
        });
        return history;
    }
}
