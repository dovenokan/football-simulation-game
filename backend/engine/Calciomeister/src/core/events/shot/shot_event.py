from enum import Enum
from dataclasses import dataclass, field
from typing import List, Optional, Dict, Tuple
import random
import pandas as pd
import os
import math

class Direction(Enum):
    TOP_LEFT = "Top Left"
    TOP_CENTER = "Top Center"
    TOP_RIGHT = "Top Right"
    MIDDLE_LEFT = "Middle Left"
    CENTER = "Center"
    MIDDLE_RIGHT = "Middle Right"
    BOTTOM_LEFT = "Bottom Left"
    BOTTOM_CENTER = "Bottom Center"
    BOTTOM_RIGHT = "Bottom Right"

class FootPreference(Enum):
    RIGHT = "Right"
    LEFT = "Left"

class BodyPart(Enum):
    FOOT = "Foot"
    HEAD = "Head"

@dataclass
class Location:
    grid_x: int
    grid_y: int
    grid_length: int = 24
    grid_width: int = 16
    pitch_length: int = 105
    pitch_width: int = 68

    x: float = field(init=False)
    y: float = field(init=False)

    def __post_init__(self):
        self.x = (self.grid_x / self.grid_length) * self.pitch_length
        self.y = (self.grid_y / self.grid_width) * self.pitch_width

    def distance_to_goal(self) -> float:
        goal_x = self.pitch_length
        goal_y = self.pitch_width / 2
        return math.sqrt((self.x - goal_x) ** 2 + (self.y - goal_y) ** 2)

class ExpectedGoals:
    def __init__(self, location: Location, body_part: BodyPart):
        self.location = location
        self.body_part = body_part

    def calculate_xg(self):
        distance = self.location.distance_to_goal()
        FOOT_SHOT_FORMULA = 0.85 * math.exp(-0.13 * distance)
        HEADER_SHOT_FORMULA = 1.13 * math.exp(-0.27 * distance)

        if BodyPart.FOOT == self.body_part:
            return FOOT_SHOT_FORMULA
        elif BodyPart.HEAD == self.body_part:
            return HEADER_SHOT_FORMULA
        return FOOT_SHOT_FORMULA
        

    def get_xg_factor(self):
        xg_value = self.calculate_xg()
        return max(0, min(xg_value, 1))

@dataclass
class TeamSkill:
    overall: float
    attack: float
    defense: float
    tpr: float = 0.5  # Default TPR value
    
    def __post_init__(self):
        for attr in ['overall', 'attack', 'defense', 'tpr']:
            value = getattr(self, attr)
            if not 0 <= value <= 1:
                raise ValueError(f"{attr} must be between 0 and 1")
    
    @property
    def effective_attack(self) -> float:
        return 0.5 * self.attack + 0.5 * self.tpr

    @property
    def effective_defense(self) -> float:
        return 0.5 * self.defense + 0.5 * self.tpr

    @property
    def effective_overall(self) -> float:
        return 0.5 * self.overall + 0.5 * self.tpr

@dataclass
class PlayerSkill:
    shooting: float
    finishing: float
    technique: float
    composure: float
    tpr: float = 0.5  # Default TPR value
    
    def __post_init__(self):
        for attr in ['shooting', 'finishing', 'technique', 'composure', 'tpr']:
            value = getattr(self, attr)
            if not 0 <= value <= 1:
                raise ValueError(f"{attr} must be between 0 and 1")
    
    @property
    def overall_shooting_skill(self) -> float:
        base_skill = (self.shooting * 0.4 + 
                     self.finishing * 0.3 + 
                     self.technique * 0.2 + 
                     self.composure * 0.1)
        return 0.5 * base_skill + 0.5 * self.tpr

