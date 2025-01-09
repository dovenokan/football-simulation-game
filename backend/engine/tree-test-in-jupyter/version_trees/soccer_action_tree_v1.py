from dataclasses import dataclass
from typing import List, Optional, Union
from enum import Enum

class ActionType(Enum):
    MISC = "misc"
    OFFENSIVE = "offensive"
    MIDDLE = "middle"
    DEFENSIVE = "defensive"

class ActionOutcome(Enum):
    # Offensive Outcomes
    GOAL = "goal"
    GOAL_CLOSE_RANGE = "goal_close_range"
    GOAL_LONG_RANGE = "goal_long_range"
    GOAL_HEADER = "goal_header"
    SHOT_ON_TARGET = "shot_on_target"
    SHOT_OFF_TARGET = "shot_off_target"
    SHOT_HIT_POST = "shot_hit_post"
    
    # Passing Outcomes
    PASS_COMPLETED = "pass_completed"
    PASS_INTERCEPTED = "pass_intercepted"
    PASS_OUT_OF_BOUNDS = "pass_out_of_bounds"
    THROUGH_PASS_SUCCESS = "through_pass_success"
    CROSS_SUCCESS = "cross_success"
    CROSS_BLOCKED = "cross_blocked"
    
    # Dribbling Outcomes
    DRIBBLE_SUCCESS = "dribble_success"
    DRIBBLE_TACKLED = "dribble_tackled"
    DRIBBLE_OUT = "dribble_out"
    SKILL_MOVE_SUCCESS = "skill_move_success"
    
    # Defensive Outcomes
    TACKLE_SUCCESS = "tackle_success"
    TACKLE_MISSED = "tackle_missed"
    INTERCEPTION = "interception"
    CLEARANCE = "clearance"
    BLOCK = "block"
    
    # Set Pieces
    CORNER_KICK = "corner_kick"
    THROW_IN = "throw_in"
    FREE_KICK = "free_kick"
    PENALTY = "penalty"
    
    # Fouls and Cards
    FOUL_COMMON = "foul_common"
    YELLOW_CARD = "yellow_card"
    RED_CARD = "red_card"
    
    # General
    SUCCESS = "success"
    FAIL = "fail"
    DEFLECTED = "deflected"

@dataclass
class ActionNode:
    name: str
    action_type: ActionType
    possible_outcomes: List['ActionNode']
    outcome_type: Optional[ActionOutcome] = None
    
    def add_outcome(self, outcome: 'ActionNode'):
        self.possible_outcomes.append(outcome)

