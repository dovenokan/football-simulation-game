import pandas as pd
from collections import Counter
import matplotlib.pyplot as plt
from mplsoccer.pitch import Pitch
import matplotlib.patches as patches
import ast
import numpy as np

class Draw_Pitch_Actions:
    def __init__(self, actions_list, is_count_list, placeholder_counts_df_file_dir, ATTRIBUTE_TITLE="title", pitch_color="beige", face_color="blue", edge_color="white", count_color="white", location_color="beige"):
        self.ATTRIBUTE_TITLE = ATTRIBUTE_TITLE
        self.actions_list = actions_list
        self.is_count_list = is_count_list
        self.placeholder_counts_df_file_dir = placeholder_counts_df_file_dir
        self.pitch_color = pitch_color
        self.face_color = face_color
        self.edge_color = edge_color
        self.count_color = count_color
        self.location_color = location_color

    def convert_to_tuple(self, s):
        try:
            return ast.literal_eval(s)
        except:
            return s

    def MinMaxNormalization(self, X):
        min_X = X.min()
        max_X = X.max()
        return (X-min_X) / (max_X-min_X)
    
    def plot(self):
        counts_df = pd.read_csv(self.placeholder_counts_df_file_dir)
        counts_df.drop(columns=['count'], inplace=True)
        if self.is_count_list:
            data_of_actions = self.actions_list
        else:
            data_of_actions = pd.Series(dict(Counter(self.actions_list))).sort_index()
        counts_df['count'] = counts_df['Pitch_Number'].map(data_of_actions)
        counts_df['count'].fillna(0, inplace=True)
        
        # counts_df['x_interval'] = self.convert_to_tuple(counts_df['x_interval'])
        # counts_df['y_interval'] = self.convert_to_tuple(counts_df['y_interval'])
        counts_df["alpha"] = self.MinMaxNormalization(counts_df["count"])
        
        pitch = Pitch(pitch_type='statsbomb', pitch_color=self.pitch_color, line_color='black')
        fig, ax = plt.subplots(figsize=(8, 12))
        pitch.draw(ax=ax)
    
        for _, row in counts_df.iterrows():
            x_start, x_end = self.convert_to_tuple(row['x_interval'])
            y_start, y_end = self.convert_to_tuple(row['y_interval'])
            count = row['count']
            percentage = round(row['count'] / counts_df['count'].sum(), 3)
            pitch_number = row['Pitch_Number']
            alphaValue = row['alpha']
            
            rect = patches.Rectangle(
                (y_start, x_start), 
                y_end - y_start,
                x_end - x_start, 
                linewidth=1,
                edgecolor=self.edge_color,
                facecolor=self.face_color,
                alpha=max(0.3, alphaValue)
            )
            ax.add_patch(rect)
            
            if count:
                ax.text(
                    (y_start + y_end) / 2,
                    (x_start + x_end) / 2, 
                    f'\n\n{count}',
                    ha='center',
                    fontsize=4.9,
                    color=self.count_color
                )
                ax.text(
                    (y_start + y_end) / 2,
                    (x_start + x_end + 2) / 2,
                    f'\n@{pitch_number}',
                    ha='center',
                    fontsize=2.5,
                    color=self.location_color,
                    alpha=0.3
                )
                
        plt.title(f'{self.ATTRIBUTE_TITLE} ➡️')
        self.fig = fig
        self.counts_df = counts_df
        return self
        
    def save_fig(self, save_location):
        self.fig.savefig(save_location, dpi=300, bbox_inches='tight')

# actions_generated = Generate_Random_Match_Stats(72, 64, match_number=1)["pass_map"]
# p = Draw_Pitch_Actions(actions_generated, "../statsbomb/600sq_leverkusen_Pass_locations.csv", "pass_map").plot() \
#     .save_fig("./plots_imgs/counts_df_Locations.png")