position_mapping = {
    'Right Center Forward': 'ST',
    'Left Center Forward': 'ST',
    'Center Back': 'DC',
    'Right Center Back': 'DC',
    'Right Wing Back': 'WBR',
    'Goalkeeper': 'GK',
    'Left Center Back': 'DC',
    'Left Defensive Midfield': 'DM',
    'Right Defensive Midfield': 'DM',
    'Center Forward': 'ST',
    'Left Wing Back': 'WBL',
    'Right Center Midfield': 'MC',
    'Right Attacking Midfield': 'AMR',
    'Left Center Midfield': 'MC',
    'Left Attacking Midfield': 'AML',
    'Center Defensive Midfield': 'DM',
    'Center Attacking Midfield': 'AMC',
    'Right Back': 'DR',
    'Left Back': 'DL',
    'Right Wing': 'AMR',
    'Left Wing': 'AML',
    'Right Midfield': 'MR',
    'Left Midfield': 'ML'
}

master_events_df['Pos'] = master_events_df['position'].map(position_mapping)
master_events_df.to_csv("./data/master_events_processed.csv", index=False)