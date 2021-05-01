import pandas as pd
from sklearn.utils import resample

if __name__ == '__main__':

    val_df = pd.read_csv('D:/Studies/PFE/fer2013p/validation.csv')

    ap = val_df[val_df['class'] == 0]
    au = val_df[val_df['class'] == 1]
    iu = val_df[val_df['class'] == 2]
    ip = val_df[val_df['class'] == 3]

    print(f"Active-pleasant: {len(ap)}")
    print(f"Active-unpleasant: {len(au)}")
    print(f"Inactive-unpleasant: {len(iu)}")
    print(f"Inactive-pleasant: {len(ip)}")

    ap_down_sampled = resample(ap,
                               replace=False,  # sample without replacement
                               n_samples=500,  # to match minority class
                               random_state=123)  # reproducible results
    ip_down_sampled = resample(ip,
                               replace=False,  # sample without replacement
                               n_samples=500,  # to match minority class
                               random_state=123)  # reproducible results

    au_up_sampled = resample(au,
                             replace=True,  # sample with replacement
                             n_samples=500,  # to match majority class
                             random_state=123)  # reproducible results

    iu_up_sampled = resample(iu,
                             replace=True,  # sample with replacement
                             n_samples=500,  # to match majority class
                             random_state=123)  # reproducible results

    print(f"Active-pleasant after balancing: {len(ap_down_sampled)}")
    print(f"Active-unpleasant after balancing: {len(au_up_sampled)}")
    print(f"Inactive-unpleasant after balancing: {len(iu_up_sampled)}")
    print(f"Inactive-pleasant after balancing: {len(ip_down_sampled)}")

    train_balanced = pd.concat([ap_down_sampled, au_up_sampled, iu_up_sampled, ip_down_sampled])
    train_balanced = train_balanced.sample(frac=1).reset_index(drop=True)
    train_balanced.to_csv('D:/Studies/PFE/fer2013p/valid_b.csv')