@dataclass
class GoalkeeperSkill:
    reflexes: float
    positioning: float
    handling: float
    aerial_reach: float
    
    def __post_init__(self):
        for attr in ['reflexes', 'positioning', 'handling', 'aerial_reach']:
            value = getattr(self, attr)
            if not 0 <= value <= 1:
                raise ValueError(f"{attr} must be between 0 and 1")
    
    @property
    def overall_goalkeeper_skill(self) -> float:
        return (self.reflexes * 0.4 + 
                self.positioning * 0.4 + 
                self.handling * 0.2)

@dataclass
class ShotStyle:
    power: float  # 0-1 scale, where 1 is maximum power
    curve: float  # 0-1 scale, where 1 is maximum curve
    
    def __post_init__(self):
        for attr in ['power', 'curve']:
            value = getattr(self, attr)
            if not 0 <= value <= 1:
                raise ValueError(f"{attr} must be between 0 and 1")

class ShotOutcome(Enum):
    # On Target Outcomes
    GOAL = "GOAL"
    SAVED_CATCH = "SAVED_CATCH"
    SAVED_PARRY = "SAVED_PARRY"
    SAVED_DEFLECT = "SAVED_DEFLECT"
    
    # Off Target Outcomes
    WIDE_NEAR = "WIDE_NEAR"  # Just wide
    WIDE_FAR = "WIDE_FAR"    # Way off target
    HIGH = "HIGH"            # Over the crossbar
    WOODWORK = "WOODWORK"    # Hit the post or crossbar
    
    # Blocked Outcomes
    BLOCKED_DEFLECTED = "BLOCKED_DEFLECTED"  # Blocked and deflected
    BLOCKED_OUT = "BLOCKED_OUT"              # Blocked out for a corner
    BLOCKED_CAUGHT = "BLOCKED_CAUGHT"        # Blocked and caught by defender

class ShotQualityCalculator:
    
    # Sub-probabilities for save types when shot is saved
    SAVE_TYPE_PROBABILITIES = {
        "SAVED_CATCH": 0.4,    # Clean catch
        "SAVED_PARRY": 0.35,   # Parried away
        "SAVED_DEFLECT": 0.25  # Deflected but might create rebound
    }
    
    @staticmethod
    def calculate_goal_probability(
        shooter_skill: PlayerSkill,
        goalkeeper_skill: GoalkeeperSkill,
        location: Location,
        shot_style: ShotStyle,
        luck: float,
        body_part: BodyPart = BodyPart.FOOT  # Default to foot shot
    ) -> tuple[float, float]:

        # Calculate Expected Goals (xG)
        xg = ExpectedGoals(location, body_part).get_xg_factor()
        
        # Shot power and placement quality
        shot_quality = (
            shooter_skill.finishing * 0.2 +
            shooter_skill.composure * 0.1 +
            shot_style.power * 0.1 +
            shot_style.curve * 0.1 +
            shooter_skill.tpr * 0.5
        )
        
        # Goalkeeper save ability
        save_ability = (
            goalkeeper_skill.reflexes * 0.4 +
            goalkeeper_skill.aerial_reach * 0.3 +
            goalkeeper_skill.positioning * 0.3
        )
        
        # Apply modifiers
        quality_modifier = (
            shot_quality * 0.05 +
            (1 - save_ability) * 0.05 +
            xg * 0.9  # Replace distance_factor with xG influence
        )
        
        # Apply luck factor (can swing by ±15%)
        luck_impact = 0 # (luck - 0.5) * 0.05
        final_modifier = xg + luck_impact + shot_quality*0.05 # quality_modifier * (1 + luck_impact)
        
        # Calculate final probability
        goal_probability = final_modifier
        
        return max(0, min(0.95, min(goal_probability, 1))), xg, {
            "shot_quality": shot_quality,
            "save_ability": save_ability,
            "quality_modifier": quality_modifier,
            "luck_impact": luck_impact,
            "final_modifier": final_modifier
        }
    
    @staticmethod
    def determine_save_type() -> str:
        """Determine the type of save if the shot is saved"""
        rand = random.random()
        cumulative = 0
        
        for save_type, prob in ShotQualityCalculator.SAVE_TYPE_PROBABILITIES.items():
            cumulative += prob
            if rand <= cumulative:
                return save_type
        
        return "SAVED_CATCH"  # fallback

