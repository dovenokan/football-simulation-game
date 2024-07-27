def Formation_Dict(formation="4-2-3-1"):
    test_formation = { 'GK': 1, 'DL': 1, 'DC': 2, 'DR': 1, 'DM': 0, 'MC': 2, 'AML': 1, 'AMR': 1, 'AMC': 1, 'ST': 1 } #4231
    #test_formation = { 'GK': 1, 'DC': 3, 'WBL': 1, 'WBR': 1, 'DM': 0, 'MC': 3, 'AML': 0, 'AMR': 0, 'ST': 2 }
    return test_formation

import pandas as pd

def LineupTPR(df: pd.DataFrame, team_name: str, print_lineup: bool = False, show_squad: bool = False) -> pd.DataFrame:
    if "Club" not in df.columns:
        raise ValueError("The DataFrame has not 'Club' column.")
    current_attribute = "tpr"
    club_groups = df.query(f"Club == '{team_name}'").groupby('Club')
    club_rating_dict = {}

    for club, group in club_groups:
        positions = Formation_Dict(formation="4-3-3")
        
        selected_players = []
        used_players = set()
        player_positions = {}
        
        for position, count in positions.items():
            position_group = group[group['Position'].apply(lambda x: any(position in x.split(",") for i in x.split(",") if i == position))]
            
            if position_group.empty:
                position_group = group[group['Position'].apply(lambda x: any(position in x.split(",") for i in x.split(",") if i == position))]
            
            position_group = position_group[~position_group.index.isin(used_players)]
            top_position_players = position_group.nlargest(count, f'tpr_{position}')
            
            selected_players.extend(top_position_players.index.tolist())
            used_players.update(top_position_players.index.tolist())
            for player in top_position_players.index:
                player_positions[player] = position

        while len(selected_players) < 11:
            remaining_players = group[~group.index.isin(used_players)]
            if remaining_players.empty:
                break
            next_best_player = remaining_players.nlargest(1, f'tpr_{position}')
            selected_players.extend(next_best_player.index.tolist())
            used_players.update(next_best_player.index.tolist())

        lineup_players = group.loc[selected_players].sort_values(by="Pos_Rank")
        lineup_players['Playing_Position'] = lineup_players.index.map(player_positions)
    

    if print_lineup:
        print(lineup_players[["Name","Best_Pos","tpr","Playing_Position"]])

    if show_squad:
        return df.query(f"Club == '{team_name}'")
    return lineup_players