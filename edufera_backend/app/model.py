import torchvision
import torch


def load_model(path):
    model = torchvision.models.resnet34(pretrained=False)
    model.fc = torch.nn.Linear(model.fc.in_features, 2, True)
    state = torch.load(path)
    model.load_state_dict(state)
    return model


