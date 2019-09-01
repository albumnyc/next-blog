export const throttle = (time) => (target, key, descriptor) => {
    let timeout;
    const fn = descriptor.value;
    descriptor.value = function() {
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                return null;
            }, time);
            return fn.apply(this, arguments);
        }
    };
    return descriptor;
};

export const debounce = (time) => (target, key, descriptor) => {
    let timeout;
    const fn = descriptor.value;
    descriptor.value = function() {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => fn.apply(this, arguments), time);
    };
    return descriptor;
};

export const enableLoadingStatus = (loadingStatusKey) => (target, key, descriptor) => {
    loadingStatusKey = loadingStatusKey || 'loading';
    const fn = descriptor.value;
    descriptor.value = async function() {
        this.setState({ [loadingStatusKey]: true });
        await fn.apply(this, arguments);
        this.setState({ [loadingStatusKey]: false });
    };
    return descriptor;
};

export const resizeFun = function() {
    const windowWidth = window.innerWidth;
    document.body.style.fontSize = (20 / 1440) * windowWidth + 'px';
};

export const compose = (func) => {
    return (arg) => func.reduce((composed, fn) => fn(composed), arg);
};
