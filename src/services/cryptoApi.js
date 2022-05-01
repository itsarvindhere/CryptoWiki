import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const headers =  {
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY
  }
  
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest  = (url) => ({url, headers});

export const cryptoApi =  createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoData: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`),
        }),

        getCryptoDetails : builder.query({
            query: (cryptoId) => createRequest(`/coin/${cryptoId}`),
        }),

        getCryptoHistory : builder.query({
            query: ({cryptoId, timePeriod}) => createRequest(`/coin/${cryptoId}/history/?timePeriod=${timePeriod}`),
        })
    })
})


export const {useGetCryptoDataQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;