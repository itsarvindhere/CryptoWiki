              Redux Toolkit

---------------------------------------------------

Redux Toolkit includes utilities to make common tasks like creating reducers, setting up a store, fetching data from api etc simple. 

-----------------------------------------------------

1. STORE

To start, we first create a Store. A store is an object that holds the application’s state. And there is only one store in the whole application when we work with redux. A store does not hold any logic. It just holds the data or state. Its job is to receive actions, and use reducers to update the state.

When a change is made in the state, the store will notify all the subscribers to that store so that the respective components are updated with the new state.

We simply create a folder named 'App' in our src folder and inside that create a store.js file. We can use the redux-toolkit's  configureStore method here as it makes it really easy to configure our app's store.

All we need to do is override this configureStore method and export it. 
    import {configureStore} from '@reduxjs/toolkit';
    export default configureStore({
    reducer: {}
        })

Now, we need to make this store and the state in it available to all the app. So, we have to provide this store to our app and hence, we use a "Provider" from react-redux package inside our index.js file. 

    import {Provider} from 'react-redux';
    import store from './app/store';
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
        );

So now, any component in our app can use the state in the store.


2. Creating a service to fetch data from the api. 

One more thing that redux toolkit provides is "Query". The Query package lets us create a service that fetches data from an api. We can  use methods like createApi, fetchbase, fetch, etc to create a service.

e.g. let us create a service to fetch crypto coinds data from the coinranking api. So, we create a new folder called 'services' and inside that a new file named 'cryptoApi.js'.

In that, we need to import these two things initially - 

    import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

And now, we can use the createApi method to create the method to fetch data. What this createApi actually does is that it creates a reducer and a middlware that we need to attach to our store.

e.g. 
        
        export const cryptoApi =  createApi({
        //properties
        })

The createApi takes an object as a parameter and it has a few properties that we need to set - 

 a. reducerPath - It is used to tell redux toolkit where we want to keep all the data from the API in our store. 

     reducerPath: 'cryptoApi',

 b. baseQuery - We can use the fetchBaseQuery import from redux-toolkit/query to create a baseQuery from the baseURL of api that we have to call.

        baseQuery: fetchBaseQuery({baseUrl}),

 c. endpoints - Here we will set the operations we want to do with the API. endpoints property accepts a function that takes an argument 'builder'. This builder is used to set the operations we want to do with the API. e.g. if we want to fetch all the crypto coins, we can say - 


    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins'),
        })
    })

NOTE- Here, createRequest is just a helper function we created to get the url and headers together as an object - 

    const createRequest  = (url) => ({url, headers});




3. CONNECT THIS API TO THE STORE

All we need to do now is to import cryptoApi inside store.js and then specify the reducerPath and the reducer of api. For this, we can do - 

        import { cryptoApi } from '../services/cryptoApi';
        export default configureStore({
            reducer: {
                [cryptoApi.reducerPath]: cryptoApi.reducer,
            },
        })

Since createApi method inside cryptoApi is used to create a reducer, we can access taht reducer using 'cryptoApi.reducer'. All we need to do now is set that reducer as the value of reducerPath in the store.js file.


4. FETCHING DATA FROM THE API AND USE THE DATA ON THE UI

Now, let us say we want to get back the data from API and show it on hpmepage component of our app. All we need to do is export the custom hook from cryptoApi.js file and then use it in the hpmepage component.

The hook name will start with 'use' and end with 'Query'. In between, there will the name that we gave while we set the endpoints in cryptoApi.js file.  For example, we have set endpoints as 'getCryptoData'. So, from this file, we will export a hook named 'useGetCryptoDataQuery'.

    export const {useGetCryptoDataQuery} = cryptoApi;


And now, we import his hook inside our homepage component. The redux-toolkit by default gives us not jsut the data from this hook but also other things like loading state, error state, etc. So, we can use those other things in our component to do things like show a loader while data is being fetched etc. 

    import {useGetCryptoDataQuery} from '../services/cryptoApi';
    const {data, isFetching} = useGetCryptoDataQuery();

------------------------------------------------------

TO MAKE MORE REQUESTS TO API AT DIFFERENT ENDPOINTS, WE JUST NEED TO ADD NEW ENDPOINTS TO THE CRYPTOAPI.JS AND THAT'S IT. WE JUST NEED TO EXPORT THOSE AS HOOKS AND USE THEM WHEREVER WE WANT TO.
