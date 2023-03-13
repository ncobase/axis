import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useRedirectFromUrl = (defaultTo = '/') => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '';

  return useCallback(() => {
    const decodedRedirect = decodeURIComponent(redirect);
    navigate(redirect ? decodedRedirect : defaultTo, { replace: true });
  }, [navigate, searchParams, defaultTo]);
};
