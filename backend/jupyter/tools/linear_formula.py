def Create_Linear_Formula(model):
    if not hasattr(model, 'feature_names_in_') or not hasattr(model, 'coef_'):
        raise ValueError("The model must be fitted before creating the formula.")
    feature_names = model.feature_names_in_
    coefficients = model.coef_
    intercept = model.intercept_
    formula = f"{intercept:.3f}"
    for feature_name, coef in zip(feature_names, coefficients):
        sign = "+" if coef >= 0 else "-"
        formula += f" {sign} {abs(coef):.3f} * {feature_name}"
    return formula