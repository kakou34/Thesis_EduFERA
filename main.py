from data_cleaning.affectnet_cleaning import clean_affectNet

if __name__ == '__main__':
    print("Hello Pyhton!")
    csv_path = 'validation.csv'
    base_path_src = "D:/Studies/PFE/AffectNet/Manually_Annotated_compressed/Manually_Annotated_Images/"
    base_path_des = "D:/Studies/PFE/AffectNet/manually_annotated_clean/"
    clean_affectNet(csv_path, base_path_src, base_path_des)
    print("Goodbye python!")


