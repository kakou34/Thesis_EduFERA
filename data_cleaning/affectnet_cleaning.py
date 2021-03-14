import pandas as pd
import os
from PIL import Image


def clean_affectNet(csv_path, base_path_src, base_path_des, max_img=1000000, balanced=False):
    df = pd.read_csv(csv_path)

    df = df.drop(columns=['facial_landmarks'])
    # Removing no face images
    df = df.drop(df[(df.valence == -2) & (df.arousal == -2)].index)

    # Balance
    if balanced:
        df = balance(df)

    print(df.shape[0])

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


def balance(df):
    class0 = df[(df.expression == 0)].tail(64874)
    df = df.drop(class0.index)
    class1 = df[(df.expression == 1)].tail(124415)
    df = df.drop(class1.index)
    class2 = df[(df.expression == 2)].tail(15459)
    df = df.drop(class2.index)
    class3 = df[(df.expression == 3)].tail(4090)
    df = df.drop(class3.index)
    class6 = df[(df.expression == 6)].tail(14882)
    df = df.drop(class6.index)
    return df
