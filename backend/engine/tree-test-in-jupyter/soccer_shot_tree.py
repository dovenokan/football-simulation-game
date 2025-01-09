from dataclasses import dataclass
from typing import List, Optional, Union, Dict, Tuple
from enum import Enum

class ActionType(Enum):
    MISC = "misc"
    OFFENSIVE = "offensive"
    DEFENSIVE = "defensive"

class TechniqueType(Enum):
    NORMAL = "normal"
    VOLLEY = "volley"
    HEADER = "header"
    FINESSE = "finesse"
    POWER = "power"
    CHIP = "chip"
    DRIVEN = "driven"

class BodyPartType(Enum):
    RIGHT_FOOT = "right_foot"
    LEFT_FOOT = "left_foot"
    HEAD = "head"

class SituationType(Enum):
    OPEN_PLAY = "open_play"
    ONE_ON_ONE = "one_on_one"
    SET_PIECE = "set_piece"
    COUNTER_ATTACK = "counter_attack"
    HIGH_PRESSURE = "high_pressure"

class ShotOutcome(Enum):
    GOAL = "goal"
    GOAL_CLOSE_RANGE = "goal_close_range"
    GOAL_LONG_RANGE = "goal_long_range"
    GOAL_HEADER = "goal_header"
    SHOT_ON_TARGET = "shot_on_target"
    SHOT_OFF_TARGET = "shot_off_target"
    SHOT_BLOCKED = "shot_blocked"
    SHOT_SAVED = "shot_saved"
    SHOT_HIT_POST = "shot_hit_post"
    REBOUND_SHOT = "rebound_shot"

@dataclass
class ShotProperties:
    # Player and Team Info
    player_id: Optional[str] = None
    player_name: Optional[str] = None
    team_id: Optional[str] = None
    team_name: Optional[str] = None
    
    # Technical Info
    technique: Optional[TechniqueType] = None
    body_part: Optional[BodyPartType] = None
    
    # Spatial Info
    shot_location: Optional[Tuple[float, float]] = None
    goal_location: Optional[Tuple[float, float]] = None
    goalkeeper_location: Optional[Tuple[float, float]] = None
    
    # Physical Properties
    pressure_factor: float = 0.0
    distance_to_goal: Optional[float] = None
    shot_height: Optional[float] = None
    shot_angle: Optional[float] = None
    shot_power: Optional[float] = None
    shot_placement: Optional[float] = None  # Accuracy of the shot

@dataclass
class ShotTransition:
    next_action: 'ShotNode'
    probability: float = 1.0
    situation: Optional[SituationType] = None

@dataclass
class ShotNode:
    name: str
    action_type: ActionType
    possible_outcomes: List['ShotNode']
    properties: Optional[ShotProperties] = None
    outcome_type: Optional[ShotOutcome] = None
    base_probability: float = 1.0
    transitions: List[ShotTransition] = None
    
    def __post_init__(self):
        if self.transitions is None:
            self.transitions = []
    
    def add_outcome(self, outcome: 'ShotNode', probability: float = 1.0, situation: Optional[SituationType] = None):
        self.possible_outcomes.append(outcome)
        self.transitions.append(ShotTransition(outcome, probability, situation))

