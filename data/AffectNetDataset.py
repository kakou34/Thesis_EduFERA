import torch
import pandas as pd
import os
from PIL import Image
from torch.utils.data import Dataset


class AffectNetDataset(Dataset):
    """AffectNet dataset."""

    def __init__(self, csv_file, root_dir, transform=None):
        """
        Args:
            csv_file (string): Path to the csv file with annotations.
            root_dir (string): Directory with all the images.
            transform (callable, optional): Optional transform to be applied
                on a sample.
        """
        self.annotations_csv = pd.read_csv(csv_file)
        self.root_dir = root_dir
        self.transform = transform

    def __len__(self):
        return len(self.annotations_csv)

    def __getitem__(self, idx):
        if torch.is_tensor(idx):
            idx = idx.tolist()

        img_name = os.path.join(self.root_dir,
                                self.annotations_csv.iloc[idx]['subDirectory_filePath'])
        image = Image.open(img_name)
        valence = self.annotations_csv.iloc[idx]['valence']
        # valence = np.array([valence])
        arousal = self.annotations_csv.iloc[idx]['arousal']
        # arousal = np.array([arousal])
        labels = torch.tensor([[valence, arousal]])
        labels = labels.float()

        if self.transform:
            image = self.transform(image)
        image = image.float()

        return image, labels