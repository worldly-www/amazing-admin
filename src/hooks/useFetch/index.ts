import { useState, useEffect, useCallback, useRef } from 'react';
import { RequestOptionsInit } from 'umi-request';
import request, { IFetchResponse } from '@/utils/request';
import { isPlainObject } from 'lodash';
interface IFetchOptions<ResultType = any, F = any> {
  manual?: boolean;
  formatResult?: <F>(response: IFetchResponse<ResultType>) => F;
  onSuccess?: (response: ResultType) => void;
  onError?: (response: IFetchResponse<ResultType>) => void;
}

type fetchServiceType =
  | RequestOptionsInit
  | (() => string | object | Promise<any>)
  | string;
type fetchReturnType<T> = [[T | undefined, boolean], (...args: any[]) => void];

const defaultOptions = {
  manual: false,
  formatResult: ({ data, Data }: any) => data || Data,
};

function serviceFn<S, ResultType>(
  service: S,
  ...args: any[]
): Promise<IFetchResponse<ResultType>> {
  if (typeof service === 'string') {
    const [params] = args;
    return request(service, {
      params,
    });
  } else if (isPlainObject(service)) {
    const [data] = args;
    const { url, ...restOptions } = service as RequestOptionsInit;
    if (restOptions.method === 'POST') {
      restOptions.data = data;
    } else {
      restOptions.params = data;
    }
    return request(url, restOptions);
  }
  return serviceFn((service as any)?.(...args));
}

function useFetch<ResultType = any>(
  service: fetchServiceType,
  options?: IFetchOptions<ResultType>,
): fetchReturnType<ResultType> {
  const serviceRef = useRef(service);
  const optionsRef = useRef(Object.assign({}, defaultOptions, options));
  const [state, setState] = useState<ResultType>();
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(
    (...args) => {
      const { formatResult, onSuccess, onError } = optionsRef.current;
      setLoading(true);
      return serviceFn<fetchServiceType, ResultType>(
        serviceRef.current,
        ...args,
      )
        .then(result => {
          const { code, Code } = result;
          if (code === 0 || Code === 0) {
            const data = formatResult?.(result);
            onSuccess?.(data);
            setState(data);
            return data;
          }
          onError?.(result);
          return Promise.reject(result);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [setState, setLoading],
  );

  useEffect(() => {
    if (!optionsRef.current.manual) {
      fetch();
    }
  }, []);

  return [[state, loading], fetch];
}

export default useFetch;
