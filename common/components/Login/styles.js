import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2
  },
  logoSize: { resizeMode: 'stretch', height: 90, width: 150 },
  inputParentContainer: {
    flex: 2,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  flex3: {
    flex: 3
  },
  txtMobileNoContainer: {
    flex: 6, padding: 5,
  },
  txtMobileNo: {
    padding: 5,
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  txtPasswordContainer: {
    padding: 5, flex: 1
  },
  txtPassword: {
    fontSize: 20,
    borderColor: 'gray',
    borderWidth: 1,
    textAlign: "center",
    // marginLeft: 20,
    padding: 5,
    // marginVertical: 25,
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    flex: 1,
  },
  versionDetailContainer: {
    alignItems: 'center',
    flex: 1,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: 'blue'
  },
  versionDetail: {
    fontSize: 12,
    color: '#969695'
  }
});
