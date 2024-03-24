from flask import Flask, jsonify

app = Flask(__name__)

# Global variables for match simulation
match_in_progress = False
match_stats = {}


@app.route('/')
def home():
    return "FootSim API."


@app.route('/start_match/<int:num_players>/<int:match_duration>', methods=['GET'])
def start_match(num_players, match_duration):
    global match_in_progress, match_stats

    if not match_in_progress:
        match_in_progress = True
        match_stats = {
            'num_players': num_players,
            'match_duration': match_duration,
            'team_a_goals': 0,
            'team_b_goals': 0
        }
        return jsonify({'message': 'Match simulation started!'})
    else:
        return jsonify({'error': 'A match is already in progress.'})


@app.route('/get_match_stats', methods=['GET'])
def get_match_stats():
    global match_in_progress, match_stats

    if match_in_progress:
        return jsonify(match_stats)
    else:
        return jsonify({'error': 'No match in progress.'})


@app.route('/end_match', methods=['GET'])
def end_match():
    global match_in_progress, match_stats

    if match_in_progress:
        match_in_progress = False
        return jsonify({'message': 'Match simulation ended.', 'final_stats': match_stats})
    else:
        return jsonify({'error': 'No match in progress.'})


if __name__ == '__main__':
    app.run(debug=True)
