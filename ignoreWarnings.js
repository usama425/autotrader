import { LogBox } from "react-native";

if (__DEV__) {
    const ignoreWarns = [
        "EventEmitter.removeListener",
        "[fuego-swr-keys-from-collection-path]",
        "Setting a timer for a long period of time",
        "ViewPropTypes will be removed from React Native",
        "AsyncStorage has been extracted from react-native",
        "exported from 'deprecated-react-native-prop-types'.",
        "Non-serializable values were found in the navigation state.",
        "VirtualizedLists should never be nested inside plain ScrollViews",
    ];
    const ignoreErrors=[
        "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."
    ]
    const error = console.error
    const warn = console.warn;
    console.warn = (...arg) => {
        for (const warning of ignoreWarns) {
            if (arg[0].startsWith(warning)) {
                return;
            }
        }
        warn(...arg);
    };
    console.error = (...arg) => {
        for (const error of ignoreErrors) {
            if (arg[0].startsWith(error)) {
                return;
            }
        }
        error(...arg);
    };

    LogBox.ignoreLogs(ignoreWarns);
    LogBox.ignoreLogs(ignoreErrors)
}