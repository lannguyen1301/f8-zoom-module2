class HttpRequest {
    constructor() {
        // super(); KHÔNG DÙNG SUPER VÌ KHÔNG CÓ KẾ THỪA (EXTENDS)
        this.baseUrl = "https://spotify.f8team.dev/api/";
    }

    async _send(path, method, data, options) {
        const res = await fetch();
    }
}
