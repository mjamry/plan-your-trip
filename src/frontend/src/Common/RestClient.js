
import useLoggerService from './../Services/Diagnostics/LoggerService'
import { useUserState } from '../State/UserState'
import { Log, User, UserManager } from 'oidc-client'

const useRestClient = () => {
    const [{user, userManager, token}, dispatchSession] = useUserState();
    const logger = useLoggerService();

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
        const user = await userManager.getUser();
        if (user) {
            logger.debug(`User logged in: ${user.access_token}`)
            headers = {
                ...headers,
                'Authorization': `Bearer ${user.access_token}`
            };
        }
        else {
            logger.info("User not logged in");
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
            `[RestClient] Request
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
            `[RestClient] Response
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