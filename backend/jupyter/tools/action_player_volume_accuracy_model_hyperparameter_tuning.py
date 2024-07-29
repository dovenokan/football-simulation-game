actions_loop_list = [
        {"filter_min":900,"filter_max":1800,"filter_step":100,"target_variable":"Pass_Accuracy","target_volume":"Att","csv_file":"data/Big5@Players@Passing@2022_2023.csv","filter_column":"Att","gk_excluded":False},
        {"filter_min":12,"filter_max":24,"filter_step":3,"target_variable":"Pass/90","target_volume":"Att","csv_file":"data/Big5@Players@Passing@2022_2023.csv","filter_column":"90s","gk_excluded":False},
        {"filter_min":30,"filter_max":40,"filter_step":3,"target_variable":"Shot_Accuracy","target_volume":"Sh","csv_file":"data/Big5@Players@Shooting@2022_2023.csv","filter_column":"Sh","gk_excluded":True},
        {"filter_min":12,"filter_max":24,"filter_step":3,"target_variable":"Sh/90","target_volume":"Sh","csv_file":"data/Big5@Players@Shooting@2022_2023.csv","filter_column":"90s","gk_excluded":True},
        {"filter_min":30,"filter_max":60,"filter_step":3,"target_variable":"Dribble_Accuracy","target_volume":"Take-Ons","csv_file":"data/Big5@Players@Dribbling@2022_2023.csv","filter_column":"Take-Ons","gk_excluded":True},
        {"filter_min":12,"filter_max":24,"filter_step":3,"target_variable":"Dribble/90","target_volume":"Att","csv_file":"data/Big5@Players@Dribbling@2022_2023.csv","filter_column":"90s","gk_excluded":True},
    ]






with open("data/models_hyperparam.txt", "w", encoding="utf-8") as f:
    f.truncate(0)
    
for loop in actions_loop_list: #[3:4]:
    mae = 100
    target_variable = loop["target_variable"]
    target_volume = loop["target_volume"]
    csv_file = loop["csv_file"]
    filter_column = loop["filter_column"]
    gk_excluded = loop["gk_excluded"]
    range_df = pd.read_csv(csv_file)
    filter_min = loop["filter_min"]
    filter_max = loop["filter_max"]
    filter_step = loop["filter_step"]
    
    for filter_value in range(filter_min, filter_max, filter_step):
        for top_playersN in range(20, 100, 10):
            for top_colsN in range(10, len(fm_attributes), 3):
                prep_by = Prepare_Action_Player_Volume_Accuracy_Regression_Data(
                    players_df,
                    csv_file=csv_file,
                    filter_column=filter_column,
                    filter_value=filter_value,
                    target_variable=target_variable,
                    target_volume=target_volume,
                    top_playersN=top_playersN,
                    top_colsN=top_colsN,
                    fm_attributes=fm_attributes,
                    gk_excluded=gk_excluded
                )
                
                chosen_dict = {
                    "df": prep_by["df"],
                    "reg_cols": prep_by["reg_cols"],
                    "target": prep_by["target"],
                }
                current_df = pd.merge(team_df, chosen_dict["df"], how="inner", left_on="fbref_name", right_on="Squad", suffixes=("_club",""))
                for num in range(10,30+1): #test size between %10 to %30
                    test_size = round(num/100, 2)
                    this_mae = Train_Model(current_df, chosen_dict["reg_cols"], chosen_dict["target"], test_size)["mae"]
                    if this_mae < mae:
                        mae = this_mae
                        best_result = (target_variable, filter_value, top_playersN, top_colsN, test_size, mae)
                        markdown_str = f"""
                        | Target | Filter Value | Top Players N | Top Columns N | Test Size | Mean Absolute Error (MAE) |
                        |--------|--------------|---------------|---------------|-----------|----------------------------|
                        | {best_result[0]} | {best_result[1]} | {best_result[2]} | {best_result[3]} | {best_result[4]} | {best_result[5]} |
                        """
                        with open("data/models_hyperparam.txt", "a", encoding="utf-8") as f:
                            f.write(markdown_str)
                            f.write("\n\n")
                        #display(Markdown(markdown_str))
    print(target_variable)