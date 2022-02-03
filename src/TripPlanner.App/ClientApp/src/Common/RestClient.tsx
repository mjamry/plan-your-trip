import { useHistory } from 'react-router-dom';
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

interface IRestClient {
  get<T>(url: string, headers?: HeadersInit): Promise<T>;
  put<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
  post<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
  del<T>(url: string, body: object, headers?: HeadersInit): Promise<T>;
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

const useRestClient = (options?: RestClientOptions): IRestClient => {
  const logger = useLoggerService('RestClient');
  const authenticationMiddleware = useAuthenticationMiddleware();
  const history = useHistory();

  options = options || { authenticate: true };

  const getHeaders = (headers?: HeadersInit): HeadersInit => ({
    ...headers,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });

  const send = async <T, >(
    request: Request,
    resolve: (value: T) => void,
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
      history.push(`/error/${rawResponse.status}`);
    }
  };

  const makeRequest = async <T, >(
    url: string,
    method: RestMethod,
    headers?: HeadersInit,
    body?: object,
  ): Promise<T> => {
    let allHeaders = getHeaders(headers);

    if (options && options.authenticate) {
      allHeaders = await authenticationMiddleware.getAuthenticationHeaders(allHeaders);
    }

    const request = {
      url,
      method,
      headers: allHeaders,
      body: body ? JSON.stringify(body) : body,
    };

    return new Promise((resolve: (data: T) => void, reject: any) => {
      send(request, resolve, reject);
    });
  };

  const get = async <T, >(
    url: string,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest<T>(url, RestMethod.get, headers);

  const put = async <T, >(
    url: string,
    body: object,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest<T>(url, RestMethod.put, headers, body);

  const post = async <T, >(
    url: string,
    body: object,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest(url, RestMethod.post, headers, body);

  const del = async <T, >(
    url: string,
    body: object,
    headers?: HeadersInit,
  ): Promise<T> => makeRequest(url, RestMethod.delete, headers, body);

  return {
    get,
    put,
    post,
    del,
  };
};

export default useRestClient;
