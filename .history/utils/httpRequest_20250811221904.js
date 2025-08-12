class HttpRequest {
    constructor() {
        // super(); KHÔNG DÙNG SUPER VÌ KHÔNG CÓ KẾ THỪA (EXTENDS)
        this.baseUrl = "https://spotify.f8team.dev/api/";
    }

    async _send(path, method, data, options = {}) {
        try {
            const res = await fetch(`$this{baseUrl}${path}`, {
                ...options,
                method,
                header: {
                    ...options.headers,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = await res.json();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}
