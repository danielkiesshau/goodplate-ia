import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  description: {
    color: "#2E9D4C",
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    alignSelf: 'center',
    fontSize: 14,
    textAlignVertical: "center"
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    marginTop: -42,
    paddingTop: 12
  },
  listContent: {
    marginTop: 12,
  },
  items: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});