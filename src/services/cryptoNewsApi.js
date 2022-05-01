import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const headers =  {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
  }

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest  = (url) => ({url, headers});

export const cryptoNewsApi =  createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({category, count}) => createRequest(`/news/search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})


export const {useGetCryptoNewsQuery} = cryptoNewsApi;