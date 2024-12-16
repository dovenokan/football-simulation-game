import random
import pandas as pd
import os
import math
from enum import Enum
from abc import abstractmethod, ABC

class DirectionType(Enum):
    TOP_LEFT = 1
    TOP_CENTER = 2
    TOP_RIGHT = 3
    MIDDLE_LEFT = 4
    CENTER = 5
    MIDDLE_RIGHT = 6
    BOTTOM_LEFT = 7
    BOTTOM_CENTER = 8
    BOTTOM_RIGHT = 9

    @classmethod
    def from_string(cls, direction: str) -> 'DirectionType':
        direction_mapping = {
            "Top Left": cls.TOP_LEFT,
            "Top Center": cls.TOP_CENTER,
            "Top Right": cls.TOP_RIGHT,
            "Middle Left": cls.MIDDLE_LEFT,
            "Center": cls.CENTER,
            "Middle Right": cls.MIDDLE_RIGHT,
            "Bottom Left": cls.BOTTOM_LEFT,
            "Bottom Center": cls.BOTTOM_CENTER,
            "Bottom Right": cls.BOTTOM_RIGHT
        }
        return direction_mapping.get(direction, cls.CENTER)

    @property
    def direction_factor(self) -> int:
        return self.value


class FootPreferenceType(Enum):
    RIGHT = 1
    LEFT = 2

    @classmethod
    def from_string(cls, foot_preference: str) -> 'FootPreferenceType':
        foot_mapping = {
            "Right": cls.RIGHT,
            "Left": cls.LEFT
        }
        result = foot_mapping.get(foot_preference)
        if result is None:
            raise ValueError(f'Invalid foot preference: {foot_preference}')
        return result

    @property
    def foot_factor(self) -> int:
        return self.value


class OutcomeType(Enum):
    GOAL = 1
    SAVED = 2
    OUT = 3
    HIT_WOODWORK = 4
    BLOCKED_BY_DEFENDER = 5
    BLOCK_DEFLECTED = 6

    @classmethod
    def from_string(cls, outcome: str) -> 'OutcomeType':
        outcome_mapping = {
            "Goal": cls.GOAL,
            "Saved": cls.SAVED,
            "Out": cls.OUT,
            "Woodwork": cls.HIT_WOODWORK,
            "Blocked": cls.BLOCKED_BY_DEFENDER,
            "Deflected": cls.BLOCK_DEFLECTED
        }
        result = outcome_mapping.get(outcome)
        if result is None:
            raise ValueError(f'Invalid outcome type: {outcome}')
        return result

    @property
    def outcome_factor(self) -> int:
        return self.value


class BodyType(Enum):
    FOOT = 1
    HEADER = 2

    @classmethod
    def from_string(cls, body: str) -> 'BodyType':
        body_mapping = {
            "Foot": cls.FOOT,
            "Header": cls.HEADER
        }
        result = body_mapping.get(body)
        if result is None:
            raise ValueError(f'Invalid body type: {body}')
        return result

    @property
    def body_factor(self) -> int:
        return self.value


class ShotCategoryType(Enum):
    ON_TARGET = 1
    OFF_TARGET = 2
    BLOCKED = 3

    @classmethod
    def from_string(cls, shotcategory: str) -> 'ShotCategoryType':
        shotcategory_mapping = {
            "ON TARGET": cls.ON_TARGET,
            "OFF TARGET": cls.OFF_TARGET,
            "BLOCKED": cls.BLOCKED
        }
        result = shotcategory_mapping.get(shotcategory)
        if result is None:
            raise ValueError(f'Invalid shot category type: {shotcategory}')
        return result

    @property
    def shotcategory_factor(self) -> int:
        return self.value
        

ON_TARGET_OUTCOMES = {
    OutcomeType.GOAL: 0.30,
    OutcomeType.SAVED: 0.70,
}

OFF_TARGET_OUTCOMES = {
    OutcomeType.OUT: 0.95,
    OutcomeType.HIT_WOODWORK: 0.05
}

BLOCKED_OUTCOMES = {
    OutcomeType.BLOCKED_BY_DEFENDER: 0.70,
    OutcomeType.BLOCK_DEFLECTED: 0.30
}

