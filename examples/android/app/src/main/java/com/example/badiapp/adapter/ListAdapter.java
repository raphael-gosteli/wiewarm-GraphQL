package com.example.badiapp.adapter;

import android.content.Context;
import android.support.annotation.NonNull;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.apollographql.apollo.sample.GetBadQuery;

import java.util.List;

/**
 * Just used to display the data properly.
 */
public class ListAdapter extends ArrayAdapter<GetBadQuery.Bad> {
	private List<GetBadQuery.Bad> badList;
	private Context context;

	public ListAdapter(@NonNull Context context, int resource, List<GetBadQuery.Bad> badList) {
		super(context, resource, badList);
		this.context = context;
		this.badList = badList;
	}

	@NonNull
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {

		GetBadQuery.Bad bad = badList.get(position);

		LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
		convertView = inflater.inflate(android.R.layout.simple_list_item_1, null);
		((TextView) convertView.findViewById(android.R.id.text1)).setText(bad.name() + " (" + bad.location() + ")");

		return convertView;
	}


}
