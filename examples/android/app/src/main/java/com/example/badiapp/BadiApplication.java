package com.example.badiapp;

import android.app.Application;

import com.apollographql.apollo.ApolloClient;

import okhttp3.OkHttpClient;

/**
 * Used to create the apolloClient which is used to send the request on the defined BASE_URL. Needs
 * to be defined as application name in AndroidManifest.xml.
 */
public class BadiApplication extends Application {

	// Base url used to get the API data.
	private static final String BASE_URL = "https://wiewarm-graphql.raphaelgosteli.now.sh";

	private ApolloClient apolloClient;

	@Override
	public void onCreate() {
		super.onCreate();
		OkHttpClient okHttpClient = new OkHttpClient.Builder()
				.build();

		apolloClient = ApolloClient.builder()
				.serverUrl(BASE_URL)
				.okHttpClient(okHttpClient)
				.build();
	}

	/**
	 * Returns the created apolloClient
	 *
	 * @return the ApolloClient.
	 */
	public ApolloClient apolloClient() {
		return apolloClient;
	}
}
