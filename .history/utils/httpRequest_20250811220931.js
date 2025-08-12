class HttpRequest {
    constructor() {
        // super(); KHÔNG DÙNG SUPER VÌ KHÔNG CÓ KẾ THỪA (EXTENDS)
        this.baseUrl = "https://spotify.f8team.dev/api/";
    }

    async _send(path, method, data, options = {}) {
        const res = await fetch(`$this{baseUrl}${path}`, {
            ...options,
            method,
            header: {
                ...options.headers,
                "Content-Type": "application/json",
            },
        });
    }

    async _send(path, method, data, options = {}) {
        const res = await fetch(`${this.baseUrl}${path}`, {
            ...options,
            method,
            headers: {
                ...options.headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }
}
