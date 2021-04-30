import torch


def save_checkpoint(input_size, output_size, state, criterion, optimizer, scheduler, path):
    checkpoint = {'input_size': input_size,
                  'output_size': output_size,
                  'state_dict': state,
                  'criterion': criterion,
                  'optimizer': optimizer,
                  'lr_scheduler': scheduler
                  }
    torch.save(checkpoint, path)
