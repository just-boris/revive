export function extend(target, prop, descriptor) {
    var origin = Object.getPrototypeOf(target)[prop];
    target[prop] = Object.assign({}, origin, descriptor.value);
}