SHOT_CATEGORY_PROBABILITIES = {
    ShotCategoryType.ON_TARGET: 0.32,
    ShotCategoryType.OFF_TARGET: 0.50,
    ShotCategoryType.BLOCKED: 0.18 
}


class Location:
    def __init__(self, grid_x, grid_y, grid_length=24, grid_width=16):
        self.grid_x = grid_x
        self.grid_y = grid_y
        self.grid_length = grid_length
        self.grid_width = grid_width
        self.x = (grid_x / grid_length) * 105
        self.y = (grid_y / grid_width) * 68

    def calculate_distance_to_goal(self):
        goal_x = 105
        goal_y = 68 / 2
        return math.sqrt((self.x - goal_x) ** 2 + (self.y - goal_y) ** 2)


class ExpectedGoals:
    def __init__(self, location: Location, body_type: BodyType):
        self.location = location
        self.body_type = body_type

    def calculate_xg(self):
        distance = self.location.calculate_distance_to_goal()
        FOOT_SHOT_FORMULA = 0.85 * math.exp(-0.13 * distance)
        HEADER_SHOT_FORMULA = 1.13 * math.exp(-0.27 * distance)

        if BodyType.FOOT == self.body_type:
            return FOOT_SHOT_FORMULA
        elif BodyType.HEADER == self.body_type:
            return HEADER_SHOT_FORMULA
        return FOOT_SHOT_FORMULA
        

    def get_xg_factor(self):
        xg_value = self.calculate_xg()
        return max(0, min(xg_value, 1))


class ShotOutcome(ABC):
    @abstractmethod
    def determine(self) -> OutcomeType:
        pass


class ShotOnTargetOutcome(ShotOutcome):
    def __init__(self, xg):
        self.xg = xg

    def determine(self) -> OutcomeType:
        random_outcome = random.random()
        total = 0
        outcomes = [OutcomeType.GOAL, OutcomeType.SAVED]

        for outcome in outcomes:
            prob = ON_TARGET_OUTCOMES[outcome]
            total += prob
            if random_outcome < total:
                return outcome
        return OutcomeType.SAVED


class ShotOffTargetOutcome(ShotOutcome):
    def determine(self) -> OutcomeType:
        random_outcome = random.random()
        total = 0
        outcomes = [OutcomeType.OUT, OutcomeType.HIT_WOODWORK]

        for outcome in outcomes:
            prob = OFF_TARGET_OUTCOMES[outcome]
            total += prob
            if random_outcome < total:
                return outcome
        return OutcomeType.OUT


class ShotBlockedOutcome(ShotOutcome):
    def determine(self) -> OutcomeType:
        random_outcome = random.random()
        total = 0
        outcomes = [OutcomeType.BLOCKED_BY_DEFENDER, OutcomeType.BLOCK_DEFLECTED]

        for outcome in outcomes:
            prob = BLOCKED_OUTCOMES[outcome]
            total += prob
            if random_outcome < total:
                return outcome
        return OutcomeType.BLOCKED_BY_DEFENDER


class ShotOutcomeManager:
    def __init__(self):
        self.on_target_outcome = ShotOnTargetOutcome(ExpectedGoals(Location(21, 8), BodyType.FOOT))
        self.off_target_outcome = ShotOffTargetOutcome()
        self.blocked_shot_outcome = ShotBlockedOutcome()
        self.shot_category_type = None

    def set_shot_category_type(self, shot_category_type: str):
        if shot_category_type == "ON_TARGET":
            self.shot_category_type = "on_target"
        elif shot_category_type == "OFF_TARGET":
            self.shot_category_type = "off_target"
        elif shot_category_type == "BLOCKED":
            self.shot_category_type = "blocked"
        else:
            raise ValueError("Invalid outcome type. Must be 'ON_TARGET', 'OFF_TARGET', or 'BLOCKED'")

    def determine_outcome(self) -> OutcomeType:
        if self.shot_category_type is None:
            raise ValueError("Outcome type must be set before determining outcome")

        if self.shot_category_type == "on_target":
            return self.on_target_outcome.determine()
        elif self.shot_category_type == "off_target":
            return self.off_target_outcome.determine()
        else:
            return self.blocked_shot_outcome.determine()

    def determine_shot_category(self) -> ShotCategoryType:
        random_outcome = random.random()
        total = 0
        categories = [ShotCategoryType.ON_TARGET, ShotCategoryType.OFF_TARGET, ShotCategoryType.BLOCKED]

        for category in categories:
            prob = SHOT_CATEGORY_PROBABILITIES[category]
            total += prob
            if random_outcome < total:
                return category
        return ShotCategoryType.BLOCKED

    def determine_shot_outcome(self) -> OutcomeType:
        shot_category = self.determine_shot_category()
        self.set_shot_category_type(shot_category.name)
        return self.determine_outcome()


