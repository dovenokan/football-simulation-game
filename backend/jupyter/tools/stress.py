def stress_resistance_score(player_data):
    composure = player_data.get('Composure', 0)
    concentration = player_data.get('Concentration', 0)
    determination = player_data.get('Determination', 0)
    leadership = player_data.get('Leadership', 0)
    
    # Assign weights to each attribute if needed, otherwise, they all contribute equally
    weight_composure = 1.0
    weight_concentration = 1.0
    weight_determination = 1.2  # Higher weight if determination is more critical
    weight_leadership = 1.1  # Higher weight if leadership is more critical
    
    # Calculate the weighted sum
    weighted_sum = (composure * weight_composure +
                    concentration * weight_concentration +
                    determination * weight_determination +
                    leadership * weight_leadership)
    
    # Normalize the score if desired (e.g., divide by the sum of weights)
    total_weight = weight_composure + weight_concentration + weight_determination + weight_leadership
    normalized_score = weighted_sum / total_weight
    
    return normalized_score

# Example usage with Joshua Kimmich's data
player_data = {
    'Composure': 14,
    'Concentration': 14,
    'Determination': 18,
    'Leadership': 19
}

score = stress_resistance_score(player_data)
print(math.ceil(score))  # Output: Numeric score indicating stress resistance