# Scan for all package.json in all folders, and update them with given dependency versions

import os
import json
from shutil import copyfile

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


def transform_property(data, group, source_name, target_name):
    if data.get(group) is None or data[group].get(source_name) is None:
        return False

    print("Changing " + source_name + " into " + target_name)
    del data[group][source_name]

    if data[group].get(target_name) is None:
        data[group][target_name] = ""

    return True


def analyze_json(path):
    print("Analyzing " + path)

    updated = False

    with open(path) as json_file:
        data = json.load(json_file)

        # Babel is not really backward-compatible friendly when it comes to dependency names...
        updated |= transform_property(data, "devDependencies",
                                      "babel-plugin-transform-class-properties",
                                      "@babel/plugin-proposal-class-properties")

        # for checking updates, use "yarn outdated"

        # Frontend
        updated |= handle_dependency(data, "lodash", "4.17.15")
        updated |= handle_dependency(data, "react", "16.12.0")
        updated |= handle_dependency(data, "react-dom", "16.12.0")
        updated |= handle_dependency(data, "react-router", "5.1.2")
        updated |= handle_dependency(data, "react-router-dom", "5.1.2")

        # Backend
        updated |= handle_dependency(data, "express", "4.17.1")
        updated |= handle_dependency(data, "express-session", "1.17.0")
        updated |= handle_dependency(data, "express-ws", "4.0.0")  # is this dead?
        updated |= handle_dependency(data, "graphql", "14.5.8")
        updated |= handle_dependency(data, "apollo-server-express", "2.9.12")

        # Webpack
        updated |= handle_devDependency(data, "webpack", "4.41.2")
        updated |= handle_devDependency(data, "webpack-cli", "3.3.10")
        updated |= handle_devDependency(data, "webpack-dev-server", "3.9.0")

        # Babel
        updated |= handle_devDependency(data, "@babel/core", "7.7.4")
        updated |= handle_devDependency(data, "@babel/cli", "7.7.4")
        updated |= handle_devDependency(data, "@babel/preset-env", "7.7.4")
        updated |= handle_devDependency(data, "@babel/preset-react", "7.7.4")
        updated |= handle_devDependency(data, "@babel/plugin-proposal-class-properties", "7.7.4")
        updated |= handle_devDependency(data, "babel-loader", "8.0.6")
        updated |= handle_devDependency(data, "babel-jest", "24.9.0")

        # Testing
        updated |= handle_devDependency(data, "jest", "24.9.0")
        updated |= handle_devDependency(data, "jsdom", "15.2.1")
        updated |= handle_devDependency(data, "supertest", "4.0.2")
        updated |= handle_devDependency(data, "enzyme", "3.10.0")
        updated |= handle_devDependency(data, "enzyme-adapter-react-16", "1.15.1")

        # Misc
        updated |= handle_devDependency(data, "nodemon", "2.0.1")
        updated |= handle_devDependency(data, "concurrently", "5.0.0")

    if updated:
        with open(path, 'w') as outfile:
            json.dump(data, outfile, sort_keys=True, indent=4)


def copyShared():
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-04/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-05/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-07/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-08/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-09/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-10/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les04/connect4/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les06/weather/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les07/server_client_together/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les09/chat/websocket-full/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les09/chat/websocket-rest/tests/jest-setup.js")


scan_folder(".")
copyShared()
