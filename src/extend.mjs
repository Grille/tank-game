/**
 * @param {Class} cls
 * @param {Array} prot
 */
export default function (cls, prot) {
    for (let key in prot) {
        if (prot[key] instanceof Function) {
            if (cls.prototype[key] instanceof Function) {
                console.warn(`Warning: Overwriting ${cls.name}.prototype.${key}`);
            }
            cls.prototype[key] = prot[key];
        }
    };
};