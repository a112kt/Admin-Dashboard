const ENCRYPTION_KEY = "rkejwhiuh@CsZbdfjs78fu!qw8uiqehfuih5";
export function getCurrentUserId(token: string) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join(""),
        );
        const payload = JSON.parse(jsonPayload);
        const userId =
            payload?.[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ] ||
            payload?.sub ||
            null;
        return userId
    } catch (e) {
        console.log(e);
        return "Error fetching user ID";
    }
}
async function getKey() {
    const enc = new TextEncoder();
    const keyData = enc.encode(ENCRYPTION_KEY.padEnd(32).substring(0, 32));
    return await crypto.subtle.importKey("raw", keyData, "AES-CBC", false, [
        "encrypt",
        "decrypt",
    ]);
}

export async function encrypt(plainText: string) {
    if (!plainText) return plainText;
    const enc = new TextEncoder();
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encrypted = await crypto.subtle.encrypt(
        { name: "AES-CBC", iv },
        key,
        enc.encode(plainText),
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
}

export async function decrypt(cipherText: string) {
    if (!cipherText) return cipherText;
    try {
        const combined = Uint8Array.from(atob(cipherText), (c) =>
            c.charCodeAt(0),
        );
        const iv = combined.slice(0, 16);
        const data = combined.slice(16);
        const key = await getKey();
        const decrypted = await crypto.subtle.decrypt(
            { name: "AES-CBC", iv },
            key,
            data,
        );
        return new TextDecoder().decode(decrypted);
    } catch (e) {
        console.warn("Decryption failed, returning original text", e);
        return cipherText;
    }
}

