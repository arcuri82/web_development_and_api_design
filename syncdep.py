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

def add_or_override_subproperty(data, property, subproperty, value):
    if data.get(property) is None:
        data[property] = {}

    if data[property].get(subproperty) is None or data[property][subproperty] != value:
        data[property][subproperty] = value
        return True

    return False

def add_or_override_property(data, property, value):

    if data.get(property) is None or data[property] != value:
        data[property] = value
        return True

    return False


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


        # make properties the same in all modules
        updated |= add_or_override_subproperty(data, "engines", "node", "^14.0.0")
        updated |= add_or_override_property(data, "author", "Andrea Arcuri")
        updated |= add_or_override_property(data, "license", "LGPL-3.0")
        updated |= add_or_override_property(data, "version", "1.0.0")


        # for checking updates, use "yarn outdated"
        # also, everytime we add/remove a dependency, need to update "dependencies" module

        # Frontend
        updated |= handle_dependency(data, "lodash", "4.17.20")
        updated |= handle_dependency(data, "react", "16.12.0") # if updating, check if react-href XSS still works
        updated |= handle_dependency(data, "react-dom", "16.12.0") # 17 is out, but Enzyme does not support it yet
        updated |= handle_dependency(data, "react-router", "5.2.0")
        updated |= handle_dependency(data, "react-router-dom", "5.2.0")

        # Backend
        updated |= handle_dependency(data, "express", "4.17.1")
        updated |= handle_dependency(data, "express-session", "1.17.1")
        updated |= handle_dependency(data, "express-ws", "4.0.0")  # is this dead?
        updated |= handle_dependency(data, "graphql", "14.5.8")
        updated |= handle_dependency(data, "apollo-server-express", "2.9.12")
        updated |= handle_dependency(data, "passport", "0.4.1")
        updated |= handle_dependency(data, "passport-local", "1.0.0")
        updated |= handle_dependency(data, "cors", "2.8.5")

        # Webpack
        updated |= handle_devDependency(data, "webpack", "5.11.1")
        updated |= handle_devDependency(data, "webpack-cli", "4.3.1")
        updated |= handle_devDependency(data, "webpack-dev-server", "3.11.1")

        # Babel
        updated |= handle_devDependency(data, "@babel/core", "7.12.10")
        updated |= handle_devDependency(data, "@babel/cli", "7.12.10")
        updated |= handle_devDependency(data, "@babel/preset-env", "7.12.11")
        updated |= handle_devDependency(data, "@babel/preset-react", "7.12.10")
        updated |= handle_devDependency(data, "@babel/plugin-proposal-class-properties", "7.12.1")
        updated |= handle_devDependency(data, "babel-loader", "8.2.2")
        updated |= handle_devDependency(data, "babel-jest", "24.9.0") # 26.6.3 breaks enzyme

        # Testing
        updated |= handle_devDependency(data, "jest", "24.9.0")
        updated |= handle_devDependency(data, "jsdom", "16.4.0")
        updated |= handle_devDependency(data, "supertest", "6.0.1")
        updated |= handle_devDependency(data, "enzyme", "3.11.0")
        updated |= handle_devDependency(data, "enzyme-adapter-react-16", "1.15.5")
        updated |= handle_devDependency(data, "react-addons-test-utils", "15.6.2")

        # Misc
        updated |= handle_devDependency(data, "nodemon", "2.0.6")
        updated |= handle_devDependency(data, "concurrently", "5.3.0")

    if updated:
        with open(path, 'w') as outfile:
            json.dump(data, outfile, sort_keys=True, indent=4)


def copyShared():
    # jest-setup.js
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-04/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-05/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-08/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-09/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-10/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-11/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "exercise-solutions/quiz-game/part-12/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les04/connect4/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les05/spa-routing-react/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les06/weather/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les08/server_client_together/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les11/chat/websocket-full/tests/jest-setup.js")
    copyfile("shared/jest-setup.js", "les11/chat/websocket-rest/tests/jest-setup.js")

    # mytest-utils.js
    copyfile("shared/mytest-utils.js", "exercise-solutions/quiz-game/part-08/tests/mytest-utils.js")
    copyfile("shared/mytest-utils.js", "exercise-solutions/quiz-game/part-09/tests/mytest-utils.js")
    copyfile("shared/mytest-utils.js", "exercise-solutions/quiz-game/part-10/tests/mytest-utils.js")
    copyfile("shared/mytest-utils.js", "exercise-solutions/quiz-game/part-11/tests/mytest-utils.js")
    copyfile("shared/mytest-utils.js", "exercise-solutions/quiz-game/part-12/tests/mytest-utils.js")
    copyfile("shared/mytest-utils.js", "les08/server_client_together/tests/mytest-utils.js")
    copyfile("shared/mytest-utils.js", "les11/chat/websocket-rest/tests/mytest-utils.js")
    copyfile("shared/mytest-utils.js", "les12/connect4-v2/tests/mytest-utils.js")

    # mytest-utils-ws.js
    copyfile("shared/mytest-utils-ws.js", "exercise-solutions/quiz-game/part-11/tests/mytest-utils-ws.js")
    copyfile("shared/mytest-utils-ws.js", "exercise-solutions/quiz-game/part-12/tests/mytest-utils-ws.js")
    copyfile("shared/mytest-utils-ws.js", "les11/chat/websocket-rest/tests/mytest-utils-ws.js")
    copyfile("shared/mytest-utils-ws.js", "les12/connect4-v2/tests/mytest-utils-ws.js")


scan_folder(".")
copyShared()
