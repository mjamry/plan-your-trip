import useLoggerService from '../Services/Diagnostics/LoggerService';
import useUserService from '../Services/UserService';

// TODO take care of undef HeadersInit
/* eslint-disable no-undef */

enum RestMethod {
  get = 'GET',
  put = 'PUT',
  post = 'POST',
  delete = 'DELETE',
}

type Request = {
  url: string,
  method: RestMethod,
  headers?: HeadersInit,
  body?: string
}

type RestClientOptions = {
  authenticate: boolean;
}

type IRestClient = {
  get: (url: string, headers: HeadersInit) => Promise<unknown>;
  put: (url: string, body: object, headers: HeadersInit) => Promise<unknown>;
  post: (url: string, body: object, headers: HeadersInit) => Promise<unknown>;
  del: (url: string, body: object, headers: HeadersInit) => Promise<unknown>;
}

const useAuthenticationMiddleware = () => {
  const userService = useUserService();

  const getAuthenticationHeaders = async (headers: HeadersInit) => {
    const token = await userService.getToken();
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return headers;
  };

  return {
    getAuthenticationHeaders,
  };
};

const useRestClient = (options: RestClientOptions): IRestClient => {
  const logger = useLoggerService('RestClient');
  const authenticationMiddleware = useAuthenticationMiddleware();

  options = options || { authenticate: true };

  const getHeaders = (headers: HeadersInit): HeadersInit => ({
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const send = async (
    request: Request,
    resolve: (value: any) => void,
    reject: (value: any) => void,
  ) => {
    logger.debug(
      `Request
            URL: ${request.url}
            Method: ${request.method}
            Headers: ${JSON.stringify(request.headers)}
            Body: ${request.body}`,
    );

    const rawResponse = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    logger.debug(
      `Response
            URL: ${request.url}
            Is OK: ${rawResponse.ok}
            Status: ${rawResponse.status} -> ${rawResponse.statusText}`,
    );

    if (rawResponse.status >= 200 && rawResponse.status < 400) {
      const responseData = await rawResponse.json();
      resolve(responseData);
    } else {
      reject(rawResponse);
    }
  };

  const makeRequest = async (
    url: string,
    method: RestMethod,
    headers: HeadersInit,
    body?: object,
  ): Promise<unknown> => {
    let allHeaders = getHeaders(headers);

    if (options.authenticate) {
      allHeaders = await authenticationMiddleware.getAuthenticationHeaders(allHeaders);
    }

    const request = {
      url,
      method,
      headers: allHeaders,
      body: body ? JSON.stringify(body) : body,
    };

    return new Promise((resolve, reject) => {
      send(request, resolve, reject);
    });
  };

  const get = async (
    url: string,
    headers: HeadersInit,
  ): Promise<unknown> => makeRequest(url, RestMethod.get, headers);

  const put = (
    url: string,
    body: object,
    headers: HeadersInit,
  ): Promise<unknown> => makeRequest(url, RestMethod.put, headers, body);

  const post = (
    url: string,
    body: object,
    headers: HeadersInit,
  ): Promise<unknown> => makeRequest(url, RestMethod.post, headers, body);

  const del = (
    url: string,
    body: object,
    headers: HeadersInit,
  ): Promise<unknown> => makeRequest(url, RestMethod.delete, headers, body);

  return {
    get,
    put,
    post,
    del,
  };
};

export default useRestClient;
