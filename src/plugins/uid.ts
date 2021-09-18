export const uid = (): string =>
	globalThis.crypto.getRandomValues(new Int32Array(1))[0].toString(36);
