pass_df = pd.read_csv("../match_logs/Big5@22-23@passing.csv")[["Att","Club"]].groupby(by="Club").mean().reset_index().sort_values("Att", ascending=False)
shot_df = pd.read_csv("../match_logs/Big5@22-23@shooting.csv")[["Sh","Club"]].groupby(by="Club").mean().reset_index().sort_values("Sh", ascending=False)
dribble_df = pd.read_csv("../match_logs/Big5@22-23@possession.csv")[["Att","Club"]].groupby(by="Club").mean().reset_index().sort_values("Att", ascending=False)
merged_df = pd.merge(
    pass_df.merge(shot_df, on="Club", suffixes=("", "_shot")),
    dribble_df, on="Club", suffixes=("_pass", "_dribble")
)
merged_df.rename(columns={"Sh":"Att_shot"}, inplace=True)
merged_df.to_csv("../match_logs/Big5@22-23@triple_stats.csv", index=False)