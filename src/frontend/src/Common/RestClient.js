
import useLoggerService from './../Services/Diagnostics/LoggerService'
import useUserService from './../Services/UserService'

const useRestClient = () => {
    const logger = useLoggerService('RestClient');
    const userService = useUserService();

    const get = async (url, headers) => {
        return makeRequest(url, 'GET', null, headers);
    }

    const put = (url, body, headers) => {
        return makeRequest(url, "PUT", body, headers);
    }

    const post = (url, body, headers) => {
        return makeRequest(url, "POST", body, headers);
    }

    const del = (url, body, headers) => {
        return makeRequest(url, "DELETE", body, headers);
    }

    const makeAuthorization = async (headers) => {
        const token = await userService.getToken();
        if (token) {
            headers = {
                ...headers,
                'Authorization': `Bearer ${token}`
            };
        }

        return headers;
    }

    const makeHeaders = async (headers) => {
        return await makeAuthorization({
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    const makeRequest = async (url, method, body, headers) => {
        const allHeaders = await makeHeaders(headers);
        const request = {
            url: url,
            method: method,
            headers: allHeaders,
            body: body ? JSON.stringify(body) : body
        };

        return new Promise((resolve, reject) => {
            send(request, resolve, reject);
        })
    }

    const send = async (request, resolve, reject) => {
        logger.debug(
            `Request
             URL: ${request.url}
             Method: ${request.method}
             Headers: ${JSON.stringify(request.headers)}
             Body: ${request.body}`)

        const rawResponse = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body
        });

        logger.debug(
            `Response
            URL: ${request.url}
            Is OK: ${rawResponse.ok}
            Status: ${rawResponse.status} -> ${rawResponse.statusText}`
        )

        if (rawResponse.status >= 200 && rawResponse.status < 400) {
            const responseData = await rawResponse.json();
            resolve(responseData);
        } else {
            reject(rawResponse)
        }
    }

    return {
        get: get,
        put: put,
        post: post,
        delete: del
    }
}

export default useRestClient;