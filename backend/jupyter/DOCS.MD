# Jupyter Notebook Documentation

## Data Processing & Analysis Notebooks

### Data Preprocessing.ipynb
**Purpose**: Main data preprocessing notebook for cleaning and transforming FM23 player data
- Loads raw FM23 player data and applies various transformations
- Normalizes player attributes and calculates TPR (Total Player Rating) scores
- Maps team and league IDs
- Generates processed dataset for further analysis

**Dependencies**:
- pandas, numpy, seaborn
- BeautifulSoup, requests (for web scraping)
- players_db/fm23/uluta_fm23data.csv (raw input data)
- players_db/fm23/fminside_team_names.csv (team name mappings)

**Outputs**:
- players_db/fm23/fm23db_processed.csv (cleaned and processed player dataset)

### Match Logs.ipynb 
**Purpose**: Processes match statistics and event data from FBRef
- Scrapes match logs for top 5 leagues
- Processes passing, shooting, defense and other match events
- Calculates team-level statistics

**Dependencies**:
- pandas, numpy, BeautifulSoup
- requests (for web scraping)
- players_db/fm23/team_ratings.csv

**Outputs**:
- match_logs/Big5@22-23@*.csv files (various match statistics)

### League_Simulation.ipynb
**Purpose**: Simulates league matches and calculates win probabilities
- Uses processed player/team data to simulate match outcomes
- Calculates win/draw/loss probabilities based on team ratings
- Generates league tables from simulations

**Dependencies**:
- pandas, numpy
- players_db/fm23/fm23db_processed.csv
- players_db/fm23/team_ratings.csv
- players_db/fm23/win_probability.csv

**Outputs**:
- Simulated league tables and match probabilities

### Coaching.ipynb
**Purpose**: Analyzes team tactics and playing styles
- Processes team tactics data from FIFA 23
- Analyzes relationships between tactics and match outcomes
- Calculates tactical success rates

**Dependencies**:
- pandas, numpy
- players_db/fm23/tactics_of_teams_fc23.csv
- players_db/fm23/team_ratings.csv
- match_logs/Big5@22-23@*.csv files

**Outputs**:
- Tactical analysis statistics and success rates

## Action Volume Analysis

### action_volume/*.ipynb
Collection of notebooks analyzing player action volumes (passes, shots, etc)

**Dependencies**:
- pandas, numpy, scikit-learn
- match_logs/Big5@22-23@*.csv files
- players_db/fm23/fm23db_processed.csv

**Outputs**:
- action_volume/formulas/*.csv (statistical formulas for predicting action volumes)

## Archive

### archive/old_with_fifa_db/*
Legacy notebooks using FIFA database instead of FM23 data
- Kept for reference but no longer actively used
- Contains older analysis approaches and methods

## Key Files

- TREE.md: Documents the action tree structure used for match simulation
- players_db/fm23/fm23db_processed.csv: Main processed player dataset
- match_logs/Big5@22-23/*.csv: Match event data for top 5 leagues
- players_db/fm23/team_ratings.csv: Team-level ratings and statistics

## Usage Notes

1. Run Data Preprocessing.ipynb first to generate processed dataset
2. Match Logs.ipynb requires FBRef access for scraping match data
3. League_Simulation.ipynb and Coaching.ipynb depend on processed data
4. Action volume analysis requires both processed player data and match logs

The notebooks are designed to be run in sequence, with each building on the outputs of previous processing steps. All data paths are relative to the jupyter/ root directory.