class SoccerShotTree:
    def __init__(self):
        self.root = self._build_tree()
        self.SITUATION_MODIFIERS = {
            SituationType.OPEN_PLAY: 1.0,
            SituationType.ONE_ON_ONE: 1.4,
            SituationType.SET_PIECE: 1.2,
            SituationType.COUNTER_ATTACK: 1.3,
            SituationType.HIGH_PRESSURE: 0.7
        }
    
    def _get_default_properties(self) -> ShotProperties:
        return ShotProperties()
    
    def calculate_shot_probability(
        self,
        shot: ShotNode,
        player_attributes: Dict[str, float],
        situation: SituationType
    ) -> float:
        if not shot or not player_attributes:
            return 0.0
        
        base_prob = shot.base_probability
        
        # Player skill factors
        finishing = player_attributes.get('finishing', 0.5)
        shot_power = player_attributes.get('shot_power', 0.5)
        composure = player_attributes.get('composure', 0.5)
        
        # Technical factors
        if shot.properties:
            distance_factor = 1.0 - (shot.properties.distance_to_goal or 0) / 50  # Assume max distance is 50m
            angle_factor = abs(cos(shot.properties.shot_angle or 0))  # Better angle = higher probability
            pressure_factor = 1.0 - (shot.properties.pressure_factor or 0)
        else:
            distance_factor = angle_factor = pressure_factor = 1.0
        
        # Situation modifier
        situation_modifier = self.SITUATION_MODIFIERS.get(situation, 1.0)
        
        # Calculate final probability
        skill_factor = (finishing * 0.5 + shot_power * 0.3 + composure * 0.2)
        technical_factor = (distance_factor * 0.4 + angle_factor * 0.4 + pressure_factor * 0.2)
        
        final_prob = base_prob * skill_factor * technical_factor * situation_modifier
        
        return max(0.0, min(1.0, final_prob))
    
    def _build_tree(self) -> ShotNode:
        root = ShotNode("Shot", ActionType.OFFENSIVE, [], self._get_default_properties(), base_probability=0.8)
        
        # Add main shot branches with probabilities
        root.add_outcome(self._build_close_range_branch(), 0.4, SituationType.OPEN_PLAY)
        root.add_outcome(self._build_long_range_branch(), 0.3, SituationType.OPEN_PLAY)
        root.add_outcome(self._build_post_hit_branch(), 0.3, SituationType.OPEN_PLAY)
        
        return root
    
    def _build_close_range_branch(self) -> ShotNode:
        properties = ShotProperties(
            technique=TechniqueType.NORMAL,
            body_part=BodyPartType.RIGHT_FOOT,
            pressure_factor=0.3,
            distance_to_goal=8.0,  # 8 meters
            shot_angle=0.0  # Straight on
        )
        
        close_range = ShotNode(
            "CloseRangeShot",
            ActionType.OFFENSIVE,
            [],
            properties,
            base_probability=0.7
        )
        
        # Add outcomes with probabilities
        goal = ShotNode(
            "CloseRangeGoal",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.GOAL_CLOSE_RANGE,
            base_probability=0.6
        )
        
        save = ShotNode(
            "CloseRangeSave",
            ActionType.DEFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_SAVED,
            base_probability=0.25
        )
        
        block = ShotNode(
            "CloseRangeBlock",
            ActionType.DEFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_BLOCKED,
            base_probability=0.15
        )
        
        # Add rebound chance for saved shots
        rebound = self._build_rebound_branch()
        save.add_outcome(rebound, 0.3, SituationType.OPEN_PLAY)
        
        close_range.add_outcome(goal, 0.6, SituationType.OPEN_PLAY)
        close_range.add_outcome(save, 0.25, SituationType.OPEN_PLAY)
        close_range.add_outcome(block, 0.15, SituationType.OPEN_PLAY)
        
        return close_range
    
    def _build_long_range_branch(self) -> ShotNode:
        properties = ShotProperties(
            technique=TechniqueType.POWER,
            body_part=BodyPartType.RIGHT_FOOT,
            pressure_factor=0.2,
            distance_to_goal=25.0,  # 25 meters
            shot_angle=0.0
        )
        
        long_range = ShotNode(
            "LongRangeShot",
            ActionType.OFFENSIVE,
            [],
            properties,
            base_probability=0.4
        )
        
        # Add outcomes with probabilities
        goal = ShotNode(
            "LongRangeGoal",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.GOAL_LONG_RANGE,
            base_probability=0.15
        )
        
        save = ShotNode(
            "LongRangeSave",
            ActionType.DEFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_SAVED,
            base_probability=0.35
        )
        
        miss = ShotNode(
            "LongRangeMiss",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_OFF_TARGET,
            base_probability=0.35
        )
        
        block = ShotNode(
            "LongRangeBlock",
            ActionType.DEFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_BLOCKED,
            base_probability=0.15
        )
        
        long_range.add_outcome(goal, 0.15, SituationType.OPEN_PLAY)
        long_range.add_outcome(save, 0.35, SituationType.OPEN_PLAY)
        long_range.add_outcome(miss, 0.35, SituationType.OPEN_PLAY)
        long_range.add_outcome(block, 0.15, SituationType.OPEN_PLAY)
        
        return long_range
    
    def _build_post_hit_branch(self) -> ShotNode:
        properties = ShotProperties(
            technique=TechniqueType.POWER,
            body_part=BodyPartType.RIGHT_FOOT,
            pressure_factor=0.2,
            distance_to_goal=16.0,  # 16 meters
            shot_angle=0.3  # Slight angle
        )
        
        post_hit = ShotNode(
            "PostHit",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_HIT_POST,
            base_probability=0.1
        )
        
        # Add outcomes with probabilities
        in_off_post = ShotNode(
            "PostAndIn",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.GOAL,
            base_probability=0.3
        )
        
        out_off_post = ShotNode(
            "PostAndOut",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_OFF_TARGET,
            base_probability=0.4
        )
        
        # Add rebound chance
        rebound = self._build_rebound_branch()
        
        post_hit.add_outcome(in_off_post, 0.3, SituationType.OPEN_PLAY)
        post_hit.add_outcome(out_off_post, 0.4, SituationType.OPEN_PLAY)
        post_hit.add_outcome(rebound, 0.3, SituationType.OPEN_PLAY)
        
        return post_hit
    
    def _build_rebound_branch(self) -> ShotNode:
        properties = ShotProperties(
            technique=TechniqueType.NORMAL,
            body_part=BodyPartType.RIGHT_FOOT,
            pressure_factor=0.4,
            distance_to_goal=6.0,  # Very close range
            shot_angle=0.0
        )
        
        rebound = ShotNode(
            "ReboundChance",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.REBOUND_SHOT,
            base_probability=0.3
        )
        
        # Add rebound outcomes with probabilities
        rebound_goal = ShotNode(
            "ReboundGoal",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.GOAL,
            base_probability=0.4
        )
        
        rebound_saved = ShotNode(
            "ReboundSaved",
            ActionType.DEFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_SAVED,
            base_probability=0.3
        )
        
        rebound_missed = ShotNode(
            "ReboundMissed",
            ActionType.OFFENSIVE,
            [],
            properties,
            ShotOutcome.SHOT_OFF_TARGET,
            base_probability=0.3
        )
        
        rebound.add_outcome(rebound_goal, 0.4, SituationType.OPEN_PLAY)
        rebound.add_outcome(rebound_saved, 0.3, SituationType.OPEN_PLAY)
        rebound.add_outcome(rebound_missed, 0.3, SituationType.OPEN_PLAY)
        
        return rebound

if __name__ == "__main__":
    # Example usage
    shot_tree = SoccerShotTree()
    
    # Example player attributes
    player_attributes = {
        'finishing': 0.8,
        'shot_power': 0.75,
        'composure': 0.7
    }
    
    # Print tree structure
    def print_tree(node: ShotNode, level: int = 0):
        indent = "  " * level
        prob_str = f" (prob: {node.base_probability:.2f})" if node.base_probability != 1.0 else ""
        outcome_str = f" -> {node.outcome_type.value}" if node.outcome_type else ""
        print(f"{indent}{node.name} ({node.action_type.value}){prob_str}{outcome_str}")
        
        for outcome in node.possible_outcomes:
            print_tree(outcome, level + 1)
    
    print("Soccer Shot Tree Structure:")
    print_tree(shot_tree.root)