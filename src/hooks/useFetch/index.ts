import { useState, useEffect, useCallback, useRef } from 'react';
import { RequestOptionsInit } from 'umi-request';
import request from '@/utils/request';

type fetchServiceType = RequestOptionsInit;

interface IFetchOptions {
  manual?: boolean;
  formatResult?: (response: any) => any;
  onSuccess?: (response: any) => void;
  onError?: (response: any) => void;
}

type fetchReturnType<T> = [[T, boolean], (values: any) => void];

const defaultOptions = {
  manual: false,
};

function useFetch<ResultType = any>(
  service: fetchServiceType,
  options: IFetchOptions = {},
): fetchReturnType<ResultType> {
  const config = useRef(Object.assign({}, options, defaultOptions));
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(() => {
    const { url, ...restOptions } = service;
    const { formatResult, onSuccess, onError } = config.current;
    setLoading(true);
    request(url, restOptions)
      .then((res = {}) => {
        console.log(res);
        let result = res;
        const { code, Code } = res;
        if (formatResult) {
          result = formatResult(res);
        }
        if (code === 0 || Code === 0) {
          const { data, Data } = result;
          setState(data || Data || result);
          if (onSuccess) {
            onSuccess(result);
          }
        } else {
          if (onError) {
            onError(result);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [service, setState]);

  useEffect(() => {
    if (!config.current.manual) {
      fetch();
    }
  }, []);

  return [[state, loading], fetch];
}

export default useFetch;
