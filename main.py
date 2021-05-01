import pandas as pd


if __name__ == "__main__":
    df = pd.read_csv('D:/Studies/PFE/fer2013p/train.csv')

    class0 = df[df['class'] == 0]
    class1 = df[df['class'] == 1]
    class2 = df[df['class'] == 2]
    class3 = df[df['class'] == 3]

    print(len(class0))
    print(len(class1))
    print(len(class2))
    print(len(class3))
