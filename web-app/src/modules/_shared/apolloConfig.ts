import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    from,
    InMemoryCache,
    OperationVariables,
    QueryHookOptions,
    QueryResult,
    TypedDocumentNode,
    useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
//import { showError } from './alerts';
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { DocumentNode } from "graphql";
import React from "react";
//import ApolloLinkTimeout from 'apollo-link-timeout';
//@ts-ignore
import { SubscriptionClient } from "subscriptions-transport-ws";
import K from "./constants";
import { dismissNotifications, showErrorMessage } from "./events";

const BASE_URL =
    process.env.NODE_ENV === "development" ? K.BASE_API_URL.STAGING : K.BASE_API_URL.PRODUCTION;
const SECURED = BASE_URL.startsWith("localhost") ? "" : "s";
const HTTP_URL = `http${SECURED}://${BASE_URL}/graphql`;
const SOCKET_URL = `ws${SECURED}://${BASE_URL}/graphql`;

const httpLink = createHttpLink({
    uri: HTTP_URL,
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem(K.STORAGE_KEYS.JWT_TOKEN);

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
        },
    };
});

const wsClient = new SubscriptionClient(SOCKET_URL, {
    reconnect: true,
    lazy: true,
    connectionParams: () => {
        const token = localStorage.getItem(K.STORAGE_KEYS.JWT_TOKEN);
        return {
            Authorization: token ? `Bearer ${token}` : "",
        };
    },
});

const websocketLink = new WebSocketLink(wsClient);

const link = from([httpLink]);

const terminatingLink = ApolloLink.split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
    },
    websocketLink,
    link
);

// Initialize Apollo Client
export const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, terminatingLink]),
    cache: new InMemoryCache({}),
});

type IResponse<T> = { success?: boolean; error?: string; data?: T };

export async function mutate<TData = any, TVariables = any>(
    mutateQuery: DocumentNode,
    mutateVariables: TVariables
): Promise<IResponse<TData>> {
    try {
        dismissNotifications();
        const { data: _data, errors } = await apolloClient.mutate<{ data: TData }>({
            mutation: mutateQuery,
            variables: mutateVariables,
        });

        const data = _data?.data;
        if (errors) throw errors[0].message;

        return { data: data as TData, success: true };
    } catch (e) {
        showErrorMessage((e as Error).message);
        return { success: false, error: (e as Error).message };
    }
}

export function useApiQuery<TData = any, TVariables = OperationVariables>(
    query: DocumentNode | TypedDocumentNode<TData, TVariables>,
    options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
    const data = useQuery<TData, TVariables>(query, options);

    React.useEffect(() => {
        if (!data.error) return;

        const statusCode = (data.error?.networkError as any)?.statusCode;

        showErrorMessage(
            statusCode === 500
                ? "Something went wrong, our team will investigate into this"
                : data.error.message
        );
    }, [data.loading, data.data, data.error]);

    return data;
}
