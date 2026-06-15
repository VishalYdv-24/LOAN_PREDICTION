
X = df.drop("Loan_Status",axis=1)
Y = df["Loan_Status"]

X_train, X_test, Y_train, Y_test = train_test_split(
    X,
    Y,
    test_size=0.2,
    random_state=42
)

models = {
    "Logistic Regression":LogisticRegression(max_iter=1000),
    "Decision Tree":DecisionTreeClassifier(random_state=42),
    "Random Forest":RandomForestClassifier(random_state=42),
    "Naive Bayes":GaussianNB()
}

best_model = None
best_accuracy = 0

for name, model in models.items():
    model.fit(X_train,Y_train)
    predictions = model.predict(X_test)

    accuracy = accuracy_score(Y_test, predictions)

    print(f"\n{name}")
    print(f"Accuracy: {accuracy:.4f}")

    if accuracy > best_accuracy:
        best_accuracy = accuracy