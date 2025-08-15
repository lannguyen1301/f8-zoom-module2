class HttpRequest {
    constructor() {
        this.baseUrl = "https://spotify.f8team.dev/api/";
        /**
         * class HttpRequest: Khai báo một lớp có tên HttpRequest.
         * constructor(): Hàm khởi tạo chạy khi tạo một đối tượng từ lớp này.
         * this.baseUrl: Gán URL gốc của API (https://spotify.f8team.dev/api/) vào thuộc tính baseUrl để dùng cho các yêu cầu sau.
         */
    }

    async _send(path, method, data, options = {}) {
        /**
         * async: Hàm bất đồng bộ, cho phép dùng await.
         * _send(...): Hàm nội bộ dùng để gửi yêu cầu HTTP.
         * path: Đường dẫn API. ví dụ: "https://spotify.f8team.dev/api/"
         * method: Phương thức HTTP (GET, POST, PUT, PATCH, DELETE).
         * data: Dữ liệu gửi đi (nếu có).
         * options: Tùy chọn bổ sung như headers, mode, credentials...
         */
        try {
            const _options = {
                ...options,
                method,
                headers: {
                    ...options.headers,
                    "Content-Type": "application/json",
                },
                /**
                 * try {}catch {}
                 * Tạo một đối tượng _options chứa các tùy chọn gửi đi.
                 * Gộp options bên ngoài với method và headers. (...options, method, headers)
                 * Đặt Content-Type là application/json để báo rằng dữ liệu gửi đi là JSON.
                 */
            };

            if (data) {
                _options.body = JSON.stringify(data);
                // Nếu có data, chuyển nó thành chuỗi JSON và gán vào body của yêu cầu.
            }

            const accessToken = localStorage.getItem("accessToken"); // lấy dữ liệu

            if (accessToken) {
                _options.headers.Authorization = `Bearer ${accessToken}`;
            }

            const res = await fetch(`${this.baseUrl}${path}`, _options); // Gửi yêu cầu HTTP bằng fetch, nối baseUrl và path để tạo URL đầy đủ.
            const response = await res.json(); // Chuyển phản hồi thành JSON và trả về.

            if (!res.ok) {
                console.log(res);
                const error = new Error(`HTTP error: `, res.status);
                error.response = response;
                error.status = response.status;
                throw error;
                /**
                 * Nếu phản hồi không thành công (res.ok === false)
                 *
                 */
            }

            return response;
        } catch (error) {
            console.log(error);
            throw error;
            // Nếu có lỗi trong quá trình gửi yêu cầu, in lỗi ra console.
        }
    }

    // get content
    async get(path, options) {
        return this._send(path, "GET", null, options);
        /**
         * Gửi yêu cầu GET đến API.
         * Không có data, chỉ có path và options.
         */
    }

    // add content
    async post(path, data, options) {
        return await this._send(path, "POST", data, options);
        // Gửi yêu cầu POST để thêm dữ liệu.
    }

    // change all
    async put(path, data, options) {
        return await this._send(path, "PUT", data, options);
        // Gửi yêu cầu PUT để thay thế toàn bộ dữ liệu.
    }

    // change a part
    async patch(path, data, options) {
        return await this._send(path, "PATCH", data, options);
        // Gửi yêu cầu PATCH để cập nhật một phần dữ liệu.
    }

    // delete
    async del(path, options) {
        return await this._send(path, "DELETE", null, options);
        // Gửi yêu cầu DELETE để xóa dữ liệu.
    }
}

const httpRequest = new HttpRequest(); // Tạo một đối tượng httpRequest từ class HttpRequest.

export default httpRequest;
// Xuất đối tượng này để có thể sử dụng ở file khác.

/**
 * nhắc lại lý thuyết
 * 1. async là gì?
 * Từ khóa async được dùng để khai báo một hàm bất đồng bộ.
 * Hàm async luôn trả về một Promise (ngay cả khi bạn return một giá trị không phải Promise).
 *
 * 2. await là gì?
 * await chỉ có thể được dùng bên trong một hàm async.
 * Nó sẽ tạm dừng việc thực thi hàm cho đến khi Promise hoàn thành, sau đó trả về kết quả.
 *
 * 3. Promise là gì?
 * Promise là một đối tượng đại diện cho kết quả của một thao tác bất đồng bộ (asynchronous operation), có thể thành công (resolve) hoặc thất bại (reject) trong tương lai.
 * Trạng thái (States) của một Promise
 * 3.1 Pending (đang chờ): chưa hoàn thành.
 * 3.2 Fulfilled (hoàn thành): thao tác thành công, trả về kết quả.
 * 3.3 Rejected (bị từ chối): thao tác thất bại, trả về lỗi.
 *
 * 4. fetch() là gì?
 * fetch() là một hàm tích hợp sẵn trong JavaScript, dùng để gửi yêu cầu HTTP (GET, POST, PUT, DELETE, v.v.) đến một server (máy chủ) — thường là để lấy hoặc gửi dữ liệu.
 * 4.1 Cú pháp cơ bản:
 * fetch(url, options)
 * 
 *
 * ví dụ: Gọi API để lấy bài viết (post) từ JSONPlaceholder và hiển thị tiêu đề.
 * Dùng fetch() để gọi API.
 * Dùng async/await trong một hàm.
 * Sau đó xử lý kết quả bằng .then().
 * 
 * Cách 1:
 * async function fetchPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  return response.json(); // Trả về Promise chứa dữ liệu JSON
}

fetchPost()
  .then(data => {
    console.log("Tiêu đề bài viết:", data.title);
  })
  .catch(err => {
    console.error("Có lỗi xảy ra:", err);
  });

  giải thích:
  fetchPost() là một hàm async, nên nó luôn trả về một Promise.
  Bên trong, nó await fetch(...) để chờ lấy phản hồi từ server.
  Sau đó gọi response.json() để trích xuất dữ liệu JSON.
  Cuối cùng, bạn có thể dùng .then() để xử lý kết quả từ fetchPost().


  cách 2: dùng async await try {}catch {}
    async function run() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const data = await response.json();
        console.log('Tiêu đề bài viết: ', data, title);
    }catch (error) {
            console.error("Lỗi: ", error)
        }
    }
    run();

 */
