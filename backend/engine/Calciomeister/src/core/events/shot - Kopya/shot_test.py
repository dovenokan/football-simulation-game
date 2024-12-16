from shot_event import ShotEvent, load_player_data, load_team_data
from shot_event import DirectionType, FootPreferenceType, ShotCategoryType, BodyType, ShotOnTargetProbability, OutcomeType, GoalProbability
from shot_event import PlayerSkills, TeamSkills, Luck, Location, ExpectedGoals
from collections import Counter

def run_shot_simulation(matchups=None, num_shots=10000, output_file='results/output.txt'):
    with open(output_file, 'a', encoding='utf-8') as file:
        file.truncate(0)

    outcomes = Counter()  # Change outcomes to a Counter for unique counts
    results = []  # Store results for output

    for matchup in matchups:
        attacker_name = matchup["attacker"]
        defender_name = matchup["defender"]
        attacker_team = matchup["attacker_team"]
        defender_team = matchup["defender_team"]

        # Load player data once per matchup
        attacker = load_player_data(attacker_name)
        defender = load_player_data(defender_name)

        # Load team data once per matchup
        attacker_team_data = load_team_data(attacker_team)
        defender_team_data = load_team_data(defender_team)

        # Setup shot parameters once per matchup
        shot_parameters = {
            "direction": DirectionType.from_string("Center"),
            "location": Location(21, 8),
            "foot_preference": FootPreferenceType.from_string(attacker["Preferred Foot"]),
        }
        shot_parameters["distance"] = shot_parameters["location"].calculate_distance_to_goal()
        xg = ExpectedGoals(shot_parameters["location"], BodyType.FOOT)

        # Create shot event once per matchup
        shot_event = ShotEvent(
            shot_parameters["direction"],
            shot_parameters["location"],
            shot_parameters["foot_preference"],
            xg
        )

        # Create player skills once per matchup
        attacker_skills = PlayerSkills(attacker)
        defender_skills = PlayerSkills(defender)
        attacker_team_skills = TeamSkills(attacker_team_data)
        defender_team_skills = TeamSkills(defender_team_data)
        luck = Luck(-0.8, 0.6)

        # Create ShotOnTargetProbability instance
        shot_on_target_probability = ShotOnTargetProbability(
            shot_event,
            attacker_skills,
            defender_skills,
            attacker_team_skills,
            defender_team_skills,
            luck
        )

        # Prepare player and team attributes for output
        attacker_attributes = f"Attacker Attributes: Finishing: {attacker['Finishing']}, Technique: {attacker['Technique']}, First Touch: {attacker['First_Touch']}\n"
        defender_attributes = f"Defender Attributes: Handling: {defender['Handling']}, Reflexes: {defender['Anticipation']}, Positioning: {defender['Positioning']}\n"
        attacker_team_attributes = f"Attacker Team Attributes: Finishing: {attacker_team_data['Finishing']}, Teamwork: {attacker_team_data['Teamwork']}\n"
        defender_team_attributes = f"Defender Team Attributes: Finishing: {defender_team_data['Finishing']}, Teamwork: {defender_team_data['Teamwork']}\n"

        for _ in range(num_shots):
            result = shot_on_target_probability.determine_outcome()
            outcomes[result] += 1  # Increment the count for the unique outcome

        # Prepare results for writing to file
        total_shots = sum(outcomes.values())  # Total shots is the sum of counts
        sorted_outcomes = sorted(outcomes.items(), key=lambda x: str(x[0]))  # Sort outcomes alphabetically
        results.append(f"{matchup['attacker']} vs {matchup['defender']}\n")
        results.append(attacker_attributes)
        results.append(defender_attributes)
        results.append(attacker_team_attributes)
        results.append(defender_team_attributes)
        for outcome, count in sorted_outcomes:
            percentage = (count / total_shots) * 100
            results.append(f"{outcome}: {count} shots ({percentage:.2f}%)\n")
        results.append("--------------------------------------\n")

    # Write all results to file at once
    with open(output_file, 'a', encoding='utf-8') as file:
        file.writelines(results)

if __name__ == "__main__":
    matchups = [
        {"attacker": "Robert Lewandowski", "defender": "Marc-André ter Stegen", "attacker_team": "FC Bayern", "defender_team": "FC Barcelona"},
        {"attacker": "Serdar Dursun", "defender": "Marc-André ter Stegen", "attacker_team": "Fenerbahçe", "defender_team": "FC Barcelona"}
    ]
    run_shot_simulation(matchups=matchups, num_shots=10000)