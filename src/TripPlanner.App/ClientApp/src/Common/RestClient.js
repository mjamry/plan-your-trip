
import useLoggerService from './../Services/Diagnostics/LoggerService'
import useUserService from './../Services/UserService'

const useRestClient = (options) => {
    const logger = useLoggerService('RestClient');
    const authenticationMiddleware = useAuthenticationMiddleware();

    options = options || { authenticate: true };

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

    const getHeaders = (headers) => {
        return {
            ...headers,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    const makeRequest = async (url, method, body, headers) => {
        let allHeaders = getHeaders(headers);

        if (options.authenticate) {
            allHeaders = await authenticationMiddleware.getAuthenticationHeaders(allHeaders);
        }

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

const useAuthenticationMiddleware = () => {
    const userService = useUserService();

    const getAuthenticationHeaders = async (headers) => {
        const token = await userService.getToken();
        if (token) {
            headers = {
                ...headers,
                'Authorization': `Bearer ${token}`
            };
        }

        return headers;
    }

    return {
        getAuthenticationHeaders: getAuthenticationHeaders
    }
}