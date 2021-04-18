from flask import Flask, jsonify
from edufera_backend.model import load_model

app = Flask(__name__)
model = load_model('C:/Users/99926527616etu/PycharmProjects/Thesis_EduFERA/checkpoints/resnet34_state.pth')


@app.route('/predict', methods=['POST'])
def predict():

    output = {'img1': {'valence': 0.01, 'arousal': -0.2}}
    return output


@app.route('/results', methods=['POST'])
def results():

    output = {'img1': {'valence': 0.01, 'arousal': -0.2}}
    return jsonify(output)


if __name__ == "__main__":
    app.run(debug=True)
