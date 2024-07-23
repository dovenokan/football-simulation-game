import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report

data = {
    'f1': [2, 3, 5, 7, 9, 11, 13, 15],
    'f2': [1, 4, 6, 8, 10, 12, 14, 16],
    't': [0, 0, 0, 1, 1, 1, 1, 1]
}
df = pd.DataFrame(data)
X = df[['f1', 'f2']]
y = df['t']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0)

model = LogisticRegression()
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)

dicttest = {
    "f1":[5],
    "f2":[7]
}
model.predict(pd.DataFrame(dicttest))
model.predict_proba(pd.DataFrame(dicttest))