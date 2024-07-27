import pandas as pd
from collections import Counter
import matplotlib.pyplot as plt
from mplsoccer.pitch import Pitch
import matplotlib.patches as patches
import ast
import numpy as np

def Draw_Pitch_Actions(ATTRIBUTE_TITLE, actions_list, placeholder_counts_df_file_dir, pitch_color="beige", face_color="blue", edge_color="white"):
    counts_df = pd.read_csv(placeholder_counts_df_file_dir)
    counts_df.drop(columns=['count'], inplace=True)
    data_of_actions = pd.Series(dict(Counter(actions_list))).sort_index()
    counts_df['count'] = counts_df['Pitch_Number'].map(data_of_actions)

    def convert_to_tuple(s):
        try:
            return ast.literal_eval(s)
        except (SyntaxError, ValueError):
            return None
    counts_df['x_interval'] = counts_df['x_interval'].apply(convert_to_tuple)
    counts_df['y_interval'] = counts_df['y_interval'].apply(convert_to_tuple)

    def MinMaxNormalization(X):
        min_X = X.min()
        max_X = X.max()
        return (X-min_X) / (max_X-min_X)
    counts_df["alpha"] = MinMaxNormalization(counts_df["count"])
    counts_df['count'].fillna(0, inplace=True)
    
    pitch = Pitch(pitch_type='statsbomb', pitch_color=pitch_color, line_color='black')
    fig, ax = plt.subplots(figsize=(8, 12))
    pitch.draw(ax=ax)

    df = counts_df
    for _, row in df.iterrows():
        x_start, x_end = row['x_interval']
        y_start, y_end = row['y_interval']
        count = row['count']
        percentage = round(row['count'] / df['count'].sum(), 3)
        pitch_number = row['Pitch_Number']
        alphaValue = row['alpha']
        
        rect = patches.Rectangle(
            (y_start, x_start), 
            y_end - y_start,
            x_end - x_start, 
            linewidth=1,
            edgecolor=edge_color,
            facecolor=face_color,
            alpha=max(0.3, alphaValue)
        )
        ax.add_patch(rect)
        
        if count:
            ax.text(
                (y_start + y_end) / 2,
                (x_start + x_end) / 2, 
                f'\n\n{count}',
                ha='center',
                fontsize=4.9, color='white'
            )
            ax.text(
                (y_start + y_end) / 2,
                (x_start + x_end + 2) / 2, 
                f'\n@{pitch_number}',
                ha='center',
                fontsize=2.5, color="beige",
                alpha=0.3
            )          
    plt.title(f'{ATTRIBUTE_TITLE} ➡️')
    return fig

# test = Generate_Random_Match_Stats(location_df, volume_formula_df, tpr_a, tpr_b)["pass_map"]
# fig = Draw_Pitch_Actions("x", test, "../statsbomb/600sq_leverkusen_Pass_locations.csv")
# fig.savefig("./plots_imgs/counts_df_Locations.png", dpi=300, bbox_inches='tight')