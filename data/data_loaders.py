from data.AffectNetDataset import AffectNetDataset
from torch.utils.data import DataLoader


def affectnet_dataloaders(train, train_csv, valid, valid_csv, test, test_csv, data_transforms=None):
    affectnet_train = AffectNetDataset(csv_file=train_csv,
                                         root_dir=train,
                                         transform=data_transforms)

    affectnet_valid = AffectNetDataset(csv_file=valid_csv,
                                         root_dir=valid,
                                         transform=data_transforms)

    affectnet_test = AffectNetDataset(csv_file=test_csv,
                                         root_dir=test,
                                         transform=data_transforms)

    batch_size = 64

    dataset_sizes = {'train': len(affectnet_train), 'valid': len(affectnet_valid), 'test': len(affectnet_test)}

    train_loader = DataLoader(affectnet_train, batch_size=batch_size)
    valid_loader = DataLoader(affectnet_valid, batch_size=batch_size)
    test_loader = DataLoader(affectnet_test, batch_size=batch_size)

    return train_loader, valid_loader, test_loader, dataset_sizes
