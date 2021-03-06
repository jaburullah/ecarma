import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  listParentContainer: { margin: 10, height: 100 },
  listTouchContainer: {
    flex: 1,
  },
  description: { padding: 2 },
  listContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flex: 1,
    borderColor: '#F2F2F2',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  listHeader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F2F2F2',
  },
  listHeaderTitle: { paddingLeft: 10, fontWeight: 'bold' },
  listContent: { flex: 2, flexDirection: 'row' },
  listStatusText: {
    flex: 1,
    justifyContent: 'center'
  },
  listSmileyParentContainer: { flex: 1, justifyContent: 'center' },
  listSmileyContainer: { flexDirection: 'row', justifyContent: 'flex-end' },
  listSmileyEachContainer: { marginLeft: 20, marginRight: 10, },
  listSmiley: { height: 30, width: 30 },
  listSmileySelected: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#FFEA90',
    backgroundColor: '#FFFFCC',
  },
  listSmileyEmpty: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#F2F2F2',
  },
  listSmileyNotSelected: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  dialogTitleText: { padding: 10, justifyContent: 'center', alignItems: 'center' }
});
