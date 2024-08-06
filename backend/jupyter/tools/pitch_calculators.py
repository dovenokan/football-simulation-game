import numpy as np

def square_id_calculator(height_id, width_id, pitch={"height":16,"width":24}):
    return (pitch["height"] - height_id) * pitch["width"] + width_id

def pitch_to_coordinates(pitch_number, pitch={"height":16,"width":24}):
    pitch_number -= 1
    height_id = pitch["height"] - (pitch_number // pitch["width"])
    width_id = (pitch_number % pitch["width"]) + 1
    return {"x": width_id, "y": height_id}

def distance_to_goal(pitch_number, pitch={"height":16,"width":24}):
    dist_random_effect = np.random.choice([1, 2, 3])
    yards = (pitch["width"] - pitch_to_coordinates(pitch_number)["x"])
    meters = (yards * 0.9144) * 5 + dist_random_effect 
    return int(meters)

def expected_goals(pitch_number):
    distance = distance_to_goal(pitch_number)
    xg = 0.85*np.exp(-0.13*distance)
    return max(0.00001, round(xg, 3))