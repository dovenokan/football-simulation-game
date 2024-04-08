import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
import re
import warnings

def TPR(df, top_N_players=18):
    '''
    Team Power Rating
    '''
    # Group the DataFrame by club_name
    club_groups = df.groupby('club_name')

    # Initialize an empty list to store the DataFrames
    dfs = []

    # Iterate over each club
    for club_name, club_data in club_groups:
        # Sort the values by "overall" in descending order and select top 18 players
        top_players = club_data.sort_values(by='overall', ascending=False).head(top_N_players)

        # Separate players by positions
        goalkeepers = top_players[top_players['player_positions'].str.contains('GK')]
        outfield_players = top_players[~top_players['player_positions'].str.contains('GK')]

        # Calculate the mean of the attributes for outfield players
        mean_outfield_attributes = outfield_players.mean()

        # Create a DataFrame with club information and mean outfield attributes
        club_df = pd.DataFrame({
            "league_id": int(top_players.iloc[0]['league_id']),
            "club_team_id": int(top_players.iloc[0]['club_team_id']),  # Assuming club_team_id is the same for all players in a club
            "league_name": top_players.iloc[0]['league_name'],
            "club_name": club_name,
            "power": int(mean_outfield_attributes['overall']),  # Mean overall rating
        }, index=[0])  # Use index=[0] to ensure it's a DataFrame with a single row

        # Calculate the mean of the attributes for goalkeepers
        if not goalkeepers.empty:
            mean_goalkeeper_attributes = goalkeepers.mean()
            # Add mean goalkeeper attributes to the club DataFrame
            club_df["mean_goalkeeping_diving"] = int(mean_goalkeeper_attributes['goalkeeping_diving'])
            club_df["mean_goalkeeping_handling"] = int(mean_goalkeeper_attributes['goalkeeping_handling'])
            club_df["mean_goalkeeping_kicking"] = int(mean_goalkeeper_attributes['goalkeeping_kicking'])
            club_df["mean_goalkeeping_positioning"] = int(mean_goalkeeper_attributes['goalkeeping_positioning'])
            club_df["mean_goalkeeping_reflexes"] = int(mean_goalkeeper_attributes['goalkeeping_reflexes'])

        # Add mean attributes for outfield players
        outfield_attributes = [
            'attacking_crossing', 'attacking_finishing', 'attacking_heading_accuracy',
            'attacking_short_passing', 'attacking_volleys', 'skill_dribbling',
            'skill_curve', 'skill_fk_accuracy', 'skill_long_passing',
            'skill_ball_control', 'movement_acceleration', 'movement_sprint_speed',
            'movement_agility', 'movement_reactions', 'movement_balance',
            'power_shot_power', 'power_jumping', 'power_stamina', 'power_strength',
            'power_long_shots', 'mentality_aggression', 'mentality_interceptions',
            'mentality_positioning', 'mentality_vision', 'mentality_penalties',
            'mentality_composure', 'defending_marking_awareness',
            'defending_standing_tackle', 'defending_sliding_tackle'
        ]
        for attribute in outfield_attributes:
            club_df[f"mean_{attribute}"] = int(mean_outfield_attributes[attribute])

        # Append the DataFrame to the list
        dfs.append(club_df)

    # Concatenate all DataFrames in the list
    merged = pd.concat(dfs, ignore_index=True)

    # Display the resulting DataFrame
    return {
        "name": "power",
        "data": merged.sort_values("power", ascending=False)
    }


