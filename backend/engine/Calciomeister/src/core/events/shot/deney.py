import numpy as np

# Transition matrix (example probabilities for defensive actions in response to offensive actions)
transition_matrix = {
    "Pass": [("Interception", 0.4), ("Pressure", 0.3), ("Block", 0.3)],
    "Shot": [("Block", 0.5), ("Pressure", 0.3), ("Save", 0.2)],
    "Dribble": [("Tackle", 0.4), ("Pressure", 0.4), ("Block", 0.2)],
}

# Actions list (defensive actions)
defensive_actions = ["Interception", "Pressure", "Block", "Tackle", "Save"]

# Function to simulate a defensive response sequence
def generate_defensive_sequence(offensive_sequence):
    defensive_sequence = []
    
    for action in offensive_sequence:
        if action == "Shot":
            defensive_action = np.random.choice(["Block", "Pressure", "Save"], p=[0.5, 0.3, 0.2])
        elif action == "Pass":
            defensive_action = np.random.choice(["Interception", "Pressure", "Block"], p=[0.4, 0.3, 0.3])
        elif action == "Dribble":
            defensive_action = np.random.choice(["Tackle", "Pressure", "Block"], p=[0.4, 0.4, 0.2])
        defensive_sequence.append(defensive_action)
    
    return defensive_sequence

# Example offensive sequence (Pass -> Dribble -> Pass -> Shot)
offensive_sequence = ["Pass", "Dribble", "Pass", "Shot"]

# Generate the corresponding defensive sequence
defensive_sequence = generate_defensive_sequence(offensive_sequence)
print("Offensive Sequence:", offensive_sequence)
print("Defensive Sequence:", defensive_sequence)