class ShotProbabilityCalculator:
    # Base probabilities for main categories
    BASE_PROBABILITIES = {
        "ON_TARGET": 0.32,
        "OFF_TARGET": 0.50,
        "BLOCKED": 0.18
    }
    
    # Sub-probabilities within each main category
    ON_TARGET_PROBABILITIES = {
        ShotOutcome.GOAL: 0.28,
        ShotOutcome.SAVED_CATCH: 0.37,
        ShotOutcome.SAVED_PARRY: 0.20,  
        ShotOutcome.SAVED_DEFLECT: 0.15
    }
    
    OFF_TARGET_PROBABILITIES = {
        ShotOutcome.WIDE_NEAR: 0.35,
        ShotOutcome.WIDE_FAR: 0.25,
        ShotOutcome.HIGH: 0.25,
        ShotOutcome.WOODWORK: 0.15
    }
    
    BLOCKED_PROBABILITIES = {
        ShotOutcome.BLOCKED_DEFLECTED: 0.40,
        ShotOutcome.BLOCKED_OUT: 0.35,
        ShotOutcome.BLOCKED_CAUGHT: 0.25
    }
    
    @staticmethod
    def calculate_skill_modifier(
        attacking_team_skill: TeamSkill,
        defender_team_skill: TeamSkill,
        shooter_skill: PlayerSkill,
        goalkeeper_skill: GoalkeeperSkill,
        location: Location,
        shot_style: ShotStyle,
        luck: float
    ) -> float:
        # Base skill impact
        attack_quality = (
            shooter_skill.overall_shooting_skill * 0.5 +
            attacking_team_skill.effective_attack * 0.3
        )
        
        # Defense quality - removed goalkeeper influence for shot accuracy
        defense_quality = defender_team_skill.effective_defense * 0.8  # Increased defender team impact
        
        # Distance penalty
        distance_factor = 1 - (location.distance_to_goal() / (location.pitch_length * 1.5))
        distance_factor = max(0, distance_factor)  # Ensure it's not negative
        
        # Shot style impact
        style_impact = (shot_style.power * 0.6 + 
                       shot_style.curve * 0.4)
        
        # Calculate final modifier
        skill_modifier = (
            attack_quality * 0.4 +
            (1 - defense_quality) * 0.3 +
            distance_factor * 0.2 +
            style_impact * 0.1
        )
        
        # Apply luck factor (can swing the modifier by ±20%)
        luck_impact = (luck - 0.5) * 0.05  # Convert luck to -0.2 to +0.2 range
        final_modifier = skill_modifier * (1 + luck_impact)
        
        # Clamp the modifier between 0.5 and 1.5
        return max(0.5, min(1.5, final_modifier))

