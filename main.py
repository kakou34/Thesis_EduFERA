import pandas as pd


if __name__ == "__main__":
    df = pd.read_csv('D:/Studies/PFE/dataset/newtest.csv')

    for i, row in df.iterrows():
        valence = df.at[i, 'valence']
        arousal = df.at[i, 'arousal']

        if valence > 0 and arousal > 0:
            df.at[i, 'class'] = 1

        elif valence < 0 and arousal > 0:
            df.at[i, 'class'] = 2

        elif valence <= 0 and arousal <= 0:
            df.at[i, 'class'] = 3

        else:
            df.at[i, 'class'] = 4

    df.drop(columns=[
                     'valence',
                     'arousal',
                     'expression',
                     'face_x', 'face_y',
                     'face_height', 'face_width'])

    df.to_csv("D:/Studies/PFE/AffectNet/classification_test.csv")