class SoccerActionTree:
    def __init__(self):
        self.root = self._build_tree()
    
    def _build_tree(self) -> ActionNode:
        # Create the root node (HalfStart)
        root = ActionNode("HalfStart", ActionType.MISC, [])
        
        # Build offensive actions
        offensive_actions = self._build_offensive_actions()
        
        # Build middle actions
        middle_actions = self._build_middle_actions()
        
        # Build defensive actions
        defensive_actions = self._build_defensive_actions()
        
        # Connect all main branches to the root
        for action in offensive_actions + middle_actions + defensive_actions:
            root.add_outcome(action)
        
        return root
    
    def _build_offensive_actions(self) -> List[ActionNode]:
        actions = []
        
        # Pass action and its detailed outcomes
        pass_action = ActionNode("Pass", ActionType.OFFENSIVE, [])
        
        # Normal pass branch
        pass_completed = ActionNode("PassCompleted", ActionType.OFFENSIVE, [], ActionOutcome.PASS_COMPLETED)
        shot_from_pass = ActionNode("ShotFromPass", ActionType.OFFENSIVE, [])
        dribble_from_pass = ActionNode("DribbleFromPass", ActionType.OFFENSIVE, [])
        pass_completed.add_outcome(shot_from_pass)
        pass_completed.add_outcome(dribble_from_pass)
        
        # Shot outcomes from pass
        shot_from_pass.add_outcome(ActionNode("GoalFromPass", ActionType.OFFENSIVE, [], ActionOutcome.GOAL))
        shot_from_pass.add_outcome(ActionNode("SavedFromPass", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        shot_from_pass.add_outcome(ActionNode("MissedFromPass", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_OFF_TARGET))
        
        # Dribble outcomes from pass
        dribble_from_pass.add_outcome(ActionNode("DribbleSuccess", ActionType.OFFENSIVE, [], ActionOutcome.DRIBBLE_SUCCESS))
        dribble_from_pass.add_outcome(ActionNode("DribbleTackled", ActionType.DEFENSIVE, [], ActionOutcome.DRIBBLE_TACKLED))
        
        # Through pass branch
        through_pass = ActionNode("ThroughPass", ActionType.OFFENSIVE, [], ActionOutcome.THROUGH_PASS_SUCCESS)
        shot_from_through = ActionNode("ShotFromThrough", ActionType.OFFENSIVE, [])
        through_pass.add_outcome(shot_from_through)
        
        # Shot outcomes from through pass
        shot_from_through.add_outcome(ActionNode("GoalFromThrough", ActionType.OFFENSIVE, [], ActionOutcome.GOAL))
        shot_from_through.add_outcome(ActionNode("SavedFromThrough", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        
        # Cross branch
        cross = ActionNode("Cross", ActionType.OFFENSIVE, [])
        cross_success = ActionNode("CrossSuccess", ActionType.OFFENSIVE, [], ActionOutcome.CROSS_SUCCESS)
        header_from_cross = ActionNode("HeaderFromCross", ActionType.OFFENSIVE, [])
        volley_from_cross = ActionNode("VolleyFromCross", ActionType.OFFENSIVE, [])
        cross_success.add_outcome(header_from_cross)
        cross_success.add_outcome(volley_from_cross)
        
        # Header outcomes from cross
        header_from_cross.add_outcome(ActionNode("HeaderGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL_HEADER))
        header_from_cross.add_outcome(ActionNode("HeaderSaved", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        header_from_cross.add_outcome(ActionNode("HeaderMissed", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_OFF_TARGET))
        
        # Volley outcomes from cross
        volley_from_cross.add_outcome(ActionNode("VolleyGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL))
        volley_from_cross.add_outcome(ActionNode("VolleySaved", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        volley_from_cross.add_outcome(ActionNode("VolleyMissed", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_OFF_TARGET))
        
        cross_blocked = ActionNode("CrossBlocked", ActionType.DEFENSIVE, [], ActionOutcome.CROSS_BLOCKED)
        cross.add_outcome(cross_success)
        cross.add_outcome(cross_blocked)
        
        # Failed pass outcomes
        pass_intercepted = ActionNode("PassIntercepted", ActionType.DEFENSIVE, [], ActionOutcome.PASS_INTERCEPTED)
        pass_out = ActionNode("PassOutOfBounds", ActionType.OFFENSIVE, [], ActionOutcome.PASS_OUT_OF_BOUNDS)
        
        # Connect all pass outcomes
        pass_action.add_outcome(pass_completed)
        pass_action.add_outcome(through_pass)
        pass_action.add_outcome(cross)
        pass_action.add_outcome(pass_intercepted)
        pass_action.add_outcome(pass_out)
        
        # Shot action and its detailed outcomes
        shot_action = ActionNode("Shot", ActionType.OFFENSIVE, [])
        
        # Close range shot branch
        close_shot = ActionNode("CloseRangeShot", ActionType.OFFENSIVE, [])
        close_shot.add_outcome(ActionNode("CloseRangeGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL_CLOSE_RANGE))
        close_shot.add_outcome(ActionNode("CloseRangeSave", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        close_shot.add_outcome(ActionNode("CloseRangeBlock", ActionType.DEFENSIVE, [], ActionOutcome.BLOCK))
        
        # Long range shot branch
        long_shot = ActionNode("LongRangeShot", ActionType.OFFENSIVE, [])
        long_shot.add_outcome(ActionNode("LongRangeGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL_LONG_RANGE))
        long_shot.add_outcome(ActionNode("LongRangeSave", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        long_shot.add_outcome(ActionNode("LongRangeMiss", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_OFF_TARGET))
        long_shot.add_outcome(ActionNode("LongRangeBlock", ActionType.DEFENSIVE, [], ActionOutcome.BLOCK))
        
        # Post hit outcomes
        post_hit = ActionNode("PostHit", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_HIT_POST)
        post_hit.add_outcome(ActionNode("PostAndIn", ActionType.OFFENSIVE, [], ActionOutcome.GOAL))
        post_hit.add_outcome(ActionNode("PostAndOut", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_OFF_TARGET))
        
        shot_action.add_outcome(close_shot)
        shot_action.add_outcome(long_shot)
        shot_action.add_outcome(post_hit)
        
        # Dribble action and its detailed outcomes
        dribble_action = ActionNode("Dribble", ActionType.OFFENSIVE, [])
        
        # Skill move branch
        skill_move = ActionNode("SkillMove", ActionType.OFFENSIVE, [], ActionOutcome.SKILL_MOVE_SUCCESS)
        skill_success = ActionNode("SkillMoveSuccess", ActionType.OFFENSIVE, [])
        skill_move.add_outcome(skill_success)
        
        # Outcomes after successful skill move
        skill_success.add_outcome(ActionNode("ShootAfterSkill", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        skill_success.add_outcome(ActionNode("PassAfterSkill", ActionType.OFFENSIVE, [], ActionOutcome.PASS_COMPLETED))
        skill_success.add_outcome(ActionNode("ContinueDribble", ActionType.OFFENSIVE, [], ActionOutcome.DRIBBLE_SUCCESS))
        
        # Regular dribble outcomes
        dribble_success = ActionNode("DribbleSuccess", ActionType.OFFENSIVE, [], ActionOutcome.DRIBBLE_SUCCESS)
        dribble_tackled = ActionNode("DribbleTackled", ActionType.DEFENSIVE, [], ActionOutcome.DRIBBLE_TACKLED)
        dribble_out = ActionNode("DribbleOut", ActionType.OFFENSIVE, [], ActionOutcome.DRIBBLE_OUT)
        
        # After successful dribble
        dribble_success.add_outcome(ActionNode("ShootAfterDribble", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        dribble_success.add_outcome(ActionNode("PassAfterDribble", ActionType.OFFENSIVE, [], ActionOutcome.PASS_COMPLETED))
        
        dribble_action.add_outcome(skill_move)
        dribble_action.add_outcome(dribble_success)
        dribble_action.add_outcome(dribble_tackled)
        dribble_action.add_outcome(dribble_out)
        
        actions.extend([pass_action, shot_action, dribble_action])
        return actions
    
    def _build_middle_actions(self) -> List[ActionNode]:
        actions = []
        
        # Duel action and its detailed outcomes
        duel_action = ActionNode("Duel", ActionType.MIDDLE, [])
        duel_won_clean = ActionNode("CleanTackle", ActionType.DEFENSIVE, [], ActionOutcome.TACKLE_SUCCESS)
        duel_foul = ActionNode("FoulInDuel", ActionType.DEFENSIVE, [])
        
        # Add foul outcomes
        common_foul = ActionNode("CommonFoul", ActionType.DEFENSIVE, [], ActionOutcome.FOUL_COMMON)
        yellow_card = ActionNode("YellowCard", ActionType.DEFENSIVE, [], ActionOutcome.YELLOW_CARD)
        red_card = ActionNode("RedCard", ActionType.DEFENSIVE, [], ActionOutcome.RED_CARD)
        
        duel_foul.add_outcome(common_foul)
        duel_foul.add_outcome(yellow_card)
        duel_foul.add_outcome(red_card)
        
        duel_action.add_outcome(duel_won_clean)
        duel_action.add_outcome(duel_foul)
        
        actions.append(duel_action)
        return actions
    
    def _build_defensive_actions(self) -> List[ActionNode]:
        actions = []
        
        # Tackle action and its detailed outcomes
        tackle_action = ActionNode("Tackle", ActionType.DEFENSIVE, [])
        
        # Clean tackle branch
        tackle_success = ActionNode("TackleSuccess", ActionType.DEFENSIVE, [], ActionOutcome.TACKLE_SUCCESS)
        after_tackle = ActionNode("AfterTackle", ActionType.DEFENSIVE, [])
        tackle_success.add_outcome(after_tackle)
        
        # Outcomes after successful tackle
        after_tackle.add_outcome(ActionNode("ClearanceAfterTackle", ActionType.DEFENSIVE, [], ActionOutcome.CLEARANCE))
        after_tackle.add_outcome(ActionNode("PassAfterTackle", ActionType.DEFENSIVE, [], ActionOutcome.PASS_COMPLETED))
        after_tackle.add_outcome(ActionNode("DribbleAfterTackle", ActionType.DEFENSIVE, [], ActionOutcome.DRIBBLE_SUCCESS))
        
        # Failed tackle branch
        tackle_missed = ActionNode("TackleMissed", ActionType.DEFENSIVE, [], ActionOutcome.TACKLE_MISSED)
        after_miss = ActionNode("AfterMiss", ActionType.OFFENSIVE, [])
        tackle_missed.add_outcome(after_miss)
        
        # Outcomes after missed tackle
        after_miss.add_outcome(ActionNode("ShotAfterMiss", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        after_miss.add_outcome(ActionNode("DribbleAfterMiss", ActionType.OFFENSIVE, [], ActionOutcome.DRIBBLE_SUCCESS))
        
        # Foul tackle branch
        tackle_foul = ActionNode("TackleFoul", ActionType.DEFENSIVE, [])
        
        # Regular foul outcomes
        common_foul = ActionNode("CommonFoul", ActionType.DEFENSIVE, [], ActionOutcome.FOUL_COMMON)
        yellow_card = ActionNode("YellowCard", ActionType.DEFENSIVE, [], ActionOutcome.YELLOW_CARD)
        red_card = ActionNode("RedCard", ActionType.DEFENSIVE, [], ActionOutcome.RED_CARD)
        
        # After foul outcomes
        free_kick = ActionNode("FreeKick", ActionType.OFFENSIVE, [], ActionOutcome.FREE_KICK)
        penalty = ActionNode("Penalty", ActionType.OFFENSIVE, [], ActionOutcome.PENALTY)
        
        # Free kick outcomes
        free_kick.add_outcome(ActionNode("FreeKickGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL))
        free_kick.add_outcome(ActionNode("FreeKickSaved", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        free_kick.add_outcome(ActionNode("FreeKickMissed", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_OFF_TARGET))
        
        # Penalty outcomes
        penalty.add_outcome(ActionNode("PenaltyGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL))
        penalty.add_outcome(ActionNode("PenaltySaved", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        penalty.add_outcome(ActionNode("PenaltyMissed", ActionType.OFFENSIVE, [], ActionOutcome.SHOT_OFF_TARGET))
        
        common_foul.add_outcome(free_kick)
        yellow_card.add_outcome(free_kick)
        red_card.add_outcome(penalty)
        
        tackle_foul.add_outcome(common_foul)
        tackle_foul.add_outcome(yellow_card)
        tackle_foul.add_outcome(red_card)
        
        tackle_action.add_outcome(tackle_success)
        tackle_action.add_outcome(tackle_missed)
        tackle_action.add_outcome(tackle_foul)
        
        # Block action and its detailed outcomes
        block_action = ActionNode("Block", ActionType.DEFENSIVE, [])
        
        # Clean block branch
        block_clearance = ActionNode("Clearance", ActionType.DEFENSIVE, [], ActionOutcome.CLEARANCE)
        after_clearance = ActionNode("AfterClearance", ActionType.DEFENSIVE, [])
        block_clearance.add_outcome(after_clearance)
        
        # Outcomes after clearance
        after_clearance.add_outcome(ActionNode("BallRecovery", ActionType.DEFENSIVE, [], ActionOutcome.SUCCESS))
        after_clearance.add_outcome(ActionNode("OpponentRecovery", ActionType.OFFENSIVE, [], ActionOutcome.FAIL))
        
        # Deflection branch
        block_deflection = ActionNode("Deflection", ActionType.DEFENSIVE, [], ActionOutcome.DEFLECTED)
        
        # Detailed deflection outcomes
        deflected_goal = ActionNode("DeflectedGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL)
        deflected_corner = ActionNode("DeflectedCorner", ActionType.OFFENSIVE, [], ActionOutcome.CORNER_KICK)
        deflected_throw = ActionNode("DeflectedThrowIn", ActionType.MISC, [], ActionOutcome.THROW_IN)
        deflected_penalty = ActionNode("DeflectedPenalty", ActionType.OFFENSIVE, [], ActionOutcome.PENALTY)
        
        # Corner kick outcomes
        corner_outcomes = ActionNode("CornerOutcomes", ActionType.OFFENSIVE, [])
        deflected_corner.add_outcome(corner_outcomes)
        
        corner_outcomes.add_outcome(ActionNode("CornerGoal", ActionType.OFFENSIVE, [], ActionOutcome.GOAL_HEADER))
        corner_outcomes.add_outcome(ActionNode("CornerSaved", ActionType.DEFENSIVE, [], ActionOutcome.SHOT_ON_TARGET))
        corner_outcomes.add_outcome(ActionNode("CornerCleared", ActionType.DEFENSIVE, [], ActionOutcome.CLEARANCE))
        
        block_deflection.add_outcome(deflected_goal)
        block_deflection.add_outcome(deflected_corner)
        block_deflection.add_outcome(deflected_throw)
        block_deflection.add_outcome(deflected_penalty)
        
        block_action.add_outcome(block_clearance)
        block_action.add_outcome(block_deflection)
        
        actions.extend([tackle_action, block_action])
        return actions
    
    def print_tree(self, node: ActionNode = None, level: int = 0):
        if node is None:
            node = self.root
            
        indent = "  " * level
        outcome_str = f" -> {node.outcome_type.value}" if node.outcome_type else ""
        print(f"{indent}{node.name} ({node.action_type.value}){outcome_str}")
        
        for outcome in node.possible_outcomes:
            self.print_tree(outcome, level + 1)

# Example usage
if __name__ == "__main__":
    tree = SoccerActionTree()
    print("Soccer Action Tree Structure:")
    tree.print_tree()