import { ErrorObject } from '@commercetools/platform-sdk';
import { useState } from 'react'

export default function useLoading() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setLoadingError] = useState<ErrorObject | null>(null);

  return { loading, setLoading, error, setLoadingError };
}