class Shot_Event:
    def __init__(
        self,
        attacking_team_skill: TeamSkill,
        defender_team_skill: TeamSkill,
        attacking_team_shooter_skill: PlayerSkill,
        defender_team_goalkeeper_skill: GoalkeeperSkill,
        luck: float,
        location: Location,
        foot_preference: FootPreference,
        body_part: BodyPart,
        direction: Direction,
        shot_style: ShotStyle = None
    ):
        self.attacking_team_skill = attacking_team_skill
        self.defender_team_skill = defender_team_skill
        self.attacking_team_shooter_skill = attacking_team_shooter_skill
        self.defender_team_goalkeeper_skill = defender_team_goalkeeper_skill
        self.luck = luck
        self.location = location
        self.foot_preference = foot_preference
        self.body_part = body_part
        self.direction = direction
        self.shot_style = shot_style or ShotStyle(power=0.5, curve=0.5)
        self.probability_calculator = ShotProbabilityCalculator()
        self.quality_calculator = ShotQualityCalculator()

    def determine_shot_outcome(self) -> ShotOutcome:
        # Calculate skill modifier
        skill_modifier = self.probability_calculator.calculate_skill_modifier(
            self.attacking_team_skill,
            self.defender_team_skill,
            self.attacking_team_shooter_skill,
            self.defender_team_goalkeeper_skill,
            self.location,
            self.shot_style,
            self.luck
        )
        
        # Adjust base probabilities based on skill modifier
        adjusted_probs = self._adjust_probabilities(skill_modifier)
        
        # Determine main outcome category
        main_outcome = random.choices(
            list(adjusted_probs.keys()),
            weights=list(adjusted_probs.values())
        )[0]
        
        # Select specific outcome based on the main category
        if main_outcome == "ON_TARGET":
            return self._select_on_target_outcome(skill_modifier)
        elif main_outcome == "OFF_TARGET":
            return self._select_off_target_outcome(skill_modifier)
        else:  # BLOCKED
            return self._select_blocked_outcome(skill_modifier)

    def _adjust_probabilities(self, skill_modifier: float) -> dict:
        """Adjust base probabilities based on skill modifier."""
        base_probs = self.probability_calculator.BASE_PROBABILITIES.copy()
        
        # Increase ON_TARGET probability for higher skill
        base_probs["ON_TARGET"] *= skill_modifier
        
        # Decrease OFF_TARGET and BLOCKED probabilities proportionally
        remaining_prob = 1 - base_probs["ON_TARGET"]
        if remaining_prob > 0:
            off_target_ratio = self.probability_calculator.BASE_PROBABILITIES["OFF_TARGET"] / (
                self.probability_calculator.BASE_PROBABILITIES["OFF_TARGET"] + 
                self.probability_calculator.BASE_PROBABILITIES["BLOCKED"]
            )
            base_probs["OFF_TARGET"] = remaining_prob * off_target_ratio
            base_probs["BLOCKED"] = remaining_prob * (1 - off_target_ratio)
        else:
            base_probs["ON_TARGET"] = 1
            base_probs["OFF_TARGET"] = 0
            base_probs["BLOCKED"] = 0
        
        return base_probs

    def _select_on_target_outcome(self, skill_modifier: float) -> ShotOutcome:
        probs = self.probability_calculator.ON_TARGET_PROBABILITIES.copy()
        
        # Increase GOAL probability for higher skill
        probs[ShotOutcome.GOAL] *= skill_modifier
        
        # Adjust other probabilities proportionally
        total = sum(probs.values())
        probs = {k: v/total for k, v in probs.items()}
        
        goal_probability, xg = self.quality_calculator.calculate_goal_probability(
            self.attacking_team_shooter_skill,
            self.defender_team_goalkeeper_skill,
            self.location,
            self.shot_style,
            self.luck,
            self.body_part
        )
        
        if random.random() < goal_probability:
            return ShotOutcome.GOAL
        else:
            save_type = self.quality_calculator.determine_save_type()
            return ShotOutcome[save_type]

    def _select_off_target_outcome(self, skill_modifier: float) -> ShotOutcome:
        probs = self.probability_calculator.OFF_TARGET_PROBABILITIES.copy()
        
        # Higher skill means more likely to be WIDE_NEAR or WOODWORK than completely off
        if skill_modifier > 1:
            probs[ShotOutcome.WIDE_NEAR] *= skill_modifier
            probs[ShotOutcome.WOODWORK] *= skill_modifier
            probs[ShotOutcome.WIDE_FAR] /= skill_modifier
        
        total = sum(probs.values())
        probs = {k: v/total for k, v in probs.items()}
        
        return random.choices(
            list(probs.keys()),
            weights=list(probs.values())
        )[0]

    def _select_blocked_outcome(self, skill_modifier: float) -> ShotOutcome:
        probs = self.probability_calculator.BLOCKED_PROBABILITIES.copy()
        
        # Higher skill means more likely to get a deflection than complete block
        if skill_modifier > 1:
            probs[ShotOutcome.BLOCKED_DEFLECTED] *= skill_modifier
            probs[ShotOutcome.BLOCKED_CAUGHT] /= skill_modifier
        
        total = sum(probs.values())
        probs = {k: v/total for k, v in probs.items()}
        
        return random.choices(
            list(probs.keys()),
            weights=list(probs.values())
        )[0]