class PlayerSkills:
    def __init__(self, player_data):
        # Technical attributes
        self.finishing = normalize(player_data.get("Finishing", 50))
        self.technique = normalize(player_data.get("Technique", 50))
        self.first_touch = normalize(player_data.get("First_Touch", 50))
        self.passing = normalize(player_data.get("Passing", 50))
        self.dribbling = normalize(player_data.get("Dribbling", 50))
        self.flair = normalize(player_data.get("Flair", 50))
        self.tackling = normalize(player_data.get("Tackling", 50))
        self.heading = normalize(player_data.get("Heading", 50))
        self.marking = normalize(player_data.get("Marking", 50))
        self.crossing = normalize(player_data.get("Crossing", 50))
        self.corners = normalize(player_data.get("Corners", 50))
        self.positioning = normalize(player_data.get("Positioning", 50))
        
        # Mental attributes
        self.composure = normalize(player_data.get("Composure", 50))
        self.decisions = normalize(player_data.get("Decisions", 50))
        self.vision = normalize(player_data.get("Vision", 50))
        self.anticipation = normalize(player_data.get("Anticipation", 50))
        self.off_the_ball = normalize(player_data.get("Off_the_Ball", 50))
        self.concentration = normalize(player_data.get("Concentration", 50))
        self.determination = normalize(player_data.get("Determination", 50))
        self.work_rate = normalize(player_data.get("Work_Rate", 50))
        
        # Physical attributes
        self.acceleration = normalize(player_data.get("Acceleration", 50))
        self.agility = normalize(player_data.get("Agility", 50))
        self.balance = normalize(player_data.get("Balance", 50))
        self.strength = normalize(player_data.get("Strength", 50))
        self.stamina = normalize(player_data.get("Stamina", 50))
        self.pace = normalize(player_data.get("Pace", 50))
        self.jumping_reach = normalize(player_data.get("Jumping_Reach", 50))
        self.natural_fitness = normalize(player_data.get("Natural_Fitness", 50))

    def get_attacking_skill(self):
        # Calculate attacking skill based on relevant attributes
        technical_factor = (
            self.finishing * 0.25 +
            self.technique * 0.15 +
            self.first_touch * 0.15 +
            self.dribbling * 0.15 +
            self.flair * 0.1
        )
        
        mental_factor = (
            self.composure * 0.15 +
            self.decisions * 0.15 +
            self.vision * 0.1 +
            self.anticipation * 0.15 +
            self.off_the_ball * 0.15 +
            self.work_rate * 0.1
        )
        
        physical_factor = (
            self.acceleration * 0.15 +
            self.agility * 0.15 +
            self.pace * 0.15 +
            self.balance * 0.1
        )
        
        return (technical_factor * 0.4 + mental_factor * 0.4 + physical_factor * 0.2)

    def get_defensive_skill(self):
        # Calculate defensive skill based on relevant attributes
        technical_factor = (
            self.tackling * 0.25 +
            self.heading * 0.15 +
            self.marking * 0.2
        )
        
        mental_factor = (
            self.positioning * 0.2 +
            self.anticipation * 0.15 +
            self.concentration * 0.15 +
            self.composure * 0.1
        )
        
        physical_factor = (
            self.strength * 0.2 +
            self.jumping_reach * 0.15 +
            self.pace * 0.15 +
            self.stamina * 0.1 +
            self.natural_fitness * 0.1
        )
        
        return (technical_factor * 0.35 + mental_factor * 0.35 + physical_factor * 0.3)

    def get_goalkeeper_skill(self):
        # Goalkeeper specific attributes remain unchanged
        handling = normalize(self.player_data.get("Handling", 50))
        reflexes = normalize(self.player_data.get("Reflexes", 50))
        one_on_ones = normalize(self.player_data.get("One_on_Ones", 50))
        positioning = normalize(self.player_data.get("Positioning", 50))
        
        return (handling * 0.3 + reflexes * 0.3 + one_on_ones * 0.2 + positioning * 0.2)


