import pandas as pd
import os
from PIL import Image


def clean_affectNet(csv_path, base_path_src, base_path_des, max_img=1000000):
    df = pd.read_csv(csv_path)
    df = df.drop(columns=['facial_landmarks', 'expression'])
    # Removing no face images
    df = df.drop(df[(df.valence == -2) & (df.arousal == -2)].index)

    count = 0
    for i, row in df.iterrows():
        print(count)
        if count > max_img:
            break
        # Cropping the face
        image_path = base_path_src + df.at[i, 'subDirectory_filePath']
        image = Image.open(image_path)

        face_x1 = df.at[i, 'face_x']
        face_x2 = face_x1 + df.at[i, 'face_width']
        face_y1 = df.at[i, 'face_y']
        face_y2 = face_y1 + df.at[i, 'face_height']

        face = image.crop((face_x1, face_y1, face_x2, face_y2))

        # Saving the new picture (face only)
        img_path_des = df.at[i, 'subDirectory_filePath']
        dir_file = img_path_des.split('/')
        directory = base_path_des + dir_file[0]
        if not os.path.exists(directory):
            os.makedirs(directory)
        img_path_fin = base_path_des + img_path_des
        face.save(img_path_fin)
        count = count + 1
