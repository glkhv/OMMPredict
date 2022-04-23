import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
import pickle


with open('./static/randomforest.pt', 'rb') as f:
    model = pickle.load(f)


def predict(imt, periods, fsh, kitlg80441, vegfa12143, vegfa2578, vegfa634, vegfac936tcc, tp53arg75pro, mecho, vright, vleft):
    data = np.array([imt, periods, fsh, kitlg80441, vegfa12143, vegfa2578,
                    vegfa634, vegfac936tcc, tp53arg75pro, mecho, vright, vleft])
    data = data.reshape(1, -1)
    scaler = StandardScaler()
    data = scaler.fit_transform(data)
    prediction = model.predict(data)
    if prediction:
        return True
    else:
        return False