class PlayerDataConfig:
    # Skill column mappings
    OUTFIELD_COLUMNS = {
        'shooting': 'Finishing',
        'finishing': 'Finishing',
        'technique': 'Technique',
        'composure': 'Composure',
        'tpr': 'tpr'
    }
    
    GOALKEEPER_COLUMNS = {
        'reflexes': 'Reflexes',
        'positioning': 'Positioning',
        'handling': 'Handling',
        'aerial_reach': 'Aerial_Reach'
    }
    
    # Player info columns
    PLAYER_INFO = {
        'name': 'Name',
        'position': 'Position',
        'foot': 'Preferred Foot',
        'team': 'Club'
    }
    
    # Normalization settings
    MAX_SKILL_VALUE = 100
    
    @classmethod
    def normalize_skill(cls, value: float) -> float:
        """Normalize skill value to 0-1 range"""
        return value / cls.MAX_SKILL_VALUE

class TeamDataConfig:
    # Team attribute columns
    TEAM_COLUMNS = {
        'name': 'Club',
        'overall': 'tpr',
        'tpr': 'tpr',
        'attack_columns': ['Finishing', 'Off_the_Ball', 'Dribbling'],
        'defense_columns': ['Tackling', 'Marking', 'Positioning']
    }
    
    # Normalization settings
    MAX_SKILL_VALUE = 100
    
    # Weights for composite attributes
    ATTACK_WEIGHTS = {'Finishing': 0.4, 'Off_the_Ball': 0.3, 'Dribbling': 0.3}
    DEFENSE_WEIGHTS = {'Tackling': 0.4, 'Marking': 0.3, 'Positioning': 0.3}
    
    @classmethod
    def normalize_skill(cls, value: float) -> float:
        """Normalize skill value to 0-1 range"""
        return value / cls.MAX_SKILL_VALUE
    
    @classmethod
    def calculate_weighted_average(cls, values: dict, weights: dict) -> float:
        """Calculate weighted average of skills"""
        return sum(values[k] * weights[k] for k in weights.keys())

def load_team_data(csv_path: str, config: TeamDataConfig = TeamDataConfig) -> Dict[str, TeamSkill]:
    """
    Load team data from CSV file and return a dictionary of TeamSkill objects.
    
    Args:
        csv_path: Path to the CSV file containing team data
        config: Configuration class for data loading (default: TeamDataConfig)
    
    Returns:
        Dictionary mapping team names to TeamSkill objects
    """
    teams_df = pd.read_csv(csv_path)
    team_skills = {}
    
    for _, row in teams_df.iterrows():
        # Get attack values
        attack_values = {col: row[col] for col in config.TEAM_COLUMNS['attack_columns']}
        attack_skill = config.calculate_weighted_average(attack_values, config.ATTACK_WEIGHTS)
        
        # Get defense values
        defense_values = {col: row[col] for col in config.TEAM_COLUMNS['defense_columns']}
        defense_skill = config.calculate_weighted_average(defense_values, config.DEFENSE_WEIGHTS)
        
        team_skills[row[config.TEAM_COLUMNS['name']]] = TeamSkill(
            overall=config.normalize_skill(row[config.TEAM_COLUMNS['overall']]),
            attack=config.normalize_skill(attack_skill),
            defense=config.normalize_skill(defense_skill),
            tpr=config.normalize_skill(row[config.TEAM_COLUMNS['tpr']])
        )
    
    return team_skills

