export default function useAnchorScroll(createHistory) {
    function scrollToId(id) {
        const elem = document.getElementById(id);
        if(elem) {
            elem.scrollIntoView();
        }
    }

    return (options) => {
        const history = createHistory(options);
        var lastHash;

        history.listen(({hash}) => {
            if(lastHash != hash) {
                if(hash) {
                    scrollToId(hash.substring(1));
                }
                lastHash = hash;
            }
        });
        return history;
    }
}
