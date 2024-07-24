import pickle

# SAVING
def Save_Model(name, filename, object):
    with open(filename, 'wb') as file:
        pickle.dump(object, file)

# LOADING
def Load_Model(filename):
    with open(filename, 'rb') as file:
        loaded = pickle.load(file)
        return loaded