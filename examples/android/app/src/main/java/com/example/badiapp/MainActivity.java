package com.example.badiapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.ListView;

import com.apollographql.apollo.ApolloCall;
import com.apollographql.apollo.api.Response;
import com.apollographql.apollo.exception.ApolloException;
import com.apollographql.apollo.fetcher.ApolloResponseFetchers;
import com.apollographql.apollo.sample.GetBadQuery;
import com.example.badiapp.adapter.ListAdapter;

import org.jetbrains.annotations.NotNull;

public class MainActivity extends AppCompatActivity {

	BadiApplication application;
	ApolloCall<GetBadQuery.Data> badiFeedCall;
	private ListView listView;

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		// Is used to get the apolloClient
		application = (BadiApplication) getApplication();
		listView = findViewById(R.id.badiliste);
		fetchFeed();
	}

	// Gets the response from the request and sets it to the listView in the app
	private ApolloCall.Callback<GetBadQuery.Data> dataCallback = new ApolloCall.Callback<GetBadQuery.Data>() {
		@Override
		public void onResponse(@NotNull final Response<GetBadQuery.Data> response) {
			// Here when the request had a response
			runOnUiThread(new Runnable() {
				@Override
				public void run() {
					setData(response);
				}
			});
		}

		@Override
		public void onFailure(@NotNull ApolloException e) {
			// Here when the request failed
			e.printStackTrace();
		}
	};

	/**
	 * Prepares the query and queues it.
	 */
	private void fetchFeed() {
		final GetBadQuery getBadQuery = GetBadQuery.builder().build();
		badiFeedCall = application.apolloClient().query(getBadQuery).responseFetcher(ApolloResponseFetchers.NETWORK_FIRST);
		badiFeedCall.enqueue(dataCallback);
	}

	/**
	 * Sets the received data to the listView.
	 *
	 * @param response is the data which is set to the listView.
	 */
	private void setData(Response<GetBadQuery.Data> response) {
		ListAdapter badiInfosAdapter = new ListAdapter(this, android.R.layout.simple_list_item_1, response.data().bads());

		listView.setAdapter(badiInfosAdapter);
	}
}
