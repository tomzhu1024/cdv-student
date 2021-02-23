import json
import random

if __name__ == '__main__':
    result = []
    for i in range(50):
        entry = {"index": i}
        for j in range(16):
            entry["c%d" % j] = random.random()
        for j in range(4):
            entry["d%d" % j] = random.randint(-1, 1)
        result.append(entry)
    with open("data.json", "w") as f:
        f.write(json.dumps(result))