class TeamSkills:
    def __init__(self, team_data):
        # Team attributes
        self.finishing = normalize(team_data.get("Finishing", 50))
        self.technique = normalize(team_data.get("Technique", 50))
        self.decisions = normalize(team_data.get("Decisions", 50))
        self.teamwork = normalize(team_data.get("Teamwork", 50))
        self.vision = normalize(team_data.get("Vision", 50))
        self.work_rate = normalize(team_data.get("Work_Rate", 50))
        self.communication = normalize(team_data.get("Communication", 50))
        self.creativity = normalize(team_data.get("Creativity", 50))
        self.crossing = normalize(team_data.get("Crossing", 50))
        self.corners = normalize(team_data.get("Corners", 50))
        self.leadership = normalize(team_data.get("Leadership", 50))

    def get_team_attack_factor(self):
        return (
            self.finishing * 0.2 +
            self.technique * 0.15 +
            self.decisions * 0.15 +
            self.teamwork * 0.15 +
            self.vision * 0.1 +
            self.work_rate * 0.1 +
            self.creativity * 0.1 +
            self.crossing * 0.05
        )

    def get_team_defense_factor(self):
        return (
            self.teamwork * 0.25 +
            self.communication * 0.2 +
            self.leadership * 0.15 +
            self.decisions * 0.2 +
            self.work_rate * 0.2
        )


class Luck:
    def __init__(self, min_luck, max_luck):
        self.min_luck = min_luck
        self.max_luck = max_luck

    def get_luck(self):
        return random.uniform(self.min_luck, self.max_luck)
        

class ShotEvent:
    def __init__(self, direction, location, foot_preference, xG):
        self.direction = direction
        self.location = location
        self.foot_preference = foot_preference
        self.xG = xG

    def calculate_base_probability(self):
        base_probability = 0.1  # Base probability of 50%
        return base_probability


class GoalProbability:
    def __init__(self, attacker_player, defender_player, shot_event, shot_outcome):
        self.attacker_player = attacker_player
        self.defender_player = defender_player
        self.shot_event = shot_event
        self.shot_outcome = shot_outcome
        
    def calculate_striker_factor(self):
        # Key attributes for strikers
        finishing = normalize(self.attacker_player["Finishing"])
        composure = normalize(self.attacker_player["Composure"])
        technique = normalize(self.attacker_player["Technique"])
        off_the_ball = normalize(self.attacker_player["Off_the_Ball"])
        
        # Calculate weighted average of striker attributes
        return (finishing * 0.4 + composure * 0.25 + technique * 0.2 + off_the_ball * 0.15)
    
    def calculate_goalkeeper_factor(self):
        # Key attributes for goalkeepers
        handling = normalize(self.defender_player["Handling"])
        reflexes = normalize(self.defender_player["Anticipation"])  # Using anticipation as reflexes
        one_on_ones = normalize(self.defender_player["One_on_Ones"])
        positioning = normalize(self.defender_player["Positioning"])
        
        # Calculate weighted average of goalkeeper attributes
        return (handling * 0.3 + reflexes * 0.3 + one_on_ones * 0.2 + positioning * 0.2)
    
    def calculate_team_factor(self):
        return 1  # Default factor if no team data is used
    
    def calculate_distance_factor(self):
        distance = self.shot_event.location.calculate_distance_to_goal()
        # Exponential decay based on distance
        return math.exp(-0.1 * distance)
    
    def calculate_goal_probability(self):
        return self.shot_outcome.calculate_final_probability(self.attacker_player, self.defender_player) * self.shot_event.xG.get_xg_factor()


