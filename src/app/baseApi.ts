import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type {ZodType} from 'zod';

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`);
    return headers;
  },
});

type ZodExtraOptions = {dataSchema?: ZodType};

// Every endpoint passes its zod schema via extraOptions; an invalid server
// payload is surfaced as a query error instead of leaking bad data into the UI.
export const baseQueryWithZod: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ZodExtraOptions
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  const schema = extraOptions?.dataSchema;
  if (result.data !== undefined && schema) {
    const parsed = schema.safeParse(result.data);
    if (!parsed.success) {
      const details = parsed.error.issues
        .slice(0, 3)
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join('; ');
      return {
        error: {
          status: 'CUSTOM_ERROR',
          error: `Zod validation error: ${details}`,
        },
      };
    }
    return {data: parsed.data};
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithZod,
  endpoints: () => ({}),
});
