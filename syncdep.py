# Scan for all package.json in all folders, and update them with given dependency versions

import os
import json


def scan_folder(folder):

    if folder.endswith("node_modules"):
        return

    files = os.listdir(folder)

    if "package.json" in files:
        path = folder + "/package.json"
        analyze_json(path)
        return

    for f in files:
        path = folder + "/" + f
        if os.path.isdir(path):
            scan_folder(path)


def handle_dependency(data, name, version):
    return handle_library(data, "dependencies", name, version)


def handle_devDependency(data, name, version):
    return handle_library(data, "devDependencies", name, version)


def handle_library(data, group, name, version):
    if data.get(group) is None or data[group].get(name) is None or data[group][name] == version:
        return False
    print("Updating " + name + " " + version)
    data[group][name] = version
    return True


def analyze_json(path):
    print("Analyzing " + path)

    updated = False

    with open(path) as json_file:
        data = json.load(json_file)
        updated |= handle_dependency(data, "lodash", "4.17.15")
        updated |= handle_dependency(data, "react", "16.12.0")
        updated |= handle_dependency(data, "react-dom", "16.12.0")
        updated |= handle_devDependency(data, "webpack", "4.41.2")
        updated |= handle_devDependency(data, "webpack-cli", "3.3.10")
        updated |= handle_devDependency(data, "webpack-dev-server", "3.9.0")

    if updated:
        with open(path, 'w') as outfile:
            json.dump(data, outfile, sort_keys=True, indent=4)


scan_folder(".")