class ShotOnTargetProbability:
    def __init__(self, shot_event, attacker_skills, defender_skills, attacker_team, defender_team, luck):
        self.shot_event = shot_event
        self.attacker_skills = attacker_skills
        self.defender_skills = defender_skills
        self.luck = luck
        self.attacker_team = attacker_team
        self.defender_team = defender_team
        self.outcome_manager = ShotOutcomeManager()

    def calculate_final_probability(self, attacker_team, defender_team):
        # Base probability from expected goals
        base_prob = self.shot_event.xG.get_xg_factor()
        
        # Individual player factors (30% influence)
        attacker_factor = self.attacker_skills.get_attacking_skill() * 0.3
        defender_factor = self.defender_skills.get_defensive_skill() * 0.3
        
        # Team factors (40% influence)
        team_attack_factor = attacker_team.get_team_attack_factor() * 0.4
        team_defense_factor = defender_team.get_team_defense_factor() * 0.4
        
        # Luck factor (10% influence)
        luck_factor = self.luck.get_luck() * 0.1
        
        # Calculate the weighted sum of all factors
        skill_modifier = (attacker_factor + team_attack_factor) - (defender_factor + team_defense_factor) + luck_factor
        
        # Apply the modifier to the base probability
        final_prob = base_prob * (1 + skill_modifier)
        
        # Ensure the probability stays within reasonable bounds
        return max(0.05, min(0.95, final_prob))

    def determine_outcome(self):
        return self.outcome_manager.determine_shot_outcome()

    def get_outcome_description(self, outcome: OutcomeType) -> str:
        return str(outcome)


def normalize(skill_value):
    return skill_value / 99.0


def load_player_data(player_name):
    csv_path = os.path.join(os.path.dirname(__file__), "testdata", "players.csv")
    df = pd.read_csv(csv_path)
    player = df[df['Name'] == player_name].iloc[0]
    return player


def load_team_data(team_name):
    csv_path = os.path.join(os.path.dirname(__file__), "testdata", "teams.csv")
    df = pd.read_csv(csv_path)
    team = df[df['Club'] == team_name].iloc[0]
    return team.to_dict()


if __name__ == "__main__":
    player_data = {
        "striker": "Robert Lewandowski",
        "goalkeeper": "Marc-André ter Stegen",
        "attacker_team": "FC Bayern",
        "defender_team": "FC Barcelona"
    }
    player_data2 = {
        "striker": "Serdar Dursun",
        "goalkeeper": "Marc-André ter Stegen",
        "attacker_team": "Fenerbahçe",
        "defender_team": "FC Barcelona"
    }

    # Load player data
    striker = load_player_data(player_data["striker"])
    goalkeeper = load_player_data(player_data["goalkeeper"])
    attacker_team = TeamSkills(load_team_data(player_data["attacker_team"]))
    defender_team = TeamSkills(load_team_data(player_data["defender_team"]))
    
    # Setup shot parameters
    shot_parameters = {
        "direction": DirectionType.from_string("Center"),
        "location": Location(21, 8),
        "foot_preference": FootPreferenceType.from_string(striker["Preferred Foot"]),
    }
    shot_parameters["distance"] = shot_parameters["location"].calculate_distance_to_goal()
    xg = ExpectedGoals(shot_parameters["location"], BodyType.FOOT)

    # Create shot event
    shot_event = ShotEvent(
        shot_parameters["direction"],
        shot_parameters["location"],
        shot_parameters["foot_preference"],
        xg
    )

    # Create player skills
    attacker_skills = PlayerSkills(striker)
    defender_skills = PlayerSkills(goalkeeper)
    luck = Luck(-0.8, 0.6)

    # Create outcome
    shot_outcome = ShotOnTargetProbability(
        shot_event,
        attacker_skills,
        defender_skills,
        attacker_team,
        defender_team,
        luck,
    )

    # Create GoalProbability instance
    goal_probability = GoalProbability(striker, goalkeeper, shot_event, shot_outcome)
    goal_probability_value = shot_outcome.calculate_final_probability(attacker_team, defender_team) * xg.get_xg_factor()

    # Test the outcome
    result = shot_outcome.determine_outcome()
    print(f"\nSimulating shot: {striker['Name']} vs {goalkeeper['Name']}")
    print(f"Shot on target probability: {shot_outcome.calculate_final_probability(attacker_team, defender_team):.2%}")
    print(f"Goal probability: {goal_probability_value:.2%}")
    print(f"Distance to goal: {shot_parameters['distance']:.2f}m")
    print(f"xG: {xg.get_xg_factor():.2%}")
    print(f"Shot outcome: {result}")