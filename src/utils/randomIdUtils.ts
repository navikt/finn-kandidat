declare global {
    interface Window {
        msCrypto: {};
    }
}

export const randomCallId = () => {
    let idx = 0;
    const c = window.crypto || window.msCrypto;
    const rnd = Array.from(c.getRandomValues(new Uint8Array(32))).map(value =>
        (value & 15).toString(16)
    );
    return '00000000-0000-0000-0000-000000000000'.replace(/0/g, () => rnd[idx++]);
};