def load_player_data(csv_path: str, config: PlayerDataConfig = PlayerDataConfig) -> Dict[str, Tuple[PlayerSkill, GoalkeeperSkill, FootPreference]]:
    """
    Load player data from CSV file and return a dictionary of player skills.
    
    Args:
        csv_path: Path to the CSV file containing player data
        config: Configuration class for data loading (default: PlayerDataConfig)
    
    Returns:
        Dictionary mapping player names to tuples of (PlayerSkill, GoalkeeperSkill, FootPreference)
        Note: For outfield players, GoalkeeperSkill will be None
        For goalkeepers, PlayerSkill will be None
    """
    players_df = pd.read_csv(csv_path)
    player_skills = {}
    
    for _, row in players_df.iterrows():
        player_name = row[config.PLAYER_INFO['name']]
        position = row[config.PLAYER_INFO['position']]
        
        # Determine foot preference
        foot_pref = FootPreference.RIGHT if row[config.PLAYER_INFO['foot']] in ['Right', 'Either'] else FootPreference.LEFT
        
        if position == 'GK':
            # Create goalkeeper skills
            gk_skills = {k: config.normalize_skill(row[v]) for k, v in config.GOALKEEPER_COLUMNS.items()}
            goalkeeper_skill = GoalkeeperSkill(**gk_skills)
            player_skill = None
        else:
            # Create outfield player skills
            player_skills_dict = {k: config.normalize_skill(row[v]) for k, v in config.OUTFIELD_COLUMNS.items()}
            player_skill = PlayerSkill(**player_skills_dict)
            goalkeeper_skill = None
        
        player_skills[player_name] = (player_skill, goalkeeper_skill, foot_pref)
    
    return player_skills

