import numpy as np
import pickle


with open('./static/model.pt', 'rb') as f:
    model = pickle.load(f)


def predict(relapse, vegfa634gg, vegfa634c, periods, tp53gg, mecho, vegfa936cc, first_symptom, kitlg80441cc, emergency_birth, vleft, fsh, vright):
    data = np.array([relapse, vegfa634gg, vegfa634c, periods, tp53gg, mecho,
                    vegfa936cc, first_symptom, kitlg80441cc, emergency_birth, vleft, fsh, vright])
    prediction = model.predict(data)
    if prediction:
        return True
    else:
        return False