def TFR(df, top_N_players=18):
    '''
    Team Finishing Rating
    '''
    # Group the DataFrame by club_name
    club_groups = df.groupby('club_name')

    # Initialize an empty list to store the DataFrames
    dfs = []

    # Iterate over each club
    for club_name, club_data in club_groups:
        # Sort the values by "overall" in descending order and select top 18 players
        top_players = club_data.sort_values(by='overall', ascending=False).head(top_N_players)
        
        # Separate players by positions
        attackers = top_players[top_players['player_positions'].str.contains('ST|CF|LW|RW|LF|RF')]
        midfielders = top_players[top_players['player_positions'].str.contains('CAM|LM|RM|CM|CDM')]
        defenders = top_players[top_players['player_positions'].str.contains('CB|LB|RB|LWB|RWB')]
        
        # Calculate mean attributes for each position group
        mean_attacking_finishing = attackers['attacking_finishing'].mean()
        mean_shot_power = midfielders['power_shot_power'].mean()
        mean_long_shots = midfielders['power_long_shots'].mean()
        mean_heading_accuracy = defenders['attacking_heading_accuracy'].mean()
        mean_power = top_players['overall'].mean()
        
        
        # Calculate the "finishing" rating based on positions
        finishing_rating = (mean_attacking_finishing * 0.4 +
                           mean_shot_power * 0.35 +
                           mean_long_shots * 0.2 +
                           mean_heading_accuracy * 0.05)

        # Create a DataFrame with club information and finisher rating
        club_df = pd.DataFrame({
            "league_id": top_players.iloc[0]['league_id'],
            "club_team_id": top_players.iloc[0]['club_team_id'],  
            "league_name": top_players.iloc[0]['league_name'],
            "club_name": club_name,
            "power":int(mean_power),
            "finishing": int(finishing_rating)
        }, index=[0])

        # Append the DataFrame to the list
        dfs.append(club_df)

    # Concatenate all DataFrames in the list
    merged = pd.concat(dfs, ignore_index=True)

    # Display the resulting DataFrame
    return {
        "name": "finishing",
        "data": merged.sort_values("finishing", ascending=False)
    }

def TPSR(df, top_N_players=18):
    '''
    Team Passing Rating
    '''
    # Group the DataFrame by club_name
    club_groups = df.groupby('club_name')
    tpr_data = TPR(df, top_N_players=18)["data"]

    # Initialize an empty list to store the DataFrames
    dfs = []

    # Iterate over each club
    for club_name, club_data in club_groups:
        # Sort the values by "overall" in descending order and select top 18 players
        top_players = club_data.sort_values(by='overall', ascending=False).head(top_N_players)
        
        # Separate players by positions
        outfield_players = top_players[~top_players['player_positions'].str.contains('GK')]
        
        # Calculate mean attributes for midfielders
        mean_short_passing = outfield_players['attacking_short_passing'].mean()
        mean_long_passing = outfield_players['skill_long_passing'].mean()
        mean_curve = outfield_players['skill_curve'].mean()
        mean_ball_control = outfield_players['skill_ball_control'].mean()
        mean_vision = outfield_players['mentality_vision'].mean()
        
        # Calculate the "passing" rating based on midfielders
        passing_rating = (mean_short_passing * 0.40 +
                          mean_long_passing * 0.25 +
                          mean_curve * 0.05 +
                          mean_ball_control * 0.15 +
                          mean_vision * 0.15)

        # Create a DataFrame with club information and passing rating
        club_df = pd.DataFrame({
            "league_id": top_players.iloc[0]['league_id'],
            "club_team_id": top_players.iloc[0]['club_team_id'],  
            "league_name": top_players.iloc[0]['league_name'],
            "club_name": club_name,
            "power":  tpr_data.loc[tpr_data['club_name'] == club_name, 'power'].values[0],
            "passing": int(passing_rating)
        }, index=[0])

        # Append the DataFrame to the list
        dfs.append(club_df)

    # Concatenate all DataFrames in the list
    merged = pd.concat(dfs, ignore_index=True)

    # Display the resulting DataFrame
    return merged.sort_values("passing", ascending=False)