# Example
if __name__ == "__main__":
    current_dir = os.path.dirname(os.path.abspath(__file__))
    teams_data = load_team_data(os.path.join(current_dir, "testdata", "teams.csv"))
    players_data = load_player_data(os.path.join(current_dir, "testdata", "players.csv"))
    
    attacking_team_name = "Paris Saint-Germain"
    defending_team_name = "Paris Saint-Germain"
    shooter_name = "Lionel Messi"
    goalkeeper_name = "Gianluigi Donnarumma"

    # attacking_team_name = "Fenerbahçe"
    # defending_team_name = "Paris Saint-Germain"
    # shooter_name = "Serdar Dursun"
    # goalkeeper_name = "Gianluigi Donnarumma"
    
    # Example: FC Bayern vs Paris Saint-Germain shot event
    bayern = teams_data[attacking_team_name]
    psg = teams_data[defending_team_name]
    
    # Get shooter data
    musiala_data = players_data[shooter_name]
    shooter_skill = musiala_data[0]  # PlayerSkill
    shooter_foot = musiala_data[2]  # FootPreference
    
    # Get goalkeeper data
    donnarumma_data = players_data.get(goalkeeper_name, 
        (None, GoalkeeperSkill(reflexes=0.85, positioning=0.83, handling=0.80, aerial_reach=0.80), FootPreference.RIGHT))
    goalkeeper_skill = donnarumma_data[1]
    
    shot = Shot_Event(
        attacking_team_skill=bayern,
        defender_team_skill=psg,
        attacking_team_shooter_skill=shooter_skill,
        defender_team_goalkeeper_skill=goalkeeper_skill,
        luck=random.random(),
        location=Location(grid_x=21, grid_y=8),  # near the goal
        foot_preference=shooter_foot,
        body_part=BodyPart.FOOT,
        direction=Direction.TOP_RIGHT,
        shot_style=ShotStyle(power=0.7, curve=0.3)
    )

    # Print detailed information about the shot
    print(f"\nShot Event Details:")
    print("-" * 50)
    print(f"Shooter: {shooter_name}")
    print(f"Individual Attributes:")
    print(f"  - Shooting: {shooter_skill.shooting:.3f}")
    print(f"  - Finishing: {shooter_skill.finishing:.3f}")
    print(f"  - Technique: {shooter_skill.technique:.3f}")
    print(f"  - Composure: {shooter_skill.composure:.3f}")
    print(f"  - Overall Shooting Skill: {shooter_skill.overall_shooting_skill:.3f}")
    print(f"  - Foot Preference: {shooter_foot.value}")
    
    print(f"\nGoalkeeper: {goalkeeper_name}")
    print(f"Individual Attributes:")
    print(f"  - Reflexes: {goalkeeper_skill.reflexes:.3f}")
    print(f"  - Positioning: {goalkeeper_skill.positioning:.3f}")
    print(f"  - Handling: {goalkeeper_skill.handling:.3f}")
    print(f"  - Aerial_Reach: {goalkeeper_skill.aerial_reach:.3f}")
    print(f"  - Overall Goalkeeper Skill: {goalkeeper_skill.overall_goalkeeper_skill:.3f}")
    
    print(f"\nTeam Attributes:")
    print(f"{attacking_team_name}:")
    print(f"  - Overall: {bayern.overall:.3f}")
    print(f"  - Attack: {bayern.attack:.3f}")
    print(f"  - Defense: {bayern.defense:.3f}")
    print(f"  - TPR: {bayern.tpr:.3f}")
    print(f"  - Effective Attack: {bayern.effective_attack:.3f}")
    print(f"  - Effective Defense: {bayern.effective_defense:.3f}")
    print(f"  - Effective Overall: {bayern.effective_overall:.3f}")
    print(f"\n{defending_team_name}:")
    print(f"  - Overall: {psg.overall:.3f}")
    print(f"  - Attack: {psg.attack:.3f}")
    print(f"  - Defense: {psg.defense:.3f}")
    print(f"  - TPR: {psg.tpr:.3f}")
    print(f"  - Effective Attack: {psg.effective_attack:.3f}")
    print(f"  - Effective Defense: {psg.effective_defense:.3f}")
    print(f"  - Effective Overall: {psg.effective_overall:.3f}")
    
    print(f"\nShot Details:")
    print(f"  - Distance from goal: {shot.location.distance_to_goal():.2f} meters")
    print(f"  - Shot Power: {shot.shot_style.power:.2f}")
    print(f"  - Shot Curve: {shot.shot_style.curve:.2f}")
    print(f"  - Direction: {shot.direction.value}")
    print(f"  - Body Part: {shot.body_part.value}")
    print(f"  - Luck Factor: {shot.luck:.2f}")
    
    # Calculate probabilities
    skill_modifier = shot.probability_calculator.calculate_skill_modifier(
        bayern, psg, shooter_skill, goalkeeper_skill, 
        shot.location, shot.shot_style, shot.luck
    )
    
    print(f"\nProbability Modifiers:")
    print(f"  - Skill Modifier: {skill_modifier:.3f}")
    
    base_probs = shot.probability_calculator.BASE_PROBABILITIES
    print(f"\nBase Probabilities:")
    print(f"  - On Target: {base_probs['ON_TARGET']:.1%}")
    print(f"  - Off Target: {base_probs['OFF_TARGET']:.1%}")
    print(f"  - Blocked: {base_probs['BLOCKED']:.1%}")
    
    adjusted_probs = shot._adjust_probabilities(skill_modifier)
    print(f"\nAdjusted Probabilities:")
    print(f"  - On Target: {adjusted_probs['ON_TARGET']:.1%}")
    print(f"  - Off Target: {adjusted_probs['OFF_TARGET']:.1%}")
    print(f"  - Blocked: {adjusted_probs['BLOCKED']:.1%}")
    
    goal_prob, xg, shotqualitydict = shot.quality_calculator.calculate_goal_probability(
        shooter_skill,
        goalkeeper_skill,
        shot.location,
        shot.shot_style,
        shot.luck,
        shot.body_part
    )
    print(f"\nGoal Probability:")
    print(f"  - If shot is on target: {goal_prob:.1%}")
    print(f"  - xG value: {xg:.1%}")
    print(f"  - Dict: {shotqualitydict}")
    
    outcome = shot.determine_shot_outcome()
    print(f"\nFinal Outcome: {outcome.value}")
    print(f"Shooter was: {shooter_name}")
    print("-" * 50)