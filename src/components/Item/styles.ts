import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: "#FFF",
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
  },
  containerPercent: {
    backgroundColor: "#D5F2E1",
    height: 42,
    width: 62,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    padding: 2,
  },
  percentage: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
  },
});