def TGKR(df, top_N_players=1):
    '''
    Team Goalkeeping Rating
    '''
    # Group the DataFrame by club_name
    club_groups = df.groupby('club_name')

    # Initialize an empty list to store the DataFrames
    dfs = []
    tpr_data = TPR(df, top_N_players=18)["data"]
        
    # Iterate over each club
    for club_name, club_data in club_groups:
        # Sort the values by "overall" in descending order and select top N players
        top_players = club_data.sort_values(by='overall', ascending=False)
        
        # Filter top players DataFrame to include only those in 'GK' position
        gk_players = top_players[top_players['player_positions'].str.contains('GK')].sort_values(by='overall', ascending=False).head(n=1)
        
        if not gk_players.empty:
            # Calculate mean attributes for goalkeepers
            mean_goalkeeping_diving = gk_players['goalkeeping_diving'].mean()
            mean_goalkeeping_handling = gk_players['goalkeeping_handling'].mean()
            mean_goalkeeping_kicking = gk_players['goalkeeping_kicking'].mean()
            mean_goalkeeping_positioning = gk_players['goalkeeping_positioning'].mean()
            mean_goalkeeping_reflexes = gk_players['goalkeeping_reflexes'].mean()

            # Calculate the "goalkeeper skill" rating based on attributes
            gk_skill_rating = (mean_goalkeeping_diving * 0.15 +
                               mean_goalkeeping_handling * 0.20 +
                               mean_goalkeeping_kicking * 0.10 +
                               mean_goalkeeping_positioning * 0.30 +
                               mean_goalkeeping_reflexes * 0.25)

            # Create a DataFrame with club information and goalkeeper skill rating
            club_df = pd.DataFrame({
                "league_id": top_players.iloc[0]['league_id'],
                "club_team_id": top_players.iloc[0]['club_team_id'],  
                "league_name": top_players.iloc[0]['league_name'],
                "club_name": club_name,
                "power": tpr_data.loc[tpr_data['club_name'] == club_name, 'power'].values[0],
                "goalkeeping": int(gk_skill_rating)
            }, index=[0])

            # Append the DataFrame to the list
            dfs.append(club_df)

    # Concatenate all DataFrames in the list
    merged = pd.concat(dfs, ignore_index=True)

    # Display the resulting DataFrame
    return merged.sort_values("goalkeeping", ascending=False)

def TDR(df, top_N_players=18):
    '''
    Team Defense Rating
    '''
    # Group the DataFrame by club_name
    club_groups = df.groupby('club_name')

    # Initialize an empty list to store the DataFrames
    dfs = []
    tpr_data = TPR(df, top_N_players=18)["data"]

    # Iterate over each club
    for club_name, club_data in club_groups:
        # Sort the values by "overall" in descending order and select top 18 players
        top_players = club_data.sort_values(by='overall', ascending=False)
        
        # Separate players by positions
        midfielders = top_players[top_players['player_positions'].str.contains('LM|RM|CM|CDM')].sort_values(by='overall', ascending=False).head(8)
        defenders = top_players[top_players['player_positions'].str.contains('CB|LB|RB|LWB|RWB')].sort_values(by='overall', ascending=False).head(8)
        
        # Calculate mean attributes for each position group
        mean_defending_stand_tackle_defenders = defenders['defending_standing_tackle'].mean()
        mean_defending_slide_tackle_defenders = defenders['defending_sliding_tackle'].mean()
        mean_defending_stand_tackle_midfielders = midfielders['defending_standing_tackle'].mean()
        mean_defending_slide_tackle_midfielders = midfielders['defending_sliding_tackle'].mean()
        mean_aggression = midfielders['mentality_aggression'].mean()
        mean_marking = defenders['defending_marking_awareness'].mean()
        mean_mentality_positioning = defenders['mentality_positioning'].mean()
        mean_mentality_interceptions = midfielders['mentality_interceptions'].mean()
        mean_movement_sprint_speed = defenders['movement_sprint_speed'].mean()
        mean_defenders = defenders['overall'].mean()

        
        # Calculate the "defense" rating based on positions
        defense_rating = (mean_defenders * 0.2 +
                          mean_defending_stand_tackle_defenders * 0.1 +
                          mean_defending_slide_tackle_defenders * 0.1 +
                          mean_defending_stand_tackle_midfielders * 0.05 +
                          mean_defending_slide_tackle_midfielders * 0.05 +
                          mean_aggression * 0.05 +
                          mean_marking * 0.1 +
                          mean_mentality_positioning * 0.15 +
                          mean_mentality_interceptions * 0.1 +
                          mean_movement_sprint_speed * 0.1)

        # Create a DataFrame with club information and defense rating
        club_df = pd.DataFrame({
            "league_id": top_players.iloc[0]['league_id'],
            "club_team_id": top_players.iloc[0]['club_team_id'],  
            "league_name": top_players.iloc[0]['league_name'],
            "club_name": club_name,
            "power": tpr_data.loc[tpr_data['club_name'] == club_name, 'power'].values[0],
            "defense": int(defense_rating)
        }, index=[0])

        # Append the DataFrame to the list
        dfs.append(club_df)

    # Concatenate all DataFrames in the list
    merged = pd.concat(dfs, ignore_index=True)

    # Display the resulting DataFrame
    return merged.sort_values("defense", ascending=False)





